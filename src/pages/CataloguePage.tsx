import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article.ts";
import { ArticleList } from "../components/ArticleList.tsx";
import { api } from "../services/api.ts";

const API_URL = "/api/articles";

export default function CataloguePage() {

  //const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      const result = await api.get<Article[]>(API_URL);
      console.log("Ma data reçue :", result);
      return result;
    },
  });

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "❌ Erreur lors du chargement des articles, veuillez réessayer";
  }

  function onCliTitle(){

  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catalogue</h1>
      <ArticleList articles={data || []} onClickTitle={onCliTitle}/>
    </div>
  );
}
