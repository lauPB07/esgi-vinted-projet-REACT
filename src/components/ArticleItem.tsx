import { getCategoryLabelByValue, getConditionLabelByValue } from "../types/article.ts";

type ArticleItemProps = {
  id: string;
  title: string;
  price: number;
  category: string;
  size: string;
  condition: string;
  imageUrl: string;
  userName: string;
  onClickTitle: (idArticle: string) => void;
  onToggleFavorite?: (id: string) => void;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
  created_at: string;
  showDeleteButton?: boolean;
  onDelete?: (id: string) => void;
};

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
  ];
  const charSum = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[charSum % colors.length];
};

export function ArticleItem({
  id,
  title,
  price,
  category,
  size,
  condition,
  imageUrl,
  userName,
  onClickTitle,
  showFavoriteButton,
  onToggleFavorite,
  isFavorite,
  created_at,
  showDeleteButton,
  onDelete,
}: ArticleItemProps) {
  const avatarColor = getAvatarColor(userName);

  return (
    <div className="flex flex-col gap-2 cursor-pointer group max-w-[200px] relative">
      <div className="flex items-center gap-2 px-1">
        <div
          className={`w-7 h-7 rounded-full ${avatarColor} flex items-center justify-center text-[11px] font-bold text-white shadow-sm`}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs text-gray-500 truncate">{userName}</span>
      </div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
        <img
          onClick={() => onClickTitle(id)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={imageUrl}
          alt={title}
        />

        {showDeleteButton && onDelete ? (
          <button
            onClick={(event) => {
              event.stopPropagation();
              if (window.confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
                onDelete(id);
              }
            }}
            className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
            aria-label="Supprimer l'annonce"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        ) : null}

        {showFavoriteButton && onToggleFavorite ? (
          <button
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavorite(id);
            }}
            className="absolute bottom-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-5 h-5 ${
                isFavorite
                  ? "text-red-500 fill-red-500"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        ) : null}
      </div>
      <div className="flex flex-col px-1">
        <span className="text-base font-bold text-gray-900">{price} €</span>
        <span className="text-xs text-gray-400 uppercase tracking-tighter">
          {size}
        </span>
        <span className="text-xs text-gray-400 truncate">{title}</span>
        <span className="text-xs text-gray-400 truncate">{getConditionLabelByValue(condition)}</span>
        <span className="text-xs text-gray-400 truncate">{getCategoryLabelByValue(category)}</span>
        <span className="text-xs text-gray-400 truncate">{created_at}</span>
      </div>
    </div>
  );
}
