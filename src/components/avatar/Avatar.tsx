import { Author } from "@/types/author";

const Avatar = ({ name, picture, description }: Author) => {
  return (
    <div className="flex items-center text-content">
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="text-xl font-bold">{name}</div>

      {description && (
        <div className="hidden sm:flex items-center mt-1 text-sm text-gray-600">
          <span className="w-1 h-1 bg-gray-400 rounded-full mx-2"></span>
          {description}
        </div>
      )}
    </div>
  );
};

export default Avatar;
