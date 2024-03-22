import React, { useEffect, useState } from "react";

import AddHotel from "../../Add/AddHotel";
import DashBoardLayOut from "../../Layout/DashBoardLayout";
import AddRoom from "../../Add/AddRoom";

function RoomAddView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <AddRoom />
        </div>
      </div>
    </div>
  );
}
export default RoomAddView;
