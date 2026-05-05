import type { Article } from "../types/article.ts";
import { getCategoryLabelByValue, getConditionLabelByValue } from "../types/article.ts";

type ArticleDetailProps = {
  article: Article;
};

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatPrice = (value: number): string =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);

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

export function ArticleDetail({ article }: ArticleDetailProps) {
  const avatarColor = getAvatarColor(article.userName);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-inner">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto object-contain max-h-[600px] mx-auto"
            />
          </div>
        </div>
        <div className="w-full md:w-[350px] flex flex-col gap-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-gray-900">
              {formatPrice(article.price)}
            </h1>
            <h2 className="text-lg text-gray-700 font-medium">
              {article.title}
            </h2>
          </div>

          <hr className="border-gray-100" />
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">TAILLE</span>
              <span className="text-gray-800 font-semibold">
                {article.size}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">ÉTAT</span>
              <span className="text-gray-800 font-semibold">
                {getConditionLabelByValue(article.condition)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">CATÉGORIE</span>
              <span className="text-gray-800 font-semibold">
                {getCategoryLabelByValue(article.category)}
              </span>
            </div>
          </div>

          <hr className="border-gray-100" />
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {article.description}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
            <div
              className={`w-7 h-7 rounded-full ${avatarColor} flex items-center justify-center text-[11px] font-bold text-white shadow-sm`}
            >
              {article.userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">
                {article.userName}
              </span>
              <span className="text-xs text-green-600">En ligne récemment</span>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            Publiée le
            { " " + formatDate(article.createdAt)}
          </p>
          <button className="w-full bg-brand hover:bg-brand-strong text-white font-bold py-3 rounded-md transition-all mt-2">
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
}
