import React from "react";
import ReactDOM from "react-dom/client";
import "./static/css/style.css";
import "./static/css/roomtype.css";
import "./static/css/custom.css";
import "./static/css/form.css";

import "bootstrap/dist/css/bootstrap.min.css";

import ReactWOW from "react-wow";

import "./static/css/hover-style.css";
import "./static/vendor/animate/animate.min.css";
import "./static/vendor/font-awesome/css/font-awesome.min.css";
import "./static/vendor/slick/slick-theme.css";
import "./static/vendor/slick/slick.css";
import "./static/vendor/owlcarousel/assets/owl.carousel.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
<ReactWOW animation="fadeIn">
  <img src="https://unsplash.it/900/900/?random" />
</ReactWOW>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
