import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article.ts";
import { ArticleList } from "../components/ArticleList.tsx";
import { api } from "../services/api.ts";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const API_URL = "/api/articles";

export default function CataloguePage() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      const result = await api.get<Article[]>(API_URL);
      console.log("Ma data reçue :", result);
      return result;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Spinner className="h-16 w-16 text-green-600" onResize={undefined} onResizeCapture={undefined}
                 onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
    );
  }

  if (error) {
    return "❌ Erreur lors du chargement des articles, veuillez réessayer";
  }

  function onCliTitle(idArticle: string) {
    navigate(`/articles/${idArticle}`)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catalogue</h1>
      <ArticleList articles={data || []} onClickTitle={onCliTitle}/>
    </div>
  );
}
