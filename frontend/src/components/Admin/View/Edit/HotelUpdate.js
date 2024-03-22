import React, { useEffect, useState } from "react";
import DashBoardLayOut from "../../Layout/DashBoardLayout";
import HotelDetail from "../../Edit/HotelEdit";

function HotelUpdateView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <HotelDetail />
        </div>
      </div>
    </div>
  );
}
export default HotelUpdateView;
