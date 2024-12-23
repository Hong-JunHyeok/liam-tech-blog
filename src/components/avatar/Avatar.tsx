import { Author } from "@/types/author";
import Septerator from "../septerator";

const Avatar = ({ name, picture, description }: Author) => {
  return (
    <div className="flex items-center text-text dark:text-text-dark">
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="text-xl font-bold">{name}</div>

      {description && (
        <div className="hidden sm:flex items-center mt-1 text-sm text-gray-600">
          <Septerator />
          {description}
        </div>
      )}
    </div>
  );
};

export default Avatar;
