import Head from "next/head";
import Header from "../components/Header";

import { GetServerSideProps } from "next";

import React from "react";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";

import { prisma } from "../utils/prisma";

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex relative min-h-screen flex-col ">
      <Head>
        <title>PaiseDekho Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-full -z-10 bg-gray-100 h-[40vh]" />
      <main className="max-w-[1280px] flex flex-col  w-full mx-auto">
        <Header />
        <div
          className={"relative mt-10 w-[90%] h-[200px] md:h-[350px]  mx-auto"}
        >
          <Image
            src={post.image}
            alt=""
            className="z-10 rounded-md object-cover"
            fill={true}
          />
          <div className={"lg:mt-96 mt-52"}>
            <h1 className={"text-4xl text-center font-semibold"}>
              {post.title}
            </h1>
            <div
              className={"text-lg leading-normal mt-8 text-center"}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

type Props = {
  post: {
    image: string;
    title: string;
    id: string;
    content: string;
  };
};

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  QueryParams
> = async (context) => {
  const slug = context.query.slug as string;
  const post = await prisma.post.findFirst({
    where: {
      slug: slug,
    },
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default Post;
