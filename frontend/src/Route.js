import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React, { Component, useContext } from "react";
import HomePage from "./components/User/UI/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Test from "./Pages/test";
import Room from "./components/User/UI/Room";
import RoomTypeDetailI from "./components/User/UI/RoomTypeDetails";
import RoomDetailUI from "./components/User/UI/RoomDetails";
import Booking from "./components/User/UI/Booking";
import Search from "./components/User/UI/Search";
import DashBoard from "./components/Admin/DashBoard";
import RouAD from "./components/Admin/RouteAd";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import BookingHistory from "./Pages/User/HistoryBooking";
import ViewHotel from "./components/Admin/List/HotelList";
import AddRoomTypes from "./components/Admin/Add/AddRoomType";
import AddRoom from "./components/Admin/Add/AddRoom";
import AddHotel from "./components/Admin/Add/AddHotel";
import RoomTypeList from "./components/Admin/List/RoomTypeList";
import RoomList from "./Pages/RoomList";
import BookingList from "./components/Admin/List/BookingList";
import { useAuth } from "./context/useAuth";
import DashBoard1 from "./components/Admin/View/Hotel";
import Hotel from "./components/Admin/View/Hotel";
import RoomTypeAD from "./components/Admin/View/RoomType";
import RoomListAD from "./components/Admin/View/Room";
import RoomAD from "./components/Admin/View/Room";
import BookingAD from "./components/Admin/View/BookingAD";
import UserAD from "./components/Admin/View/User";
import UserUpdate from "./components/Admin/Edit/UserUpdate";
import UserUpdateView from "./components/Admin/View/Edit/UserUpdateView";
import HotelUpdateView from "./components/Admin/View/Edit/HotelUpdate";
import RoomTypeUpdateView from "./components/Admin/View/Edit/RoomTypeUpdate";
import RoomUpdate from "./components/Admin/Edit/RoomEdit";
import RoomUpdateView from "./components/Admin/View/Edit/RoomUpdate";
import BookingUpdateView from "./components/Admin/View/Edit/BookingUpdate";
import HotelAddView from "./components/Admin/View/Add/HotelAddView";
import RoomTypeAddView from "./components/Admin/View/Add/RoomTypeAddView";
import RoomAddView from "./components/Admin/View/Add/RoomAddView";
import UserAddView from "./components/Admin/View/Add/UserAddView";
import WelcomeDashBoard from "./components/Admin/WelcomeDashBoard";

function Routers() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/test" component={ViewHotel} />
          <Route exact path="/booking/history" component={BookingHistory} />
          <Route exact path="/booking/roomid=:roomId/" component={Booking} />
          <Route exact path="/search" component={Search} />
          {/* <Route exact path="/room-details" component={RoomDetails} /> */}
          <Route exact path="/room/" component={Room} />
          <Route exact path="/room/:roomId/" component={RoomDetailUI} />
          <Route path="/room-type/:roomId/" component={RoomTypeDetailI} />

          {/* DashBoard Router*/}
          <Route exact path="/dashboard/" component={WelcomeDashBoard} />

          <Route exact path="/dashboard/hotel" component={Hotel} />
          <Route exact path="/dashboard/room-type" component={RoomTypeAD} />
          <Route exact path="/dashboard/room" component={RoomAD} />
          <Route exact path="/dashboard/booking" component={BookingAD} />
          <Route exact path="/dashboard/user" component={UserAD} />
          <Route
            exact
            path="/dashboard/user/edit/id=:Id"
            component={UserUpdateView}
          />
          <Route
            exact
            path="/dashboard/hotel/edit/id=:Id"
            component={HotelUpdateView}
          />
          <Route
            exact
            path="/dashboard/room-type/edit/id=:Id"
            component={RoomTypeUpdateView}
          />
          <Route
            exact
            path="/dashboard/room/edit/id=:Id"
            component={RoomUpdateView}
          />
          <Route
            exact
            path="/dashboard/booking/edit/id=:Id"
            component={BookingUpdateView}
          />
          <Route exact path="/dashboard/hotel/add/" component={HotelAddView} />
          <Route
            exact
            path="/dashboard/room-type/add/"
            component={RoomTypeAddView}
          />
          <Route exact path="/dashboard/room/add/" component={RoomAddView} />
          <Route exact path="/dashboard/user/add/" component={UserAddView} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
export default Routers;
