import { useState } from "react";
import { CONDITIONS, CATEGORIES, type ArticleFormData } from "../types/article.ts";

type ArticlesFormProps = {
  onCreateArticle: (data : ArticleFormData) => void,
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
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">Vends tes articles</h1>

        <form className="space-y-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
            <input
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              value={imageUrl}
              type="text"
              placeholder="Colle l'URL de l'image ici"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="space-y-4 border-b border-gray-100 pb-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Titre</label>
              <input
                className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2"
                value={title}
                type="text"
                placeholder="ex: Robe d'été fleurie"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Décris ton article</label>
              <textarea
                className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2 resize-none"
                value={description}
                placeholder="ex: Porté quelques fois, taille correctement"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100 pb-8">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Catégorie</label>
              <select
                className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2 bg-white appearance-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Choisir...</option>
                {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Taille</label>
              <input
                className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2"
                value={size} type="text" placeholder="S / 36 / 10" onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">État</label>
              <select
                className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2 bg-white appearance-none cursor-pointer"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="" disabled>Choisir...</option>
                {CONDITIONS.map(cond => <option key={cond.value} value={cond.value}>{cond.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Prix (€)</label>
              <input
                className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2"
                value={price} type="number" placeholder="0.00 €" onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              className="w-full md:w-auto bg-[#09B1BA] hover:bg-[#08a1a9] text-white font-semibold py-3 px-12 rounded-md transition-all shadow-sm active:scale-95"
              onClick={(event) => {
                event.preventDefault();
                if (title && imageUrl) {
                  onCreateArticle(
                    {
                      title,
                      description,
                      price,
                      category,
                      size,
                      condition,
                      imageUrl
                    }
                  );
                  setTitle("");
                  setDescription("");
                  setPrice(0);
                  setCategory("");
                  setSize("");
                  setCondition("");
                  setImageUrl("");
                }
              }}
              type="submit"
            >
              Ajouter l'article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}