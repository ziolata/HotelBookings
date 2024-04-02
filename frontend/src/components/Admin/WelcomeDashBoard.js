import React, { useEffect, useState } from "react";

import DashBoardLayOut from "./Layout/DashBoardLayout";

function WelcomeDashBoard() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-12">
          <h3 className="text-center">Welcome to the admin page</h3>
          <div className="d-flex">
            <div className="col-md-3">
              <i className="fa-solid fa-user"></i> Total Users:
            </div>
            <div className="col-md-3">
              <i className="fas fa-file-invoice"></i> Total number of bookings:
            </div>
            <div className="col-md-3">
              <i className="fa-solid fa-hotel"></i> Total number of rooms:
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WelcomeDashBoard;
