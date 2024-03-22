import React, { Component } from "react";
import { render } from "react-dom";
import Routers from "./Route";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

// const app = App();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
function App() {
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
