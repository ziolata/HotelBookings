import React, { useEffect, useState } from "react";
import DashBoardLayOut from "../../Layout/DashBoardLayout";
import RoomTypeDetail from "../../Edit/RoomTypeEdit";

function RoomTypeUpdateView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <RoomTypeDetail />
        </div>
      </div>
    </div>
  );
}
export default RoomTypeUpdateView;
