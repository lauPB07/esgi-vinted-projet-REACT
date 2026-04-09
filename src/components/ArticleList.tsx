import { ArticleItem } from "./ArticleItem.tsx";
import type { Article } from "../types/article.ts";

type ArticleListProps = {
    articles: Article[]; // On précise que c'est un tableau d'objets "Article"
    onClickTitle: (idArticle: string) => void;
};

export function ArticleList({ articles, onClickTitle }: ArticleListProps) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-4 p-4">
          {articles.map((article) => (
            <ArticleItem
              key={article.id}
              id={article.id}
              title={article.title}
              price={article.price}
              size={article.size}
              imageUrl={article.imageUrl}
              userName={article.userName}
              onClickTitle={onClickTitle}
            />
          ))}
      </div>
    );
}