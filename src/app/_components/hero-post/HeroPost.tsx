import Link from "next/link";
import DateFormatter from "../../../components/date-formatter";
import CoverImage from "../cover-image";
import Avatar from "../../../components/avatar";
import { Post } from "@/types/post";
import PostReadTime from "../post-read-time";
import Septerator from "@/components/septerator";

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
          <div className="mb-4 md:mb-0 text-lg text-content flex items-center">
            <DateFormatter dateString={date} />
            <Septerator />
            <PostReadTime content={content} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4 text-content">{excerpt}</p>
          <Avatar {...author} />
        </div>
      </div>
    </section>
  );
}
