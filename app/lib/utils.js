export async function fetchData(
  endpoint,
  method,
  params = {},
  token = localStorage.getItem("session")
) {
  let url = process.env.NEXT_PUBLIC_BASE_URL + endpoint;
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

  if (method === "GET" && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params).toString();
    url = url + "?" + searchParams;
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
