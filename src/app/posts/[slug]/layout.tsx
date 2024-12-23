import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import ThemeSwitch from "@/components/theme-switch";
import { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}

      <Footer />
      <div className="flex fixed bottom-5 right-5 z-50 gap-2">
        <ScrollToTopButton />
        <ThemeSwitch />
      </div>
    </>
  );
}
