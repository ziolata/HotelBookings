import React, { useEffect, useState } from "react";

import AddHotel from "../../Add/AddHotel";
import DashBoardLayOut from "../../Layout/DashBoardLayout";
import AddRoomTypes from "../../Add/AddRoomType";

function RoomTypeAddView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <AddRoomTypes />
        </div>
      </div>
    </div>
  );
}
export default RoomTypeAddView;
