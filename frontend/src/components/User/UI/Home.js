import React, { Component } from "react";
import Header from "../../../Pages/header";
import Main from "../../../Pages/main";
import Footer from "../../../Pages/footer";
import SearchPage from "../../../Pages/searchPage";
import Room from "../../../Pages/room";
import RoomTypePage from "../../../Pages/RoomTypePage";
import HeaderSlide from "../../../Pages/headerSlide";

export default class HomePage extends Component {
  render() {
    return (
      <>
        <Header />
        <HeaderSlide />
        {/* <SearchPage /> */}
        <RoomTypePage />
        {/* <Main /> */}
        <Footer />
      </>
    );
  }
}
