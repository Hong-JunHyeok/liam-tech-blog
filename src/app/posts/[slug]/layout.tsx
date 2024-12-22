import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
