import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { fileName, uid } = JSON.parse(req.body);
  console.log("Uploaded file metadata:", { fileName, uid });
  res.status(200).json({ success: true });
}
