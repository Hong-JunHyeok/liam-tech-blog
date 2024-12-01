import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="text-sm italic">
      {format(date, "yyyy년 MM월 dd일")}에 작성된 글
    </time>
  );
};

export default DateFormatter;
