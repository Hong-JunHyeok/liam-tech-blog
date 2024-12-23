import Link from "next/link";
import Container from "../container";

export function Footer() {
  return (
    <footer className="bg-subBackground dark:bg-subBackground-dark">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            글이 마음에 드셨다면 컨텍해주세요.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <Link
              href="mailto:functional.hong@gmail.com?cc=liam@dwhale.kr"
              className="mx-3 bg-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Contact Me
            </Link>
            <Link
              href="https://github.com/Hong-JunHyeok"
              className="mx-3 font-bold hover:underline"
              target="_blank"
            >
              My GitHub
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
