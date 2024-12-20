import { getAllPosts } from "@/lib/api";
import Container from "../components/container";
import HeroPost from "./_components/hero-post";
import Intro from "./_components/intro";
import MorePosts from "./_components/more-posts";

export default function Index() {
  const allPosts = getAllPosts();

  const [heroPost, ...morePosts] = allPosts;

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost {...heroPost} />
        {morePosts.length > 0 && <MorePosts posts={morePosts} />}
      </Container>
    </main>
  );
}
