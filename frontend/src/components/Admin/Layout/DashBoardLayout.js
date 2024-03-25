import React, { useContext, useEffect, useState } from "react";
import { useParams, Route, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import AuthContext from "../../../context/AuthContext";

function DashBoardLayOut() {
  let { user, logoutUser } = useContext(AuthContext);
  const { userinfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const role_name = userinfo.role_name;

  useEffect(() => {
    if (userinfo.role_name === "User") {
      // window.local.href();
      history.push("/");
      window.location.reload();
    } else {
      setLoading(false);
    }
  }, [userinfo, history]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 d-none d-sm-inline">Trang quản trị</span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item">
              <a href="/dashboard" className="nav-link align-middle px-0">
                <i className="fa-solid fa-house"></i>
                {""}
                <span className="ms-1 d-none d-sm-inline">Home</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/dashboard/hotel/"
                className="nav-link align-middle px-0"
              >
                <i className="fa-solid fa-hotel"></i>
                {""}
                <span className="ms-1 d-none d-sm-inline">QL khách sạn</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/dashboard/room-type/"
                className="nav-link align-middle px-0"
              >
                <i className="fa-solid fa-bed"></i>
                {""}
                <span className="ms-1 d-none d-sm-inline">QL loại phòng</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/dashboard/room/" className="nav-link align-middle px-0">
                <i className="fa-solid fa-bed"></i>
                {""}
                <span className="ms-1 d-none d-sm-inline">QL phòng</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/dashboard/booking/"
                className="nav-link align-middle px-0"
              >
                <i className="fa-solid fa-book"></i>
                {""}
                <span className="ms-1 d-none d-sm-inline">QL đặt phòng</span>
              </a>
            </li>
            {userinfo.role_name === "SuperAdmin" && (
              <li>
                <a
                  href="/dashboard/user/"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-people" />{" "}
                  <span className="ms-1 d-none d-sm-inline">QL người dùng</span>{" "}
                </a>
              </li>
            )}
          </ul>

          <hr />
          {user ? (
            <div className="dropdown pb-4">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-user"></i>
                <span className="d-none d-sm-inline mx-1">{user.username}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a className="dropdown-item" href="/">
                    Trở về trang chủ
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="" onClick={logoutUser}>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            window.location.href("/")
          )}
        </div>
      </div>
    </>
  );
}
export default DashBoardLayOut;
