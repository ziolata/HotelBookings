import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoomType } from "../../utils/Api";
function RoomTypePage({ numToShow }) {
  const [roomType, setRoomType] = useState([]);
  useEffect(() => {
    getRoomType(setRoomType);
  }, []);
  const RoomType = roomType.slice(0, numToShow);
  return (
    <>
      <div className="row">
        {RoomType.map((item, index) => (
          <div
            className="col-md-6 col-lg-6 col-xs-12 col-sm-12 mb-1"
            key={item.id}
          >
            <div className="product-content product-wrap clearfix">
              <div className="row align-items-center">
                <div className="col-md-5 col-sm-12 col-xs-12">
                  <div className="product-image">
                    <img
                      src={item.image}
                      alt="Room Type"
                      className="img-responsive"
                      style={{ width: "100%", height: 228 }}
                    />
                  </div>
                </div>
                <div className="col-md-7 col-sm-12 col-xs-12">
                  <div className="product-deatil d-flex flex-column justify-content-center h-100">
                    <h5 className="name text-center mb-3">
                      <span style={{ fontSize: 16 }}>RoomType: </span>
                      <Link to={`/room-type/${item.id}/`}>
                        {item.name} <span>{item.hotel_name}</span>
                      </Link>
                    </h5>
                    <p className="price-container text-center mb-3">
                      <span>{item.price}</span>
                      <span className="text-muted">$/day</span>
                    </p>
                    <div className="description text-center mb-3">
                      <p>{item.description}</p>
                    </div>
                    <div className="product-info smart-form text-center">
                      <div className="row justify-content-center">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          {/* Use Link component for button navigation */}
                          <Link
                            to={`/room-type/${item.id}/`}
                            className="btn btn-success"
                          >
                            See detail
                          </Link>
                        </div>
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
