import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArticleList } from "../components/ArticleList.tsx";
import { api } from "../services/api.ts";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import type { Article } from "../types/article.ts";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<Article[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const result = await api.get<Article[]>("/api/favorites");
      if (!result) throw new Error("Erreur HTTP");
      return result;
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (articleId: string) => api.delete(`/api/favorites/${articleId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Erreur lors de la suppression des favoris";
      window.alert(message);
    },
  });

  const handleRemoveFavorite = async (articleId: string) => {
    await removeFavoriteMutation.mutateAsync(articleId);
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Spinner
          className="h-16 w-16 text-green-600"
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  if (error) {
    return <p>❌ Erreur lors du chargement de vos favoris, veuillez réessayer</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Favoris ({data?.length ?? 0})</h1>
      {data?.length ? (
        <ArticleList
          articles={data}
          onClickTitle={(id) => navigate(`/articles/${id}`)}
          showFavoriteButton={true}
          onToggleFavorite={handleRemoveFavorite}
          favoriteIds={new Set(data.map((a) => a.id))}
        />
      ) : (
        <p className="text-gray-600">Vous n'avez pas encore ajouté d'annonce aux favoris.</p>
      )}
    </div>
  );
}
