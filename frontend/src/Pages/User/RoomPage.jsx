import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getRoom, useRoomEffect } from "../../utils/Api";
function RoomPage() {
  const [room, setRoom] = useState([]);
  useRoomEffect(() => getRoom(setRoom));
  const handleRoomClick = (roomId) => {
    window.location.href = `/room/${roomId}/`;
  };
  return (
    <>
      {room.map((item, index) => (
        <div className="col-md-4 mt-2" key={item.id}>
          <div className="card">
            <div className="card-body">
              <div className="card-img-actions">
                <img
                  src={item.image}
                  className="card-img img-fluid"
                  alt=""
                  style={{ width: 250, height: 200 }}
                />
              </div>
            </div>
            <div className="card-body bg-light text-center">
              <div className="mb-2">
                <h6 className="font-weight-semibold mb-2">
                  <a
                    href={"/room/" + item.id}
                    className="text-default mb-2"
                    data-abc="true"
                  >
                    Room: {item.room_number}
                  </a>
                </h6>
                <a
                  href={"/room/" + item.id}
                  className="text-muted"
                  data-abc="true"
                >
                  RoomType: {item.name}
                </a>
              </div>
              <a
                href={"/room/" + item.id}
                className="text-muted"
                data-abc="true"
              >
                Status: {item.status}
              </a>
              <h3 className="mb-0 font-weight-semibold">{item.price}$</h3>
              <div className="mt-3">
                <Link
                  to="#"
                  className="btn btn-info me-2"
                  onClick={() => handleRoomClick(item.id)}
                >
                  See details
                </Link>
                <a
                  href={"/booking/roomid=" + item.id}
                  className="btn btn-warning"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default RoomPage;
