import React, { Component } from "react";
import Header from "../../../Pages/header";
import Footer from "../../../Pages/footer";
import RoomTypeDetailsPage from "../../../Pages/RoomTypeDetails";

export default class RoomTypeDetailI extends Component {
  render() {
    return (
      <>
        <Header />
        {/* <SearchPage /> */}
        <RoomTypeDetailsPage />
        {/* <Main /> */}
        <Footer />
      </>
    );
  }
}
