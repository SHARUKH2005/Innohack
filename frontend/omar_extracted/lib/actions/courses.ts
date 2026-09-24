"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("[GET_CATEGORIES]", error);
    return [];
  }
}

export async function getCourses({
  userId,
  title,
  categoryId,
}: {
  userId?: string;
  title?: string;
  categoryId?: string;
}) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        modules: {
          include: {
            lessons: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // In a real app we would compute progress, but for now we just return the courses
    // formatting them similarly to how the frontend expects
    const coursesWithStats = courses.map(course => {
      const lessonsLength = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
      
      return {
        ...course,
        lessonsLength,
        progress: null // we will add real progress in Phase 5
      }
    });

    return coursesWithStats;
  } catch (error) {
    console.error("[GET_COURSES]", error);
    return [];
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    return await prisma.course.findUnique({
      where: { slug },
      include: {
        category: true,
        instructor: true,
        modules: {
          include: {
            lessons: true,
          },
          orderBy: {
            order: "asc",
          }
        },
        reviews: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });
  } catch (error) {
    console.error("[GET_COURSE_BY_SLUG]", error);
    return null;
  }
}
