const API_URL = "http://127.0.0.1:8000/api/";
// const MEDIA_URL = "http://127.0.0.1:8000/media/";
export async function login({ username, password }) {
  let response = await fetch(`${API_URL}token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  if (!response.ok) throw Error("failed to fetch ");
  const data = await response.json();
  localStorage.setItem("authTokens", JSON.stringify(data));
  return data;
}

export async function registerUser({ username, password }) {
  let response = await fetch("http://127.0.0.1:8000/auth/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (!response.ok) throw Error("failed to fetch ");
  const data = await response.json();
  console.log(data);
  localStorage.setItem("authTokens", JSON.stringify(data));
  return data;
}
export async function updateToken() {
  const { refresh } = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  let response = await fetch(`${API_URL}token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refresh,
    }),
  });

  let data = await response.json();

  if (response.status === 200) {
    localStorage.setItem("authTokens", JSON.stringify(data));
  }
}
