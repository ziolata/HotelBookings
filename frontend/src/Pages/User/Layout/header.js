import React, { Component, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../../../context/AuthContext";
const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <>
      <header className="header">
        <a href="/" className="logo nav-link">
          Hotel Booking
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon" />
        </label>
        <ul className="menu ">
          <li>
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="nav-link" href="/room">
              Room
            </a>
          </li>
          <li>
            <a className="nav-link" href="/search">
              Search
            </a>
          </li>
          {user ? (
            <li className="">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-user"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/booking/history/">
                    Lịch sử booking
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="" onClick={logoutUser}>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            //   <a href="/logout" onClick={logoutUser}>
            //   Logout
            // </a>
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </header>
    </>
  );
};
export default Header;
