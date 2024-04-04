import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [userinfo, setUserInfo] = useState([]);
  const [userAll, setUserAll] = useState([]);
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const history = useHistory();
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        alert("Logged in successfully!!!");
        if (
          jwtDecode(data.access).role_id === 2 ||
          jwtDecode(data.access).role_id === 4
        ) {
          history.push("/dashboard");
        } else {
          history.push("/");
        }
        // UserProfile();
      } else {
        alert("Login failed !");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/login");
  };
  const updateToken = async () => {
    console.log("Update Token Called!");
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  const UserProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/userprofile/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      const userData = response.data;
      setUserInfo(userData);
    } catch (error) {}
  };
  // Lấy thông tin về User
  const User = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      const userData = response.data;
      setUserAll(userData);
    } catch (error) {}
  };
  useEffect(() => {
    User();
  }, []);
  const contextData = {
    user: user,
    loginUser: loginUser,
    authTokens: authTokens,
    logoutUser: logoutUser,
    UserProfile: UserProfile,
    userinfo: userinfo,
    userAll: userAll,
  };

  useEffect(() => {
    if (authTokens) {
      UserProfile();
    }
  }, [authTokens]);
  useEffect(() => {
    if (authTokens) {
      User();
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
