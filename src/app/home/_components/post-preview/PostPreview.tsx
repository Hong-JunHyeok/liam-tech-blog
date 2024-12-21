import Link from "next/link";
import CoverImage from "../../../../components/post/cover-image/CoverImage";
import Septerator from "@/components/septerator";
import PostReadTime from "../../../../components/post/post-read-time";
import { Post } from "@/types/post";
import DateFormatter from "@/components/date-formatter";
import Avatar from "@/components/avatar";

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  content,
  author,
  slug,
}: Post) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="flex items-center text-lg mb-4">
        <DateFormatter dateString={date} />
        <Septerator />
        <PostReadTime content={content} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
