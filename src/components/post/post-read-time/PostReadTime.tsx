import { useMemo } from "react";

type Props = {
  content: string;
};

const WORDS_PER_MINUTE = 200;

export function PostReadTime({ content }: Props) {
  const koreanRegex = /[가-힣]/g;
  const matchedText = useMemo(() => content.match(koreanRegex), [content]);
  const timeToRead = (matchedText?.length ?? 0) / WORDS_PER_MINUTE;
  const formattedTime = timeToRead.toFixed();

  return <span className="text-sm italic">읽는 시간 : {formattedTime}분</span>;
}
