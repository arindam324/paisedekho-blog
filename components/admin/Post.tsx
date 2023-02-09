import Image from "next/image";
import React from "react";

export type PostType = {

    image: string,
    title: string,
    content: string
}

type PostProps = {

    image: string,
    title: string,
    content: string
    setSelectedPost: (post: PostType) => void
}

const Post: React.FC<PostProps> = ({image, title, content, setSelectedPost}) => {
    return (
        <article
            onClick={() => setSelectedPost({image, title, content})}
            className={"p-4 flex cursor-pointer rounded-md  space-x-4 overflow-hidden shadow-lg"}>
            <div className={'w-[40%]  h-[80px] relative'}>
                <Image src={image} className={"object-cover"} fill={true}
                       alt={""}/>
            </div>
            <div>
                <h2 className={"font-semibold"}>{title}</h2>
                <p className={"line-clamp-2 text-zinc-500 text-sm"}>{content}</p>
            </div>
        </article>
    )
}


export default Post