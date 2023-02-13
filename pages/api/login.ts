import { prisma } from "../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  if (req.method === "POST") {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          password: password,
        },
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
