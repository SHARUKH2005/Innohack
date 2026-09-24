import { calculateCourseReward } from "../services/rewards.js";

const tests = [
  { score: 95, passed: true },
  { score: 80, passed: true },
  { score: 65, passed: true },
  { score: 40, passed: true },
  { score: 95, passed: false },
];

for (const test of tests) {
  const reward = calculateCourseReward(
    test.score,
    test.passed
  );

  console.log(
    `Score: ${test.score}, Passed: ${test.passed} → ${reward} MX`
  );
}