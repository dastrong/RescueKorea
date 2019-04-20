// returns successful results or throws an error message string
// used to interact with the Youtube Data API
export async function apiRequest(url, opts) {
  const res = await fetcher(url, opts);
  const data = await res.json();
  // if there's an error throw that message
  if (!res.ok) throw data;
  // otherwise return the results
  return data;
}

// return a promise that we'll handle in our components
export function fetcher(url, opts) {
  return fetch(`${process.env.REACT_APP_API_ROUTE}${url}`, {
    method: opts.method || "get",
    headers: { "Content-Type": "application/json", ...opts.headers },
    body: opts.body,
  });
}
