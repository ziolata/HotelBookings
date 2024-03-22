import React, { useEffect, useState } from "react";
import { useParams, Route, Redirect, useHistory } from "react-router-dom";
import ViewHotel from "../List/HotelList";
import DashBoardLayOut from "../Layout/DashBoardLayout";
import RoomTypeList from "../List/RoomTypeList";

function RoomTypeAD() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <RoomTypeList />
        </div>
      </div>
    </div>
  );
}
export default RoomTypeAD;
