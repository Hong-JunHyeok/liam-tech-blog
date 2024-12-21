import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import Container from "@/components/container";
import Header from "@/components/header";

import PostHeader from "./_components/post-header";
import PostBody from "./_components/post-body";
import PostAlert from "./_components/post-alert";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main>
      <PostAlert slug={params.slug} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader {...post} />
          <PostBody content={post.content} />
        </article>
      </Container>
    </main>
  );
}
