export function calculateMXReward(
  score: number,
  passed: boolean
): string {
  if (!passed) {
    return "0";
  }

  if (score >= 90) {
    return "50";
  }

  if (score >= 75) {
    return "30";
  }

  if (score >= 60) {
    return "20";
  }

  return "10";
}