import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prismaClient";

// GET - get company by username
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const username = req.query.username as string;

  try {
    return res.status(200).json(
      await prisma.company.findUnique({
        where: { username },
        include: { jobs: true, locations: true },
      })
    );
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Unknown Error" });
  }
}
