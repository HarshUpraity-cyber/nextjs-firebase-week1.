import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { text } = req.body;

  const quiz = {
    question: `What is the main idea of "${text}"?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option B",
  };

  return res.status(200).json({ quiz });
}
