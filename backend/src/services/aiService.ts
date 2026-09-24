import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || "";
console.log("Gemini API Key loaded:", apiKey ? `${apiKey.slice(0, 8)}...` : "MISSING");

// New @google/genai SDK — supports AQ. key format from Google AI Studio
const ai = new GoogleGenAI({ apiKey });

export async function evaluateAnswer(
  question: string,
  answer: string
) {
  const prompt = `You are a strict, expert educational assessor. Your job is to evaluate a student's answer to a question with maximum accuracy.

EVALUATION CRITERIA:
1. Factual Correctness (0-40 pts): Is the answer factually correct? Does it contain any errors or misconceptions?
2. Completeness (0-30 pts): Does the answer cover all essential aspects of the question?
3. Clarity & Explanation (0-20 pts): Is the answer well-explained and clearly articulated?
4. Depth of Understanding (0-10 pts): Does the answer demonstrate genuine understanding beyond surface-level knowledge?

SCORING GUIDE:
- 90-100: Exceptional. Factually perfect, complete, clearly explained, and shows deep understanding.
- 75-89: Good. Mostly correct and complete, with minor gaps.
- 50-74: Adequate. Partially correct but missing key concepts.
- 25-49: Poor. Shows some awareness but contains significant errors or gaps.
- 0-24: Failing. Largely incorrect, irrelevant, or empty.

STRICT RULES:
- Be completely objective. Do not inflate scores.
- If the answer is vague or overly generic without substance, cap at 50.
- If the answer contains factual errors, deduct accordingly.
- The score MUST reflect the actual quality of the answer.

QUESTION:
${question}

STUDENT ANSWER:
${answer}

Respond ONLY with a valid JSON object in this exact format:
{
  "score": <integer between 0 and 100>,
  "feedback": "<2-3 sentences of specific, constructive feedback explaining the score and what was good or missing>",
  "breakdown": {
    "factual_correctness": <0-40>,
    "completeness": <0-30>,
    "clarity": <0-20>,
    "depth": <0-10>
  },
  "passed": <true if score >= 70, false otherwise>
}`;

  console.log("Calling Gemini API for evaluation...");

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      temperature: 0,              // deterministic — same input = same score
      topP: 1,
      topK: 1,
      responseMimeType: "application/json"  // force valid JSON output
    }
  });

  const text = response.text ?? "";
  console.log("Raw Gemini response:", text.slice(0, 200));

  // Clean and parse the JSON response
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  // Enforce bounds and consistency
  parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));
  parsed.passed = parsed.score >= 70;

  // Enforce breakdown bounds
  if (parsed.breakdown) {
    parsed.breakdown.factual_correctness = Math.max(0, Math.min(40, parsed.breakdown.factual_correctness));
    parsed.breakdown.completeness = Math.max(0, Math.min(30, parsed.breakdown.completeness));
    parsed.breakdown.clarity = Math.max(0, Math.min(20, parsed.breakdown.clarity));
    parsed.breakdown.depth = Math.max(0, Math.min(10, parsed.breakdown.depth));
  }

  return parsed;
}
