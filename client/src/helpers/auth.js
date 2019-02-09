import { fetcher } from "./";

// verify that the token is valid
export async function verifyUser() {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (!userObj) return;
  try {
    const resp = await fetcher("/users/verify", {
      headers: { Authorization: `Bearer ${userObj.token}` },
    });
    if (!resp.ok) {
      localStorage.clear();
      // eslint-disable-next-line no-throw-literal
      throw null;
    }
    return await resp.json();
  } catch (err) {
    console.log(err);
    return err;
  }
}
