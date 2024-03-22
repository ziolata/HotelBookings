import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React, { Component } from "react";

import AddRoomTypes from "./Add/AddRoomType";
import RoomTypeList from "./List/RoomTypeList";
import AddRoom from "./Add/AddRoom";
import RoomList from "./List/RoomList";
import AddHotel from "./Add/AddHotel";
import ViewHotel from "./List/HotelList";
import BookingList from "./List/BookingList";

export default class RouAD extends Component {
  render() {
    return (
      <Switch>
        <Route path="/dashboard/room-type" component={AddRoomTypes} />
        <Route path="/dashboard/room-type-list" component={RoomTypeList} />
        <Route path="/dashboard/room" component={AddRoom} />
        <Route path="/dashboard/room-list" component={RoomList} />
        <Route path="/dashboard/hotel-add" component={AddHotel} />
        <Route path="/dashboard/hotel" component={ViewHotel} />
        <Route path="/dashboard/booking-list" component={BookingList} />
        <Route path="*" component={() => <div>Invalid Page</div>} />
      </Switch>
    );
  }
}
