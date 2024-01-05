"use client";

import { useEffect, useState } from "react";

import { fetchData } from "@/app/lib/utils";

import styles from "@/app/page.module.css";

import ArticleFeedback from "@/app/components/ArticleFeedback";

export default function Page({ params }) {
  const [article, setArticle] = useState();

  const getArticle = async () => {
    const body = {
      userid: 123456, // mandatory as this is an external call
      label: params.label, // the label/id of the chosen article
      channel: 14, // mandatory, 14 for Knowledge channel
      comments: true, // optional, default false
    };

    const data = await fetchData("article", "POST", {}, body);
    setArticle(data);
  };

  useEffect(() => {
    getArticle();
  }, []);

  const displayArticle = article ? (
    <div className={styles.article_wrapper}>
      <h1>{article.question}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.answer }}></div>
      <ArticleFeedback label={params.label} />
    </div>
  ) : (
    <h1>Loading...</h1>
  );

  return <div className={styles.main}>{displayArticle}</div>;
}
