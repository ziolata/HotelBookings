import React, { useEffect, useState } from "react";

import DashBoardLayOut from "./Layout/DashBoardLayout";

function WelcomeDashBoard() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-12">
          <h3 className="text-center">Chào mừng đến với trang quản trị</h3>
          <div className="d-flex">
            <div className="col-md-3">
              <i className="fa-solid fa-user"></i> Tổng số User:
            </div>
            <div className="col-md-3">
              <i className="fas fa-file-invoice"></i> Tổng số đơn booking:
            </div>
            <div className="col-md-3">
              <i className="fa-solid fa-hotel"></i> Tổng số phòng:
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WelcomeDashBoard;
