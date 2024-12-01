import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-12 flex items-center text-title">
      <Link href="/" className="hover:underline mt-4">
        Liam의 기술블로그
      </Link>
    </h2>
  );
};

export default Header;
