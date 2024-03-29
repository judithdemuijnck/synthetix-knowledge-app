import { fetchData } from "./utils";

export const initializeSession = async () => {
  // Creates a new session
  const data = await fetchData("session", "POST", {}, {}, undefined);
  if (data) {
    localStorage.setItem("session", data.token);
    return data.token;
  }
};

export const verifySession = async () => {
  // Validates if session token in Authorization is still valid
  const data = await fetchData("session", "GET");
  if (!data || !data.ValidToken || data.Expired) {
    // Clear session data & initialize new session
    localStorage.removeItem("session");
    return await initializeSession();
  } else {
    return localStorage.getItem("session");
  }
};
