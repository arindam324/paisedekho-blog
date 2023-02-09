import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from '../../utils/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {title, content, image} = req.body
        await prisma.post.update({
            where: {
                title: title
            },
            data: {
                title,
                image,
                content
            }
        })
        res.status(200).json({"message": "Content updated Successfully"})

    } catch (err) {
        res.status(500).json({error: err});
    }
};
