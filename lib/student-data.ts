import { createClient } from "@/lib/supabase/client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function getStudentData(userId?: string) {
  if (!userId) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users`, { cache: "no-store" });
      if (res.ok) {
        const users = await res.json();
        if (Array.isArray(users) && users.length > 0) {
          const student = users.find((u: any) => u.role === "learner") || users[0];
          userId = student.id;
        }
      }
    } catch (e) {
      console.error("Failed to fetch default student:", e);
    }
  }

  if (!userId) {
    return {
      rewards: [],
      certificates: [],
      nfts: [],
      progress: [],
      enrollments: [],
      listings: [],
      balance: "0",
      errors: [],
    };
  }

  try {
    const [rewardsRes, certsRes, nftsRes, progressRes, enrollmentsRes, balanceRes, marketplaceRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/rewards/user/${userId}`, { cache: "no-store" }).then(r => r.ok ? r.json() : []),
      fetch(`${BACKEND_URL}/api/certificates/user/${userId}`, { cache: "no-store" }).then(r => r.ok ? r.json() : []),
      fetch(`${BACKEND_URL}/api/nfts/user/${userId}`, { cache: "no-store" }).then(r => r.ok ? r.json() : []),
      fetch(`${BACKEND_URL}/api/progress/${userId}`, { cache: "no-store" }).then(r => r.ok ? r.json() : []),
      fetch(`${BACKEND_URL}/api/enrollments/user/${userId}`, { cache: "no-store" }).then(r => r.ok ? r.json() : []),
      fetch(`${BACKEND_URL}/api/users/${userId}/balance`, { cache: "no-store" }).then(r => r.ok ? r.json() : { balance: "0" }),
      fetch(`${BACKEND_URL}/api/marketplace`, { cache: "no-store" }).then(r => r.ok ? r.json() : { listings: [], stats: {} }),
    ]);

    return {
      rewards: Array.isArray(rewardsRes) ? rewardsRes : [],
      certificates: Array.isArray(certsRes) ? certsRes : [],
      nfts: Array.isArray(nftsRes) ? nftsRes : [],
      progress: Array.isArray(progressRes) ? progressRes : [],
      enrollments: Array.isArray(enrollmentsRes) ? enrollmentsRes : [],
      listings: marketplaceRes.listings || [],
      marketplaceStats: marketplaceRes.stats || {},
      balance: balanceRes.balance || "0",
      walletAddress: balanceRes.wallet_address || null,
      errors: [],
    };
  } catch (error) {
    console.error("Failed to fetch student data from API:", error);
    return {
      rewards: [],
      certificates: [],
      nfts: [],
      progress: [],
      enrollments: [],
      listings: [],
      balance: "0",
      errors: [],
    };
  }
}
