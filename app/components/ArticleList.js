import Link from "next/link";
import styles from "@/app/page.module.css";

export default function ArticleList({ faqs, loading }) {
  const displayFAQs = faqs ? (
    faqs?.map((faq) => {
      return (
        <div className={styles.description} key={faq.label}>
          <Link href={"/articles/" + faq.label}>{faq.question || faq.faq}</Link>
        </div>
      );
    })
  ) : (
    <h2>No articles found</h2>
  );

  return (
    <div className={styles.card}>
      {loading ? <h2>Loading...</h2> : displayFAQs}
    </div>
  );
}
