import Link from "next/link";
import styles from "@/app/page.module.css";

export default function ArticleList({ faqs }) {
  const displayFAQs = faqs ? (
    faqs?.map((faq) => {
      return (
        <div className={styles.description} key={faq.label}>
          <Link href={"/" + faq.label}>{faq.question}</Link>
        </div>
      );
    })
  ) : (
    <h2>Loading...</h2>
  );

  return <div className={styles.card}>{displayFAQs}</div>;
}
