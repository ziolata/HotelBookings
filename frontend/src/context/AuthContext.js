import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [userinfo, setUserInfo] = useState([]);
  let [userAll, setUserAll] = useState([]);
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  let history = useHistory();
  let loginUser = async (e) => {
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

      let data = response.data;
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        alert("Đăng nhập thành công, nhấn OK để vào trang chủ !!!");
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
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      alert("Đăng nhập thất bại");
    }
  };
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/login");
  };
  let updateToken = async () => {
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
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };
  let UserProfile = async () => {
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
  let User = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      const userData = response.data;
      setUserAll(userData); // Cập nhật vai trò của người dùng
      // setUserInfo(userData.role);
    } catch (error) {}
  };
  useEffect(() => {
    User();
  }, []);
  let contextData = {
    user: user,
    loginUser: loginUser,
    authTokens: authTokens,
    logoutUser: logoutUser,
    UserProfile: UserProfile,
    userinfo: userinfo,
    userAll: userAll,
  };
  console.log(userinfo);

  useEffect(() => {
    if (authTokens) {
      UserProfile(); // Gọi UserProfile để lấy thông tin vai trò khi authTokens được cập nhật
    }
  }, [authTokens]); // Khi authTokens thay đổi, gọi lại UserProfile để cập nhật thông tin vai trò
  useEffect(() => {
    if (authTokens) {
      User(); // Gọi UserProfile để lấy thông tin vai trò khi authTokens được cập nhật
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
