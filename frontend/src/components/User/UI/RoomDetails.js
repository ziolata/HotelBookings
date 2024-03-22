import React, { Component } from "react";
import Header from "../../../Pages/header";
import RoomDetailsPage from "../../../Pages/RoomDetailPage";
import Footer from "../../../Pages/footer";

export default class RoomDetailUI extends Component {
  render() {
    return (
      <>
        <Header />
        {/* <SearchPage /> */}
        <RoomDetailsPage />
        {/* <Main /> */}
        <Footer />
      </>
    );
  }
}
