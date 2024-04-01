import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
function RoomPage() {
  const [hotel, setHotel] = useState([]);
  const getHotel = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/hotel/room/");
    // console(response.data);
    setHotel(response.data);
  };
  useEffect(() => {
    getHotel();
  }, []);
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

                {/* <span className="text-white-50 mx-2"> &gt; </span>
                <a href="" className="text-white">
                  <u>Data</u>
                </a> */}
              </h6>
            </nav>
          </div>
        </div>
      </div>
      <div className="container d-flex mb-50">
        <div className="row" style={{ marginTop: 10 }}>
          <h2 className="text-center">Danh sách phòng</h2>
          {hotel.map((item, index) => (
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
                        Số phòng: {item.room_number}
                      </a>
                    </h6>
                    <a href="#" className="text-muted" data-abc="true">
                      Loại phòng: {item.name}
                    </a>
                  </div>
                  <h3 className="mb-0 font-weight-semibold">{item.price}đ</h3>

                  <Link
                    to="#"
                    className="btn btn-info"
                    onClick={() => handleRoomClick(item.id)}
                  >
                    Xem chi tiết
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
