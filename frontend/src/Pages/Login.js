import React, { Component, useEffect, useState, useContext } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import { Redirect, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <form onSubmit={loginUser}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="email"
          type="email"
          name="email"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="password"
          type="password"
          name="password"
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="!#">Forgot password?</a>
        </div>

        <input type="submit" />

        <div className="text-center">
          <p>
            Not a member? <a href="/signup">Signup</a>
          </p>
        </div>
      </MDBContainer>
    </form>
  );
};

export default Login;
