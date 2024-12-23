import Container from "@/components/container";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import ThemeSwitch from "@/components/theme-switch";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <Container>{children}</Container>
      <ThemeSwitch />
      <ScrollToTopButton />
    </main>
  );
}
