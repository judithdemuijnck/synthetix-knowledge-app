"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { verifySession, initializeSession } from "@/app/lib/validateSession";
import PopularFAQs from "./components/PopularFAQs";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [sessionToken, setSessionToken] = useState();

  const validateSession = async () => {
    // SESSION MANAGEMENT
    // Verify the current session is still valid, or initialise a new session
    const storedToken = localStorage.getItem("session") || null;

    let token;
    if (storedToken) {
      token = await verifySession();
    } else {
      token = await initializeSession();
    }
    setSessionToken(token);
  };

  useEffect(() => {
    validateSession();
    // Run validateSession every 5 minutes to verify session has not expired
    const sessionValidationInterval = setInterval(validateSession, 300000);
    return () => clearInterval(sessionValidationInterval);
  }, []);

  return (
    <main className={styles.main}>
      <h1>Welcome to Synthetix </h1>
      {sessionToken && <SearchBar />}
      {sessionToken && <PopularFAQs />}
    </main>
  );
}
