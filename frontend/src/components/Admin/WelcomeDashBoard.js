import React, { useEffect, useState } from "react";

import DashBoardLayOut from "./Layout/DashBoardLayout";

function WelcomeDashBoard() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">Chào mừng đến với trang quản trị</div>
      </div>
    </div>
  );
}
export default WelcomeDashBoard;
