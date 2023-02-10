import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from '../../utils/prisma'
import slugify from "slugify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const newData = {...req.body, slug: slugify(req.body.title)}
            await prisma.post.create({
                data: newData
            })
            res.status(200).json({"message": "Content updated Successfully"})
        } catch (err) {
            res.status(500).json({error: err});
        }
    }
};
