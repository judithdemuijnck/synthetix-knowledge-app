"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "@/app/page.module.css";

export default function SearchBar({ query }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(query ? query : "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = `?query=${searchTerm}`;
    router.push("/search" + query);
  };

  return (
    <form className={styles.form_container} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.search_container}>
        <input
          className={styles.search_input}
          type="search"
          id="search"
          name="search"
          placeholder="Search Knowledgebase..."
          aria-label="Search Knowledgebase..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button
          className={`${styles.search_btn} material-symbols-outlined`}
          type="submit"
          aria-label="Click here to search Synthetix knowledgebase"
        >
          search
        </button>
      </div>
    </form>
  );
}
