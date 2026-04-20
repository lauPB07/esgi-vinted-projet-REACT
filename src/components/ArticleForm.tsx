import { useState } from "react";

type ArticlesFormProps = {
  onCreateArticle: (title: string) => void,
};

export function ArticleForm({ onCreateArticle }: ArticlesFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <h1>Ajouter un article</h1>
      <form></form>
  )
}