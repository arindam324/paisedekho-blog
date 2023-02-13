import React from "react";
import { prisma } from "../utils/prisma";
import glob from "glob";
import { NextApiResponse } from "next";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async (res: NextApiResponse) => {
  const BASE_URL = process.env.BASE_URL;

  const pagesDir = "pages/**/*.tsx";
  let pagesPaths = await glob.sync(pagesDir);

  pagesPaths = pagesPaths
    .filter((path) => !path.includes("["))
    .filter((path) => !path.includes("/_"))
    .filter((path) => !path.includes("login"))
    .filter((path) => !path.includes("newPost"))
    .filter((path) => !path.includes("login"))
    .filter((path) => !path.includes("404"));

  const posts = await prisma.post.findMany();
  const dynamicPaths = posts.map((item) => {
    return `${BASE_URL}/${item.slug}`;
  });

  const allPaths = [...pagesPaths, ...dynamicPaths];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    ${allPaths
      .map((url) => {
        return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
