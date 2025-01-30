import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `리암 테크블로그`,
  description: `디웨일 클라이언트 개발자 홍준혁입니다.`,
  openGraph: {
    images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitializerScript = `
    (function() {
      const savedTheme = localStorage.getItem('THEME_STORAGE_KEY');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = savedTheme ? JSON.parse(savedTheme) : prefersDark;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
        <GoogleAnalytics gaId="G-34J0L2NRDX" />
      </head>
      <body
        className={cn(
          inter.className,
          "transition-colors duration-200 dark:bg-background-dark dark:text-text-dark"
        )}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
