import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Booking from "./components/User/UI/Booking";
import { AuthProvider } from "./context/AuthContext";
import Hotel from "./components/Admin/View/Hotel";
import RoomTypeAD from "./components/Admin/View/RoomType";
import RoomAD from "./components/Admin/View/Room";
import BookingAD from "./components/Admin/View/BookingAD";
import UserAD from "./components/Admin/View/User";
import UserUpdateView from "./components/Admin/View/Edit/UserUpdateView";
import HotelUpdateView from "./components/Admin/View/Edit/HotelUpdate";
import RoomTypeUpdateView from "./components/Admin/View/Edit/RoomTypeUpdate";
import RoomUpdateView from "./components/Admin/View/Edit/RoomUpdate";
import BookingUpdateView from "./components/Admin/View/Edit/BookingUpdate";
import HotelAddView from "./components/Admin/View/Add/HotelAddView";
import RoomTypeAddView from "./components/Admin/View/Add/RoomTypeAddView";
import RoomAddView from "./components/Admin/View/Add/RoomAddView";
import UserAddView from "./components/Admin/View/Add/UserAddView";
import WelcomeDashBoard from "./components/Admin/WelcomeDashBoard";
import Signup from "./components/User/Auth/Signup";
import Login from "./components/User/Auth/Login";
import BookingHistory from "./components/User/Client/BookingHistory";
import UnAuthor from "./components/Admin/Error";
import HomeClient from "./components/User/Client/Home";
import SearchClient from "./components/User/Client/Search";
import RoomTypeClient from "./components/User/Client/RoomType";
import RoomTypeDetailClient from "./components/User/Client/RoomTypeDetails";
import RoomClient from "./components/User/Client/Room";
import HotelClient from "./components/User/Client/HotelPageList";
import HotelDetailClient from "./components/User/Client/HotelDetail";
import RoomDetailClient from "./components/User/Client/RoomDetails";

import RoomFilterClient from "./components/User/Client/RoomFilter";

function Routers() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={HomeClient} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/booking/history" component={BookingHistory} />
          <Route exact path="/booking/roomid=:roomId/" component={Booking} />
          <Route exact path="/search" component={SearchClient} />
          <Route exact path="/hotel/" component={HotelClient} />
          <Route exact path="/hotel/:id/" component={HotelDetailClient} />
          <Route exact path="/room-type/" component={RoomTypeClient} />
          <Route path="/room-type/:roomId/" component={RoomTypeDetailClient} />
          <Route exact path="/room/" component={RoomClient} />
          <Route exact path="/room/:roomId/" component={RoomDetailClient} />
          <Route path="/room/roomtype/:id/" component={RoomFilterClient} />
          {/* DashBoard Router*/}
          <Route exact path="/dashboard/" component={WelcomeDashBoard} />
          <Route exact path="/unauthor/" component={UnAuthor} />
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
