import { twMerge } from "tailwind-merge";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={twMerge("container mx-auto px-5", className)}>
      {children}
    </div>
  );
};

export default Container;
