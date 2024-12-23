import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { RiFilePaperLine } from "react-icons/ri";
import hljs from "highlight.js";
import PostTOC from "../post-toc";

import "./index.css";
import Link from "next/link";

type Props = {
  content: string;
  published: boolean;
};

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

const renderer = new marked.Renderer();

renderer.heading = ({ text, depth }) => {
  const id = text;
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

marked.setOptions({ renderer });

export function PostBody({ content, published }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      {published ? (
        <>
          <PostTOC content={content} />
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content),
            }}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <RiFilePaperLine className="text-8xl text-primary dark:text-primary-dark animate-pulse duration-700" />
          <span className="text-4xl font-semibold text-gray-700 dark:text-gray-300">
            발행 예정 글입니다.
          </span>
          <Link href="/" className="text-primary dark:text-primary-dark">
            다른 글들 보러가기
          </Link>
        </div>
      )}
    </div>
  );
}
