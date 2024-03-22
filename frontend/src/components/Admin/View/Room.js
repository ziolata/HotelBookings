import React, { useEffect, useState } from "react";
import { useParams, Route, Redirect, useHistory } from "react-router-dom";
import DashBoardLayOut from "../Layout/DashBoardLayout";
import RoomList from "../List/RoomList";
function RoomAD() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <RoomList />
        </div>
      </div>
    </div>
  );
}
export default RoomAD;
