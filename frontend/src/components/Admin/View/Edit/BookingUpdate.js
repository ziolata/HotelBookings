import React, { useEffect, useState } from "react";
import DashBoardLayOut from "../../Layout/DashBoardLayout";
import BookingUpdate from "../../Edit/BookingUpdate";

function BookingUpdateView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <BookingUpdate />
        </div>
      </div>
    </div>
  );
}
export default BookingUpdateView;
