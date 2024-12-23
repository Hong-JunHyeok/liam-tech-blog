import Link from "next/link";
import CoverImage from "../../../../components/post/cover-image";
import { Post } from "@/types/post";
import PostReadTime from "../../../../components/post/post-read-time";
import Septerator from "@/components/septerator";
import DateFormatter from "@/components/date-formatter";
import Avatar from "@/components/avatar";

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  content,
  slug,
}: Post) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight text-title font-bold">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg text-text dark:text-text-dark flex items-center">
            <DateFormatter dateString={date} />
            <Septerator />
            <PostReadTime content={content} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4 text-text dark:text-text-dark">
            {excerpt}
          </p>
          <Avatar {...author} />
        </div>
      </div>
    </section>
  );
}
