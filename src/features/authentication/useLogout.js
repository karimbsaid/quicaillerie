export function logoutUser() {
  localStorage.removeItem("authTokens");
}
