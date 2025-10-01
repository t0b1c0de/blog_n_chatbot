"use client";

import ArticlesList from "./components/ArticlesList";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import SortDate from "./components/SortDate";

export interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchArctiles = async () => {
      const res = await fetch(
        `/api/articles?query=${search}&sort=${sortOrder}`
      );
      const data = await res.json();
      setArticles(data);
    };

    fetchArctiles();
  }, [search, sortOrder]);

  return (
    <>
      <h2>Liste d&apos;articles</h2>
      <SearchBar search={search} setSearch={setSearch} />
      <SortDate sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <ArticlesList articles={articles} />
    </>
  );
};

export default ArticlesPage;
