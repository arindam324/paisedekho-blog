import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";
import slugify from "slugify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const post = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
          meta_description: req.body.metaDescription,
          slug: slugify(req.body.title),
        },
      });
      res.status(200).json({ message: "Content updated Successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
