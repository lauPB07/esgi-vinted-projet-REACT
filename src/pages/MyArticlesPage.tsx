import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArticleList } from "../components/ArticleList.tsx";
import { api } from "../services/api.ts";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import type { Article } from "../types/article.ts";

export default function MyArticlesPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<Article[]>({
    queryKey: ["my-articles"],
    queryFn: async () => {
      const result = await api.get<Article[]>('/api/articles?mine=true');
      if (!result) throw new Error("Erreur HTTP");
      return result;
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: (articleId: string) => api.delete(`/api/articles/${articleId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Erreur lors de la suppression de l'annonce";
      window.alert(message);
    },
  });

  const handleDelete = (articleId: string) => {
    deleteArticleMutation.mutate(articleId);
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
    return <p>❌ Erreur lors du chargement de vos annonces, veuillez réessayer</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mes annonces ({data?.length ?? 0})</h1>
      {data?.length ? (
        <ArticleList
          articles={data}
          onClickTitle={(id) => navigate(`/articles/${id}`)}
          showDeleteButton={true}
          onDelete={handleDelete}
          showEditButton={true}
          onEdit={(id) => navigate(`/articles/${id}/edit`)}
        />
      ) : (
        <p className="text-gray-600">Vous n'avez pas encore publié d'annonce.</p>
      )}
    </div>
  );
}
