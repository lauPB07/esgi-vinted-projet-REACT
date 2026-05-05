import { ArticleItem } from "./ArticleItem.tsx";
import type { Article } from "../types/article.ts";

type ArticleListProps = {
  articles: Article[];
  onClickTitle: (idArticle: string) => void;
  showFavoriteButton?: boolean;
  onToggleFavorite?: (id: string) => void;
  favoriteIds?: Set<string>;
};

export function ArticleList({
  articles,
  onClickTitle,
  showFavoriteButton = false,
  onToggleFavorite,
  favoriteIds,
}: ArticleListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-4 p-4">
      {
        articles.map((article) => (
          <ArticleItem
            key={article.id}
            id={article.id}
            title={article.title}
            price={article.price}
            category={article.category}
            size={article.size}
            condition={article.condition}
            imageUrl={article.imageUrl}
            userName={article.userName}
            onClickTitle={onClickTitle}
            showFavoriteButton={showFavoriteButton}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favoriteIds?.has(article.id)}
            created_at={article.createdAt}
          />
        ))
      }
    </div>
  );
}
