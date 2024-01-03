"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fetchData } from "../lib/utils";

import SearchBar from "../components/SearchBar";
import ArticleList from "../components/ArticleList";
import styles from "@/app/page.module.css";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState();
  const params = useSearchParams();
  const query = params.get("query").toString();

  const body = {
    userid: 123456, // needs to be set for external searches
    query, // the search term(s)
    channel: 14, // 14 = Knowledge Channel
  };

  const sendSearchRequest = async () => {
    const results = await fetchData("search", "POST", {}, body);
    setSearchResults(results.results);
    setLoading(false);
  };

  useEffect(() => {
    sendSearchRequest();
  }, [query]);

  return (
    <div className={styles.main}>
      <h1>Welcome to Synthetix</h1>
      <SearchBar query={query} />
      <ArticleList faqs={searchResults} loading={loading} />
    </div>
  );
}
