import Image from "next/image";
import React from "react";

// import { Post } from "@prisma/client";

interface PostProps {
  image: string;
  title: string;
  content: string;
  slug: string;
  setSelectedPost: (slug: string) => void;
}

const Post: React.FC<PostProps> = ({
  image,
  title,
  content,
  slug,
  setSelectedPost,
}) => {
  return (
    <article
      onClick={() => setSelectedPost(slug)}
      className={
        "p-4  cursor-pointer grid grid-cols-6 rounded-md   overflow-hidden shadow-lg"
      }
    >
      <div className={"w-[100px]  h-[80px] relative"}>
        <Image src={image} className={"object-cover"} fill={true} alt={""} />
      </div>
      <div className="col-span-4">
        <h2 className={"font-semibold"}>{title}</h2>
        <div
          className={"line-clamp-2  text-zinc-500 text-sm"}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
};

export default Post;
