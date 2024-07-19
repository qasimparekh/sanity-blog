import { Suspense } from "react";
import { draftMode } from "next/headers";

import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import { LiveQuery } from "next-sanity/preview/live-query";

import BlogList from "@/components/BlogList";
import PreviewBlogList from "@/components/PreviewBlogList";

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export const revalidate = 60; //? fetch new data every 1 minute

export default async function Home() {
  const { isEnabled } = draftMode();
  const posts: Post[] = await sanityFetch({ query, tags: ["post"] });

  return (
    <Suspense
      fallback={
        <div role="status">
          <p className="text-center text-lg animate-pulse text-[#8178E6]">
            Loading Preview Data....
          </p>
        </div>
      }
    >
      <LiveQuery
        enabled={isEnabled}
        query={query}
        initialData={posts}
        as={PreviewBlogList}
      >
        <BlogList posts={posts} />
      </LiveQuery>
    </Suspense>
  );
}
