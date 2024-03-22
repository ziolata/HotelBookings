import React, { useEffect, useState } from "react";

import AddHotel from "../../Add/AddHotel";
import DashBoardLayOut from "../../Layout/DashBoardLayout";

function HotelAddView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <AddHotel />
        </div>
      </div>
    </div>
  );
}
export default HotelAddView;
