import React, { useEffect, useState } from "react";
import DashBoardLayOut from "../../Layout/DashBoardLayout";
import UserUpdate from "../../Edit/UserUpdate";

function UserUpdateView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <UserUpdate />
        </div>
      </div>
    </div>
  );
}
export default UserUpdateView;
