import Link from "next/link";

type Props = {
  title: string;
};

export default function PostAlert({ title }: Props) {
  const getPostToGithubLink = `${title}`;

  return (
    <div className="border-b bg-accent-1 border-accent-2 fixed top-0 w-full">
      <div className="container mx-auto px-5">
        <div className="py-2 text-center text-sm ">
          지금 보시는 글은 100% 완벽하지 않습니다. 수정사항은{" "}
          <Link className="text-success underline" href={getPostToGithubLink}>
            여기
          </Link>
          로 요청주세요.
        </div>
      </div>
    </div>
  );
}
