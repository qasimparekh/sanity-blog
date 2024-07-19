import Image from "next/image";

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/RichTextComponents";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

//? generate all dynamic pages at build time for faster performance
export async function generateStaticParams() {
  const query = groq`
  *[_type=='post']
    {
      slug
    }
  `;

  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((blogSlug) => ({
    slug: blogSlug,
  }));
}

const PostPage = async ({ params: { slug } }: Props) => {
  const query = groq`
        *[_type=='post' && slug.current == $slug][0]
        {
            ...,
            author->,
            categories[]->
        }
    `;

  const post: Post = await client.fetch(query, { slug });

  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#8178E6] text-white mb-8">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            {post?.mainImage && (
              <Image
                className="object-cover object-center mx-auto"
                src={urlForImage(post?.mainImage).url()}
                alt={post?.author?.name || "Blog Image"}
                fill
              />
            )}
          </div>

          <section className="p-5 bg-[#8178E6] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">{post?.title}</h1>
                <p>
                  {new Date(post?._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {post?.author?.image && (
                  <Image
                    className="rounded-full"
                    src={urlForImage(post?.author?.image).url()}
                    alt={post?.author?.name || "Author Image"}
                    height={40}
                    width={40}
                  />
                )}
                <div className="w-64">
                  <h3 className="text-lg font-bold">{post?.author?.name}</h3>
                  <div>TODO: Author Bio</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="italic pt-10">{post?.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post?.categories?.map((category) => (
                  <p
                    key={category?._id}
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                  >
                    {category?.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      //? further customize the rich text from sanity by passing in the components & adding custom styles to specific elements & tags
      <PortableText value={post?.body} components={RichTextComponents} />
    </article>
  );
};

export default PostPage;
