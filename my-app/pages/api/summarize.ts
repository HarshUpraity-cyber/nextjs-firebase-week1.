import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { text } = req.body;
  const summarized = `Summary of "${text}" → (mock response).`;

  return res.status(200).json({ response: summarized });
}
