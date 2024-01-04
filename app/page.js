"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import { verifySession, initializeSession } from "@/app/lib/validateSession";
import PopularFAQs from "./components/PopularFAQs";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const validateSession = async () => {
    // SESSION MANAGEMENT
    // Verify the current session is still valid, or initialize a new session
    const storedToken = localStorage.getItem("session") || null;

    if (storedToken) {
      await verifySession();
    } else {
      await initializeSession();
    }
  };

  useEffect(() => {
    validateSession();
    // Run validateSession every 5 minutes to verify session has not expired
    const sessionValidationInterval = setInterval(validateSession, 300000);
    return () => clearInterval(sessionValidationInterval);
  }, []);

        // only run this after session has been validated
  return (
    <main className={styles.main}>
      <h1>Welcome to Synthetix </h1>

      <SearchBar />
      <PopularFAQs />
    </main>
  );
}
