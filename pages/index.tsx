import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Header from "../components/Header";
import { prisma } from "../utils/prisma";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type Props = {
  posts: Post[];
  PrimaryPost: Post;
};

const Home: NextPage<Props> = ({ posts, PrimaryPost }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="flex items-center justify-center">Loading....</div>;
  }

  return (
    <div className="flex relative min-h-screen flex-col ">
      <div className="absolute w-full -z-10 bg-gray-100 h-[40vh]" />
      <main className="max-w-[1280px] flex flex-col  w-full mx-auto">
        <Header />
        <Link href={`/${PrimaryPost?.slug}`}>
          <div className=" flex flex-col lg:flex-row mt-2 space-x-8 items-center -z-10  ">
            <div className={"relative w-[90%] h-[200px] md:h-[350px]  mx-auto"}>
              <Image
                src={PrimaryPost?.image}
                alt=""
                priority={true}
                className="z-10 rounded-md object-cover"
                fill={true}
              />
            </div>
            <div>
              <h1 className="text-4xl mt-2 font-bold">{PrimaryPost?.title}</h1>
              <div
                className="text-sm text-zinc-800 leading-5 mt-4"
                dangerouslySetInnerHTML={{ __html: PrimaryPost.content }}
              />
            </div>
          </div>
        </Link>
        <div className="grid mt-10 lg:grid-cols-2 place-items-center grid-cols-1 gap-5">
          {posts.map((item) => (
            <article
              onClick={() => router.push(`/${item.slug}`)}
              key={item.id}
              className="max-w-[400px] cursor-pointer w-full p-4 "
            >
              <div>
                <div className={"relative w-full h-[190px] md:h-[300px]"}>
                  <Image
                    src={item.image}
                    alt={""}
                    className={"rounded-md object-cover"}
                    fill={true}
                  />
                </div>
                <h2 className="text-2xl font-semibold leading-normal">
                  {item.title}
                </h2>
                <div
                  className="line-clamp-3 text-sm text-zinc-500 leading-6"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    where: {
      isPrmary: false,
    },
    // take: 6,
  });
  const PrimaryPost = await prisma.post.findFirst({
    where: {
      isPrmary: true,
    },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      PrimaryPost: JSON.parse(JSON.stringify(PrimaryPost)),
    },
  };
};

export default Home;
