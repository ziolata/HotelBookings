import React, { Component } from "react";
import Header from "../../../Pages/header";
import Footer from "../../../Pages/footer";
import RoomPage from "../../../Pages/RoomPage";
import BookingForm from "../Form/BookingForm";

export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
  }

  handleErrorMessage = (message) => {
    this.setState({ errorMessage: message });
  };
  render() {
    const { errorMessage } = this.state;
    return (
      <>
        <Header />
        <BookingForm onErrorMessage={this.handleErrorMessage} />
        <Footer />
      </>
    );
  }
}
