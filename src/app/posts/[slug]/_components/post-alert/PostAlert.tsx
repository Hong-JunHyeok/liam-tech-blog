import Link from "next/link";

type Props = {
  slug: string;
};

export default function PostAlert({ slug }: Props) {
  const GITHUB_FILE_LINK = `https://github.com/Hong-JunHyeok/liam-tech-blog/blob/main/_posts/${slug}.md`;

  return (
    <div className="border-b bg-subBackground dark:bg-subBackground-dark border-subBackground dark:border-subBackground-dark fixed top-0 w-full z-50">
      <div className="container mx-auto px-5">
        <div className="py-2 text-center text-sm ">
          지금 보시는 글은 100% 완벽하지 않습니다. 수정사항은{" "}
          <Link
            className="text-primary dark:text-primary-dark underline"
            href={GITHUB_FILE_LINK}
          >
            여기
          </Link>
          로 요청주세요.
        </div>
      </div>
    </div>
  );
}
