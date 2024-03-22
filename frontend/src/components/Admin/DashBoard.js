import React, { useEffect, useState } from "react";
import RouAD from "./RouteAd";
import { useParams, Route, Redirect, useHistory } from "react-router-dom";
import AddRoomTypes from "./Add/AddRoomType";
import AddRoom from "./Add/AddRoom";
import AddHotel from "./Add/AddHotel";
import ViewHotel from "./List/HotelList";
import RoomTypeList from "./List/RoomTypeList";
import RoomList from "./List/RoomList";
import BookingList from "./List/BookingList";
import RoomDetail from "./Edit/RoomEdit";
import RoomTypeDetail from "./Edit/RoomTypeEdit";
import HotelDetail from "./Edit/HotelEdit";
import BookingUpdate from "./Edit/BookingUpdate";
import { useAuth } from "../../context/useAuth";

function DashBoard() {
  const { userinfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  // const role_name = userinfo.role_name;

  useEffect(() => {
    if (userinfo.role_name === "user") {
      // window.local.href();
      history.push("/");
      window.location.reload();
    } else {
      setLoading(false);
    }
  }, [userinfo, history]);
  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(role_name);
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Trang quản trị</span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0">
                  <i className="fa-solid fa-house"></i>
                  {""}
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              {userinfo.role_name === "Admin" && (
                <li className="nav-item">
                  <a href="#" className="nav-link align-middle px-0">
                    <i className="fa-solid fa-hotel"></i>
                    {""}
                    <span className="ms-1 d-none d-sm-inline">
                      QL khách sạn
                    </span>
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0">
                  <i className="fa-solid fa-bed"></i>
                  {""}
                  <span className="ms-1 d-none d-sm-inline">QL loại phòng</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0">
                  <i className="fa-solid fa-bed"></i>
                  {""}
                  <span className="ms-1 d-none d-sm-inline">QL phòng</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0">
                  <i className="fa-solid fa-book"></i>
                  {""}
                  <span className="ms-1 d-none d-sm-inline">QL đặt phòng</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-people" />{" "}
                  <span className="ms-1 d-none d-sm-inline">QL người dùng</span>{" "}
                </a>
              </li>
            </ul>
            <hr />
            <div className="dropdown pb-4">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="hugenerd"
                  width={30}
                  height={30}
                  className="rounded-circle"
                />
                <span className="d-none d-sm-inline mx-1">loser</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          {/* <Route
            path="/dashboard/room-type/"
            render={() =>
              role_name === "Admin" ? <AddRoomTypes /> : <Redirect to="/" />
            }
          /> */}
          <Route path="/dashboard/room" component={AddRoom} />
          <Route path="/dashboard/hotel-add" component={AddHotel} />
          <Route path="/dashboard/hotel" component={ViewHotel} />
          <Route path="/dashboard/room-type-list" component={RoomTypeList} />
          <Route path="/dashboard/room-list" component={RoomList} />
          <Route path="/dashboard/booking-list" component={BookingList} />
          <Route path="/dashboard/edit/room/id=:Id/" component={RoomDetail} />
          <Route
            path="/dashboard/edit/room-type/id=:Id/"
            component={RoomTypeDetail}
          />
          <Route path="/dashboard/edit/hotel/id=:Id/" component={HotelDetail} />
          <Route
            path="/dashboard/edit/booking/id=:Id/"
            component={BookingUpdate}
          />

          <Route path="*" component={() => <div>Invalid Page</div>} />
        </div>
      </div>
    </div>
  );
}
export default DashBoard;
