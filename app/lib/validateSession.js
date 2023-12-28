// "use client";

// import { useState } from "react";
// import { fetchData } from "./utils";

// export default function useToken() {
//   const isBrowser = typeof window !== undefined;
//   console.log(isBrowser);
//   const [token, setToken] = useState(
//     isBrowser ? localStorage?.getItem("session") || null : null
//   );

//   const initializeSession = async () => {
//     const data = await fetchData("session", "POST");
//     setToken(data.token);
//     localStorage.setItem("session", data.token);
//   };

//   const verifySession = async () => {
//     try {
//       const data = await fetchData("session", "GET", token);
//     } catch (err) {
//       clearSession();
//       initializeSession();
//     }
//   };

//   const clearSession = () => {
//     localStorage.removeItem("session");
//     setToken(null);
//   };

//   return { token, initializeSession, verifySession };
// }

// "use client";

import { fetchData } from "./utils";

export const initializeSession = async () => {
  // Creates a new session
  const data = await fetchData("session", "POST", {}, undefined);
  if (data) {
    localStorage.setItem("session", data.token);
  }
  // else: redirect to error page, something must be wrong with appkey or consumkey
};

export const verifySession = async () => {
  // Validates if session token in Authorization is still valid
  const data = await fetchData("session", "GET");
  if (!data || !data.ValidToken || data.Expired) {
    // Clear session data & initialize new session
    localStorage.removeItem("session");
    await initializeSession();
  }
};
