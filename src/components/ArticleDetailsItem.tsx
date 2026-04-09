import type { Article } from "../types/article.ts";

type ArticleDetailProps = {
  article: Article;
};

export function ArticleDetail({ article }: ArticleDetailProps) {
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
            <h1 className="text-4xl font-bold text-gray-900">{article.price} €</h1>
            <h2 className="text-lg text-gray-700 font-medium">{article.title}</h2>
          </div>

          <hr className="border-gray-100" />
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">TAILLE</span>
              <span className="text-gray-800 font-semibold">{article.size}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">ÉTAT</span>
              <span className="text-gray-800 font-semibold">{article.condition}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">CATÉGORIE</span>
              <span className="text-gray-800 font-semibold">{article.category}</span>
            </div>
          </div>

          <hr className="border-gray-100" />
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Description</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {article.description}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-softer flex items-center justify-center text-brand-strong font-bold">
              {article.userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">{article.userName}</span>
              <span className="text-xs text-green-600">En ligne récemment</span>
            </div>
          </div>
          <button className="w-full bg-brand hover:bg-brand-strong text-white font-bold py-3 rounded-md transition-all mt-2">
            Acheter
          </button>
        </div>

      </div>
    </div>
  );
}