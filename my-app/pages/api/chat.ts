import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { message } = req.body;
  // Dummy reply – replace with AI model / backend later
  res.status(200).json({ reply: `You said: ${message}` });
}
