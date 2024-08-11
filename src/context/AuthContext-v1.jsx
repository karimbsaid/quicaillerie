import { createContext, useState, useEffect, useCallback } from "react";
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
  let [loading, setLoading] = useState(true);
  let [userGroups, setUserGroups] = useState([]);

  const navigate = useNavigate();

  let loginUser = async ({ username, password }) => {
    console.log("i am calling this login user function ");
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

  let logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  }, [navigate]);
  const fetchUserGroups = useCallback(async () => {
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
  }, [authTokens]);

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
    console.log(
      "data from udpate roken",
      data,
      "and this is my refresh token "
    );

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    userBelongsToGroup,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    if (authTokens) {
      fetchUserGroups();
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
