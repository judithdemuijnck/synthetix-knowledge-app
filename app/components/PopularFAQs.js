import ArticleList from "./ArticleList";
import { useState, useEffect } from "react";
import { fetchData } from "../lib/utils";

export default function PopularFAQs() {
  const [topFAQs, setTopFAQs] = useState();

  const fetchFAQS = async () => {
    // all params are optional in this call
    const params = {
      pop: true, // faqs are returned in order of popularity, defaults to false
      limitdate: 365, // time range, defaults to 7
      limitno: 15, // how many faqs are returned, defaults to 20
    };
    const data = await fetchData("all_faqs", "GET", params);
    setTopFAQs(data.items);
    console.log(data);
  };

  useEffect(() => {
    fetchFAQS();
  }, []);

  return <ArticleList faqs={topFAQs} />;
}
