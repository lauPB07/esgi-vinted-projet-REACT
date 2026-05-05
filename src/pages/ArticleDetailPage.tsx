import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article.ts";
import { api } from "../services/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleDetail } from "../components/ArticleDetailsItem.tsx";
import { Spinner } from "@material-tailwind/react";

const API_URL = "/api/articles";
export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article>({
    queryKey: ["articles", id],
    queryFn: () => api.get<Article>(API_URL + "/" + id),
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
    return "❌ Erreur lors du chargement des articles, veuillez réessayer";
  }

  function onClickChangePage() {
    navigate(-1);
  }

  return (
    <div>
      <button
        onClick={onClickChangePage}
        className="group mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>

        <span>Retour</span>
      </button>
      <h1 className="text-3xl font-bold mb-6">Détails de l'article</h1>
      <ArticleDetail article={article} />
    </div>
  );
}
