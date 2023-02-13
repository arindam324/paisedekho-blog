import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { slug }: { slug?: string } = req.query;
      const updatedData = req.body;
      await prisma.post.update({
        where: {
          slug: slug,
        },
        data: updatedData,
      });
      res.status(200).json({ message: "Content updated Successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
