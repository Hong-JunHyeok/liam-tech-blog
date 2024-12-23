import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

import "./index.css";

type Props = {
  content: string;
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

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="post-content"
        dangerouslySetInnerHTML={{
          __html: marked.parse(content),
        }}
      />
    </div>
  );
}
