import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArticleForm } from "../components/ArticleForm.tsx";
import type { Article, ArticleFormData } from "../types/article.ts";
import { api } from "../services/api.ts";
import { useNavigate } from "react-router-dom";


export function alertMessage(message: string) {
  return (
    <div className="bg-green-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p className="font-bold">Be Warned</p>
      <p>{message}</p>
    </div>
  )
}

export default function PublishPage() {

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const createArticleMutation = useMutation({
    mutationFn: (newArticle: ArticleFormData) => {
    return api.post<Article>("/api/articles",newArticle);
  },
    onSuccess(createdArticle) {
      queryClient.invalidateQueries({
        queryKey: ["articles"]
      });
      alertMessage("Article publié avec succès !");
      navigate(`/articles/${createdArticle.id}`);
    },}
  )

  async function handleCreateArticle(data: ArticleFormData) {
    await createArticleMutation.mutateAsync(data);
    }
  return (
    <><h1>Publier une annonce</h1>
      <ArticleForm onCreateArticle={handleCreateArticle} /></>

  );
}
