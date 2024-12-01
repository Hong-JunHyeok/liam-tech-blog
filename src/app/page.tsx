import { getAllPosts } from "@/lib/api";
import Container from "../components/container";
import HeroPost from "./_components/hero-post";
import Intro from "./_components/intro";
import MorePosts from "./_components/more-posts";

export default function Index() {
  const allPosts = getAllPosts();

  const [heroPost, morePosts] = [allPosts[0], allPosts.slice(1)];

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MorePosts posts={morePosts} />}
      </Container>
    </main>
  );
}
