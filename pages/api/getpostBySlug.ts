import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug }: { slug?: string } = req.query;
    try {
      const post = await prisma.post.findFirst({
        where: {
          slug: slug,
        },
      });
      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json("there is something error");
    }
  }
}
