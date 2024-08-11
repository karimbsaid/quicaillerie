import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );

  const navigate = useNavigate();
  let [userGroups, setUserGroups] = useState([]);

  let loginUser = async ({ username, password }) => {
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };
  async function registerUser({ username, password }) {
    let response = await fetch("http://127.0.0.1:8000/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.ok) return navigate("/login");
    const data = await response.json();
    console.log(data);
    return data;
  }
  const fetchUserGroups = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user-groups", {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user groups");
      }
      const data = await response.json();
      setUserGroups(data.groups);
    } catch (error) {
      console.error("Error fetching user groups:", error);
    }
  };

  const userBelongsToGroup = (groupName) => {
    return userGroups.includes(groupName);
  };
  let updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    userBelongsToGroup,
    registerUser,
  };

  useEffect(() => {
    if (authTokens) {
      fetchUserGroups();
      const accessToken = jwtDecode(authTokens.access);
      const expires = accessToken.exp * 1000;
      const now = new Date().getTime();
      const timeout = expires - now - 60000; // Refresh 1 minute before expiration

      let tokenRefreshTimeout = setTimeout(() => {
        updateToken();
      }, timeout);

      return () => clearTimeout(tokenRefreshTimeout);
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
