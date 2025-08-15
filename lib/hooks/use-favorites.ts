"use client";

import { useState, useEffect } from 'react';

// Key for storing favorites in localStorage
const FAVORITES_STORAGE_KEY = 'learnify_favorites';

export function useFavorites() {
  // State to store favorite course IDs
  const [favorites, setFavorites] = useState<string[]>([]);
  // State to track if we've loaded from localStorage
  const [initialized, setInitialized] = useState(false);

  // On first render, load favorites from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (e) {
          console.error('Failed to parse favorites from localStorage:', e);
          setFavorites([]);
        }
      }
      setInitialized(true);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (initialized && typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, initialized]);

  // Check if a course is favorited
  const isFavorite = (courseId: string) => favorites.includes(courseId);

  // Toggle a course's favorite status
  const toggleFavorite = (courseId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(courseId)) {
        return prevFavorites.filter(id => id !== courseId);
      } else {
        return [...prevFavorites, courseId];
      }
    });
  };

  // Add a course to favorites
  const addFavorite = (courseId: string) => {
    if (!favorites.includes(courseId)) {
      setFavorites(prev => [...prev, courseId]);
    }
  };

  // Remove a course from favorites
  const removeFavorite = (courseId: string) => {
    setFavorites(prev => prev.filter(id => id !== courseId));
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite
  };
}
