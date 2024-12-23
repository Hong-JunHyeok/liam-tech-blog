"use client";
import Link from "next/link";
import { getHeadingList, moveToTitleTag } from "./utils";
import classNames from "classnames";

type Props = {
  content: string;
};

function PostTOC({ content }: Props) {
  const headingList = getHeadingList(content);

  const handleClickAnchor =
    (title: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      moveToTitleTag(title);
    };

  return (
    <ul className="max-w-2xl mx-auto flex-row">
      {headingList.map(({ title, level }, index) => {
        return (
          <li
            key={index}
            className={classNames(
              "mb-2",
              { "ml-6": level === 2 },
              { "ml-12": level === 3 },
              { "ml-18": level === 4 }
            )}
          >
            <Link
              href={`#${title}`}
              onClick={handleClickAnchor(title)}
              className="text-slate-600 dark:text-slate-200 underline opacity-60 inline-block"
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default PostTOC;
