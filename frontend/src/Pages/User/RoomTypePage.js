import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function RoomTypePage({ numToShow }) {
  const [hotel, setHotel] = useState([]);

  const getHotel = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/hotel/room-type/"
    );
    setHotel(response.data);
  };

  useEffect(() => {
    getHotel();
  }, []);

  const handleRoomClick = (roomId) => {
    window.location.href = `/room-type/${roomId}/`;
  };
  const firstTenHotels = hotel.slice(0, numToShow);
  return (
    <>
      <div className="row">
        {firstTenHotels.map((item, index) => (
          <div
            className="col-md-6 col-lg-6 col-xs-12 col-sm-12 mb-1"
            key={item.id}
          >
            {/* product */}
            <div className="product-content product-wrap clearfix">
              <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12">
                  <div className="product-image">
                    <img
                      src={item.image}
                      alt="194x228"
                      className="img-responsive"
                      style={{ width: 194, height: 228 }}
                    />
                  </div>
                </div>
                <div className="col-md-7 col-sm-12 col-xs-12">
                  <div className="product-deatil">
                    <h5 className="name">
                      <span style={{ fontSize: 16 }}>Loại phòng: </span>
                      <a href="#">
                        {item.name} <span>{item.hotel_name}</span>
                      </a>
                    </h5>
                    <p className="price-container">
                      <span>{item.price}</span>
                      <span className="text-muted">đ/ngày</span>
                    </p>
                  </div>
                  <div className="description">
                    <p>{item.description} </p>
                  </div>
                  <div className="product-info smart-form">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12 justify-content-center">
                        <Link
                          to="#"
                          className="btn btn-success"
                          onClick={() => handleRoomClick(item.id)}
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default RoomTypePage;
