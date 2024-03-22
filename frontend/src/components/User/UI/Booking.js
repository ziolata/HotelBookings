import React, { Component } from "react";
import RoomPage from "../../../Pages/RoomPage";
import BookingForm from "../Form/BookingForm";
import Header from "../../../Pages/User/Layout/header";
import Footer from "../../../Pages/User/Layout/footer";

function Booking() {
  return (
    <>
      <Header />
      <BookingForm />
      <Footer />
    </>
  );
}
export default Booking;
