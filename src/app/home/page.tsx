import { getAllPosts } from "@/lib/api";
import Intro from "./_components/intro";
import HeroPost from "./_components/hero-post";
import MorePosts from "./_components/more-posts";

export default function Page() {
  const allPosts = getAllPosts();

  const [heroPost, ...morePosts] = allPosts;

  return (
    <>
      <Intro />
      <HeroPost {...heroPost} />
      {morePosts.length > 0 && <MorePosts posts={morePosts} />}
    </>
  );
}
