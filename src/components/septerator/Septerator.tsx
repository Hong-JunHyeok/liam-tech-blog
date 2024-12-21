type Props = {
  septerateContent?: string;
};

export function Septerator({ septerateContent }: Props) {
  return (
    <span className="text-gray-500 text-2xl select-none mx-2">
      {septerateContent ?? "·"}
    </span>
  );
}
