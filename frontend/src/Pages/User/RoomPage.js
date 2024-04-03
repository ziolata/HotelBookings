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
    <section className="py-5">
      <div className=" text-center  border-bottom bg-light">
        <div className="">
          <div className="container mt-4 p-2">
            <nav className="d-flex">
              <h6 className="mb-2">
                <a href="/" className="text-dark">
                  Home
                </a>
                <span className="text-black mx-2"> / </span>
                <a href="/room/" className="text-dark">
                  Room
                </a>
              </h6>
            </nav>
          </div>
        </div>
      </div>
      <div className="container d-flex mb-50">
        <div className="row" style={{ marginTop: 10 }}>
          <h2 className="text-center">Room List</h2>
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
                      <a href="#" className="text-default mb-2" data-abc="true">
                        Room: {item.room_number}
                      </a>
                    </h6>
                    <a href="#" className="text-muted" data-abc="true">
                      RoomType: {item.name}
                    </a>
                  </div>
                  <h3 className="mb-0 font-weight-semibold">{item.price}$</h3>

                  <Link
                    to="#"
                    className="btn btn-info"
                    onClick={() => handleRoomClick(item.id)}
                  >
                    See details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default RoomPage;
