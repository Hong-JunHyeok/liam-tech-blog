import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container>
      <div className="flex-col flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-2xl font-bold tracking-tighter leading-tight md:pr-8 text-title mb-4">
          Liam의 기술블로그
        </h1>

        <Image
          src="/assets/common/not-found.jpg"
          alt="Not Found HaHa"
          width={200}
          height={258}
        />
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8 mt-4 text-title">
          페이지를 찾을 수 없음
        </h2>
        <p className="mt-5">요청하신 페이지는 없는 페이지입니다.</p>
        <Link href="/" className="text-success">
          홈으로 돌아가기
        </Link>
      </div>
    </Container>
  );
}
