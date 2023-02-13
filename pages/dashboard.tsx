import React, { useState } from "react";
import Post from "../components/admin/Post";
import Sidebar from "../components/admin/Sidebar";
import EmailForm from "../components/admin/EmailForm";
import { getPosts } from "../utils/prisma";
import { useRouter } from "next/router";

import { requireAuthentication } from "../utils/requireAuthentication";

import { Post as Postype } from "@prisma/client";

type Props = {
  posts: Postype[];
};

const Dashboard: React.FC<Props> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<null | string>(null);
  const [showPosts, setShowPosts] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-1 grid gap-5  grid-cols-2 ml-72  p-10">
        <div>
          <div className={"flex items-center justify-between"}>
            <h2 className={"text-4xl font-semibold"}>All Posts</h2>
            <button
              onClick={() => router.push("/newPost")}
              className={"px-8 py-2 rounded-md bg-green-600 text-white"}
            >
              Create new Post
            </button>
          </div>

          <div className={"max-w-3xl w-full mt-4"}>
            <div className={"flex w-full justify-between items-center"}>
              <div className={"w-[95%] h-[1px] bg-black"} />
              <button onClick={() => setShowPosts(!showPosts)}>
                {showPosts ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {showPosts && (
              <div className={"flex w-full justify-between"}>
                <div className={"space-y-4 max-w-3xl w-full "}>
                  {posts.map((item) => (
                    <Post
                      setSelectedPost={setSelectedPost}
                      key={item.id}
                      title={item.title}
                      slug={item.slug}
                      content={item.content}
                      image={item.image}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto w-full ">
          <EmailForm selectedPost={selectedPost} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = requireAuthentication(async (context) => {
  const posts = await getPosts();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
});

export default Dashboard;
