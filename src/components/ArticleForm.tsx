import { useState } from "react";
import { CONDITIONS, CATEGORIES, type ArticleFormData } from "../types/article.ts";

type ArticlesFormProps = {
  onCreateArticle: (data : ArticleFormData) => void,
};

type FormErrors = Partial<Record<keyof ArticleFormData, string>>;

const isValidImageUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export function ArticleForm({ onCreateArticle }: ArticlesFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedSize = size.trim();
    const trimmedImageUrl = imageUrl.trim();

    if (!trimmedTitle) {
      newErrors.title = "Le titre est requis.";
    } else if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
      newErrors.title = "Le titre doit contenir entre 3 et 100 caractères.";
    }

    if (!trimmedDescription) {
      newErrors.description = "La description est requise.";
    } else if (trimmedDescription.length < 10 || trimmedDescription.length > 1000) {
      newErrors.description = "La description doit contenir entre 10 et 1000 caractères.";
    }

    if (!price || Number.isNaN(price) || price <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0.";
    }

    if (!category) {
      newErrors.category = "La catégorie est requise.";
    } else if (!CATEGORIES.some((c) => c.id === category)) {
      newErrors.category = "Catégorie invalide.";
    }

    if (!trimmedSize) {
      newErrors.size = "La taille est requise.";
    }

    if (!condition) {
      newErrors.condition = "L'état est requis.";
    } else if (!CONDITIONS.some((c) => c.value === condition)) {
      newErrors.condition = "État invalide.";
    }

    if (!trimmedImageUrl) {
      newErrors.imageUrl = "L'URL de l'image est requise.";
    } else if (!isValidImageUrl(trimmedImageUrl)) {
      newErrors.imageUrl = "Veuillez fournir une URL valide (http/https).";
    }

    return newErrors;
  };

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
            {errors.imageUrl && (
              <p className="w-full text-xs text-red-600 mt-2">{errors.imageUrl}</p>
            )}
          </div>
          <div className="space-y-4 border-b border-gray-100 pb-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Titre</label>
              <input
                className={`w-full border-b focus:outline-none py-2 ${errors.title ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-teal-500"}`}
                value={title}
                type="text"
                placeholder="ex: Robe d'été fleurie"
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-xs text-red-600 mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Décris ton article</label>
              <textarea
                className={`w-full border-b focus:outline-none py-2 resize-none ${errors.description ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-teal-500"}`}
                value={description}
                placeholder="ex: Porté quelques fois, taille correctement"
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">{errors.description}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100 pb-8">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Catégorie</label>
              <select
                className={`w-full border-b focus:outline-none py-2 bg-white appearance-none cursor-pointer ${errors.category ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-teal-500"}`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Choisir...</option>
                {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
              </select>
              {errors.category && (
                <p className="text-xs text-red-600 mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Taille</label>
              <input
                className={`w-full border-b focus:outline-none py-2 ${errors.size ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-teal-500"}`}
                value={size} type="text" placeholder="S / 36 / 10" onChange={(e) => setSize(e.target.value)}
              />
              {errors.size && (
                <p className="text-xs text-red-600 mt-1">{errors.size}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">État</label>
              <select
                className={`w-full border-b focus:outline-none py-2 bg-white appearance-none cursor-pointer ${errors.condition ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-teal-500"}`}
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="" disabled>Choisir...</option>
                {CONDITIONS.map(cond => <option key={cond.value} value={cond.value}>{cond.label}</option>)}
              </select>
              {errors.condition && (
                <p className="text-xs text-red-600 mt-1">{errors.condition}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 uppercase tracking-wider text-xs">Prix (€)</label>
              <input
                className={`w-full border-b focus:outline-none py-2 ${errors.price ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-teal-500"}`}
                value={price} type="number" min={0} step="0.01" placeholder="0.00 €" onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
              {errors.price && (
                <p className="text-xs text-red-600 mt-1">{errors.price}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              className="w-full md:w-auto bg-[#09B1BA] hover:bg-[#08a1a9] text-white font-semibold py-3 px-12 rounded-md transition-all shadow-sm active:scale-95"
              onClick={(event) => {
                event.preventDefault();
                const validationErrors = validate();
                if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  return;
                }
                setErrors({});
                onCreateArticle({
                  title: title.trim(),
                  description: description.trim(),
                  price,
                  category,
                  size: size.trim(),
                  condition,
                  imageUrl: imageUrl.trim(),
                });
                setTitle("");
                setDescription("");
                setPrice(0);
                setCategory("");
                setSize("");
                setCondition("");
                setImageUrl("");
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