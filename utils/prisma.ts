import {PrismaClient} from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export const postUpdate = async (id: string, title?: string, content?: string, image?: string) => {
    return await prisma.post.update({
        where: {
            id: Number(id)
        },
        data: {
            title,
            content,
            image
        }
    })
}

export const findPostByTitle = async (id: number) => {
    return await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })
}

export const getPosts = async () => {
    return await prisma.post.findMany();
}