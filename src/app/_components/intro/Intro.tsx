import Link from "next/link";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8 text-title">
        Liam의 기술블로그
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8 text-title">
        <Link
          href="https://welcome.clap.company/"
          target="_blank"
          className="text-success"
        >
          DWhale
        </Link>{" "}
        클라이언트 개발자 홍준혁입니다.
        <br />
        변경사항에 유연하게 대처하기 위한 코드 설계에 관심이 많습니다.
      </h4>
    </section>
  );
}
