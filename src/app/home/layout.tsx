import Container from "@/components/container";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import ThemeSwitch from "@/components/theme-switch";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <Container>{children}</Container>
      <div className="flex fixed bottom-5 right-5 z-50 gap-2">
        <ScrollToTopButton />
        <ThemeSwitch />
      </div>
    </main>
  );
}
