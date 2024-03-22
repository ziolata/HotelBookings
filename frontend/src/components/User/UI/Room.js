import React, { Component } from "react";
import Header from "../../../Pages/header";
import Footer from "../../../Pages/footer";
import RoomPage from "../../../Pages/RoomPage";

export default class Room extends Component {
  render() {
    return (
      <>
        <Header />
        <RoomPage />
        <Footer />
      </>
    );
  }
}
