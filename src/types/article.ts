export type Article = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  size: string;
  condition: string;
  imageUrl: string;
  userName: string;
  userId: string;
  createdAt: string;
};

export type ArticleFormData = Omit<
  Article,
  "id" | "userId" | "userName" | "createdAt"
>;

export type Category = {
  id: string;
  label: string;
};

export type Condition = {
  value: string;
  label: string;
};

export const CATEGORIES: Category[] = [
  { id: "tops", label: "Hauts" },
  { id: "bottoms", label: "Bas" },
  { id: "shoes", label: "Chaussures" },
  { id: "coats", label: "Manteaux" },
  { id: "accessories", label: "Accessoires" },
  { id: "sportswear", label: "Sportswear" },
];

export const CONDITIONS: Condition[] = [
  { value: "neuf_avec_etiquette", label: "Neuf avec étiquette" },
  { value: "neuf_sans_etiquette", label: "Neuf sans étiquette" },
  { value: "tres_bon_etat", label: "Très bon état" },
  { value: "bon_etat", label: "Bon état" },
  { value: "satisfaisant", label: "Satisfaisant" },
];

export function getConditionLabelByValue(value: string): string {
  return CONDITIONS.find((c) => c.value === value)?.label ?? value;
}

export function getCategoryLabelByValue(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

