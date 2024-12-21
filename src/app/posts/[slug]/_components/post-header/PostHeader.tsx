import Avatar from "@/components/avatar";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/components/date-formatter";
import PostTitle from "@/app/_components/post-title";
import Septerator from "@/components/septerator";
import PostReadTime from "@/app/_components/post-read-time";
import { Post } from "@/types/post";

export function PostHeader({ title, coverImage, date, author, content }: Post) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar {...author} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar {...author} />
        </div>
        <div className="mb-6 text-lg flex items-center">
          <DateFormatter dateString={date} />
          <Septerator />
          <PostReadTime content={content} />
        </div>
      </div>
    </>
  );
}
