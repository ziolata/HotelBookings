import React, { useEffect, useState } from "react";
import { useParams, Route, Redirect, useHistory } from "react-router-dom";

import DashBoardLayOut from "../Layout/DashBoardLayout";
import UserList from "../List/UserList";

function UserAD() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <UserList />
        </div>
      </div>
    </div>
  );
}
export default UserAD;
