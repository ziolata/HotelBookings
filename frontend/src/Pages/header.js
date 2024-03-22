import React, { Component, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../context/AuthContext";
const Header = () =>{
  let {user, logoutUser} = useContext(AuthContext)
    return (
      <>
        <header className="header">
          <a href="/" className="logo">
            Hotel Booking
          </a>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon" />
          </label>
          <ul className="menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/room">Room</a>
            </li>
            <li>
              <a href="/search">Search</a>
            </li>
            {user ? (
              <li>
              <a href="/logout" onClick={logoutUser}>Logout</a>
            </li>
            ): (
              <li>
              <a href="/login">Login</a>
            </li>
            )}
            
          </ul>
        </header>
      </>
    );
}
export default Header
