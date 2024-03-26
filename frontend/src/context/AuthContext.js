import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  // localStorage.getItem("authTokens")
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [userinfo, setUserInfo] = useState({
    role: "",
    role_name: "",
  });
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
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        alert("Đăng nhập thành công, nhấn OK để vào trang chủ !!!");
        window.location.href = "/";
        // UserProfile();
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
      alert("Đăng nhập thất bại");
    }
  };
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/login");
  };
  const updateToken = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          refresh: authTokens.refresh,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log("Token updated successfully:", data);
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Error:", error);
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
  // useEffect(() => {
  //   User();
  // }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (authTokens) {
  //       updateToken();
  //     }
  //   }, 60000); // Cập nhật token mỗi 10 phút (600000 milliseconds)

  //   return () => clearInterval(interval);
  // }, [authTokens]);
  let contextData = {
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
      UserProfile(); // Gọi UserProfile để lấy thông tin vai trò khi authTokens được cập nhật
    }
  }, [authTokens]); // Khi authTokens thay đổi, gọi lại UserProfile để cập nhật thông tin vai trò
  useEffect(() => {
    if (authTokens) {
      User(); // Gọi UserProfile để lấy thông tin vai trò khi authTokens được cập nhật
    }
  }, [authTokens]);
  // useEffect(() => {
  //   if (userinfo.role_name === "Admin") {
  //     window.location.href = "/dashboard";
  //   } else {
  //     window.location.href = "/";
  //   }
  // }, [userinfo]);
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
