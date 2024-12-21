import Footer from "@/components/footer";
import { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
