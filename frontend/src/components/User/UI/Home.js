import React, { Component } from "react";

import RoomTypePage from "../../../Pages/RoomTypePage";

import Header from "../../../Pages/User/Layout/header";
import Footer from "../../../Pages/User/Layout/footer";
import HeaderSlide from "../../../Pages/User/Layout/headerSlide";

function HomePage() {
  return (
    <>
      <Header />
      <HeaderSlide />
      <RoomTypePage />
      <Footer />
    </>
  );
}
export default HomePage;
