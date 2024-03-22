import React, { useEffect, useState } from "react";
import DashBoardLayOut from "../../Layout/DashBoardLayout";
import RoomUpdate from "../../Edit/RoomEdit";

function RoomUpdateView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <RoomUpdate />
        </div>
      </div>
    </div>
  );
}
export default RoomUpdateView;
