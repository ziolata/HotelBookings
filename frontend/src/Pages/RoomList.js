import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const RoomList = ({ rooms }) => {
  // const history = useHistory();

  const handleBookNow = (roomId) => {
    // Lưu trữ id phòng đã chọn
    localStorage.setItem("selectedRoomId", roomId);

    // Chuyển hướng sang trang booking
    // history.push("/booking");
    window.location.href = "/booking";
  };

  const handleRoomClick = (roomId) => {
    window.location.href = `/booking/roomid=${roomId}/`;
  };

  return (
    <div className="container">
      <div className="row ">
        {rooms.map((hotel) => (
          <div className="col-md-6 col-lg-3" key={hotel.id}>
            <div className="card" style={{ width: "15rem" }} key={hotel.id}>
              <img
                className="card-img-top"
                style={{ width: "237,5px", height: "150px" }}
                src={"http://127.0.0.1:8000/media/" + hotel.image}
                alt={hotel.room_type_name}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {hotel.room_type_name}(Number: {hotel.room_number})
                </h5>
                <p className="card-text">{hotel.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRoomClick(hotel.id)}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
