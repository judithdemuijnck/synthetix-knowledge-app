export async function fetchData(
  endpoint,
  method,
  token = localStorage.getItem("session")
) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint;
  const options = {
    method,
    headers: {
      // Talk to your Account Manager to obtain an Applicationkey and Consumerkey
      Applicationkey: process.env.NEXT_PUBLIC_APPLICATIONKEY,
      Consumerkey: process.env.NEXT_PUBLIC_CONSUMERKEY,
    },
  };

  if (token) {
    // Synthetix uses Bearer Tokens for Authorization
    options.headers["Authorization"] = "Bearer " + token;
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.log("Error with status", response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
