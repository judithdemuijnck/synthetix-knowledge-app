import styles from "@/app/page.module.css";

import { useState } from "react";

import { fetchData } from "../lib/utils";

export default function ArticleFeedback({ label }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const displayFeedbackButtons = (
    <div>
      <button
        className={`${styles.card} material-symbols-outlined`}
        aria-label="Yes"
        id="thumb_up"
        onClick={(e) => handleFeedback(e)}
      >
        thumb_up
      </button>
      <button
        className={`${styles.card} material-symbols-outlined`}
        aria-label="No"
        id="thumb_down"
        onClick={(e) => handleFeedback(e)}
      >
        thumb_down
      </button>
    </div>
  );

  const handleFeedback = async (event) => {
    const id = event.target.id;
    const answerId = id === "thumb_up" ? 3246 : 3247;
    // each feedback question/answer combination is represented by its own unique id
    // here, the answer 'thumb_up' to the question 'Was this article helpful?' is represented by 3246
    // the answer 'thumb_down' to the question 'Was this article helpful?' is represented by 3247

    const body = {
      label, // required, article id
      feedback: answerId, // required, answer/feedback id
      // text: "Great article" // optional, any additional text from input
    };

    const response = await fetchData("article_feedback", "POST", {}, body);
    setIsSubmitted(response.success);
  };

  return (
    <div className={styles.description}>
      <h3>Was this article helpful?</h3>
      {!isSubmitted && displayFeedbackButtons}
      {isSubmitted && <p>Feedback submitted</p>}
    </div>
  );
}
