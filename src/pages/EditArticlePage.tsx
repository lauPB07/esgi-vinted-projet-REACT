import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { ArticleForm } from "../components/ArticleForm.tsx";
import { api } from "../services/api.ts";
import type { Article, ArticleFormData } from "../types/article.ts";
import { useCurrentUserId } from "../hooks/useCurrentUserId.ts";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUserId = useCurrentUserId();

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article>({
    queryKey: ["articles", id],
    queryFn: () => api.get<Article>(`/api/articles/${id}`),
    enabled: Boolean(id),
  });

  const updateArticleMutation = useMutation({
    mutationFn: (data: ArticleFormData) => api.put<Article>(`/api/articles/${id}`, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["my-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles", id] });
      navigate(`/articles/${updated.id}`);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Erreur lors de la modification de l'article";
      window.alert(message);
    },
  });

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

  if (error || !article) {
    return <p>❌ Erreur lors du chargement de l'article, veuillez réessayer</p>;
  }

  if (article.userId !== currentUserId) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-600 font-semibold">
          Vous ne pouvez pas modifier cette annonce : elle ne vous appartient pas.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 border rounded-full bg-white text-gray-700 border-gray-500/20 shadow-sm hover:bg-gray-50 transition-all text-sm font-medium"
        >
          Retour au catalogue
        </button>
      </div>
    );
  }

  return (
    <ArticleForm
      article={article}
      onSubmit={(data) => updateArticleMutation.mutate(data)}
    />
  );
}