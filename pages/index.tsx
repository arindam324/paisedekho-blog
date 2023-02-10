import type {GetServerSideProps, NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'

import Header from "../components/Header";
import {getPosts} from "../utils/prisma";

type Post = {
    id: number
    title: string,
    content: string,
    image: string
}
type Props = {
    posts: Post[]
}

const Home: NextPage<Props> = ({posts}) => {

    return (
        <div className="flex relative min-h-screen flex-col ">
            <Head>
                <title>PaiseDekho Blog</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="absolute w-full -z-10 bg-gray-100 h-[40vh]"/>
            <main className="max-w-[1280px] flex flex-col  w-full mx-auto">
                <Header/>
                <div className=" flex flex-col lg:flex-row mt-2 space-x-8 items-center -z-10  ">
                    <div className={"relative w-[90%] h-[200px] md:h-[350px]  mx-auto"}>
                        <Image
                            src="https://images.unsplash.com/photo-1675432980667-95da207814a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                            alt=""
                            className="z-10 rounded-md object-cover"
                            fill={true}
                        />
                    </div>
                    <div>
                        <h1 className="text-4xl mt-2 font-bold">How to start investing?</h1>
                        <p className="text-sm text-zinc-800 leading-5 mt-4">
                            The first step to start investing or investment is the basics of
                            investing. They are as follows: Select the budget you want to
                            invest: Investment doesn’t always require large funds to begin
                            with, a small investment can also begin to start the journey of
                            investment.
                        </p>
                    </div>
                </div>
                <div className="grid mt-10 lg:grid-cols-2 place-items-center grid-cols-1 gap-5">
                    {posts.map((item) => (
                        <Link href={`${item.id}`}>
                        <article className="max-w-[400px] w-full p-4 " key={item.id}>
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
                            <p className="line-clamp-3 text-sm text-zinc-500 leading-6">
                                {item.content}
                            </p>
                        </article>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};


export const getServerSideProps: GetServerSideProps<Props> = async () => {

    const posts = await getPosts()
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    }
}



export default Home;
