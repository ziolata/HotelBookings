import React, { useEffect, useState } from "react";
import DashBoardLayOut from "../Layout/DashBoardLayout";
import BookingList from "../List/BookingList";

function BookingAD() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <BookingList />
        </div>
      </div>
    </div>
  );
}
export default BookingAD;
