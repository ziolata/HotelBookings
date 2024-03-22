import React, { useEffect, useState } from "react";

import AddHotel from "../../Add/AddHotel";
import DashBoardLayOut from "../../Layout/DashBoardLayout";
import AddUser from "../../Add/AddUser";

function UserAddView() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DashBoardLayOut />
        <div className="col-md-10">
          <AddUser />
        </div>
      </div>
    </div>
  );
}
export default UserAddView;
