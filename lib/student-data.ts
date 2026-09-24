import { createClient } from "@/lib/supabase/server";

export async function getStudentData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id ?? "";

  const [rewards, certificates, nfts, progress, listings] = await Promise.all([
    supabase.from("rewards").select("id, amount, reason, granted_at").eq("user_id", userId).order("granted_at", { ascending: false }),
    supabase.from("certificates").select("id, course_id, nft_token_id, issued_at").eq("user_id", userId).order("issued_at", { ascending: false }),
    supabase.from("nfts").select("token_id, type, metadata_cid, minted_at").eq("wallet_address", user?.user_metadata?.wallet_address ?? "").order("minted_at", { ascending: false }),
    supabase.from("progress").select("id, course_id, percentage, last_updated").eq("user_id", userId).order("last_updated", { ascending: false }),
    supabase.from("marketplace_listings").select("id, nft_token_id, price, status, listed_at").eq("status", "ACTIVE").order("listed_at", { ascending: false }),
  ]);

  return {
    user,
    rewards: rewards.data ?? [],
    certificates: certificates.data ?? [],
    nfts: nfts.data ?? [],
    progress: progress.data ?? [],
    listings: listings.data ?? [],
    errors: [rewards.error, certificates.error, nfts.error, progress.error, listings.error].filter(Boolean),
  };
}
