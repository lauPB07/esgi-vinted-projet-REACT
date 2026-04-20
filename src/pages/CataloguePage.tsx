import { useQuery } from "@tanstack/react-query";
import { type Article, CONDITIONS, CATEGORIES } from "../types/article.ts";
import { ArticleList } from "../components/ArticleList.tsx";
import { api } from "../services/api.ts";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const API_URL = "/api/articles";

export default function CataloguePage() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [priceMin, setMinPrice] = useState(0);
  const [priceMax, setMaxPrice] = useState(0);
  const [clearFilters, setClearFilters] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery<Article[]>({
    queryKey: ["articles",  debouncedSearch, category, condition, priceMin, priceMax ],
    queryFn: async () => {
      const rawParams: Record<string, string | number | undefined> = {
        search: debouncedSearch,
        category: category,
        condition: condition,
        minPrice: priceMin,
        maxPrice: priceMax,
      };

      const cleanParams = new URLSearchParams();

      Object.entries(rawParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if ((key === "minPrice" || key === "maxPrice") && Number(value) <= 0) {
            return;
          }
          cleanParams.append(key, value.toString());
        }
      });

      const queryString = cleanParams.toString();
      const path = queryString ? `${API_URL}?${queryString}` : API_URL;

      const result = await api.get<Article[]>(path);
      if (!result) throw new Error("Erreur HTTP");
      return result;
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

  if (error) {
    return "❌ Erreur lors du chargement des articles, veuillez réessayer";
  }

  function onCliTitle(idArticle: string) {
    navigate(`/articles/${idArticle}`);
  }

  if (clearFilters) {
    setCategory("");
    setCondition("");
    setMinPrice(0);
    setMaxPrice(0);
    setClearFilters(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catalogue</h1>

      <div className="flex items-start gap-4">
        <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="#6B7280"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full h-full outline-none text-sm text-gray-500 bg-transparent"
          />
          <button
            type="submit"
            onClick={() => setDebouncedSearch(search)}
            className="bg-green-700 w-32 h-9 rounded-full text-sm text-white mr-[5px] shrink-0 hover:bg-green-800 transition-colors"
          >
            Search
          </button>
        </div>

        <div className="group flex flex-col w-44 text-sm relative">
          <button
            type="button"
            className="w-full h-[46px] text-left px-4 py-2 border rounded-full bg-white text-gray-700 border-gray-500/30 shadow-sm hover:bg-gray-50 focus:outline-none flex items-center justify-between"
          >
            <span>{category || "Catégories"}</span>
            <svg
              className="w-5 h-5 transition-transform duration-200 -rotate-90 group-focus:rotate-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
          <ul  className="absolute top-[50px] left-0 hidden group-focus-within:flex flex-col w-full bg-white border border-gray-200 rounded-2xl shadow-lg py-2 z-50">
            {CATEGORIES.map((category) => (
              <li
                key={category.id}
                onMouseDown={() => setCategory(category.id)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="group flex flex-col w-44 text-sm relative">
          <button
            type="button"
            className="w-full h-[46px] text-left px-4 py-2 border rounded-full bg-white text-gray-700 border-gray-500/30 shadow-sm hover:bg-gray-50 focus:outline-none flex items-center justify-between"
          >
            <span>Etat</span>
            <svg
              className="w-5 h-5 transition-transform duration-200 -rotate-90 group-focus:rotate-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
          <ul className="absolute top-[50px] left-0 hidden group-focus-within:flex flex-col w-full bg-white border border-gray-200 rounded-2xl shadow-lg py-2 z-50">
            {CONDITIONS.map((condition) => (
              <li
                key={condition.value}
                onMouseDown={() => setCondition(condition.value)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                {condition.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col w-64 text-sm relative">
          <button
            type="button"
            className="peer group w-full h-[46px] text-left px-4 py-2 border rounded-full bg-white text-gray-700 border-gray-500/30 shadow-sm hover:bg-gray-50 focus:outline-none flex items-center justify-between"
          >
            <span>Par prix</span>
            <svg
              className="w-4 h-4 transition-transform group-focus:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="absolute top-[55px] left-0 hidden peer-focus:flex hover:flex flex-col w-[300px] bg-white border border-gray-100 rounded-xl shadow-2xl p-6 z-50">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="text-[10px] uppercase text-gray-400 font-black block mb-2">
                  Min
                </label>
                <input
                  type="text"
                  defaultValue="200"
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-center font-bold text-gray-700 focus:border-black outline-none transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] uppercase text-gray-400 font-black block mb-2">
                  Max
                </label>
                <input
                  type="text"
                  defaultValue="1,000"
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-center font-bold text-gray-700 focus:border-black outline-none transition-colors"
                />
              </div>
            </div>
            <button className="w-full py-4 border-2 border-gray-100 rounded-xl font-black uppercase tracking-[0.1em] text-xs hover:bg-gray-50 transition-all active:scale-[0.98]">
              Chercher
            </button>
          </div>
        </div>
          <button
            onClick={() => setClearFilters(true)}
            type="button"
            className="h-[46px] w-fit px-6 border rounded-full bg-white text-gray-700 border-gray-500/20 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all focus:outline-none flex items-center justify-center text-sm font-medium">
            Clear
          </button>
      </div>

      <ArticleList articles={data || []} onClickTitle={onCliTitle} />
    </div>
  );
}
