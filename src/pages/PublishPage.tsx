import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArticleForm } from "../components/ArticleForm.tsx";
import type { ArticleFormData } from "../types/article.ts";
import { api } from "../services/api.ts";
import { useNavigate } from "react-router-dom";

export default function PublishPage() {

  const navigate = useNavigate();

  const queryClient = useQueryClient();
const createArticleMutation = useMutation({
  mutationFn: (newArticle: ArticleFormData) => {
    return api.post<ArticleFormData>("/api/articles",newArticle);
  },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false
      });
      alert("Article publié avec succès !");
      navigate(`/`);
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
