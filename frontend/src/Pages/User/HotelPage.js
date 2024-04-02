import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HotelPage({ numToShow }) {
  const [hotel, setHotel] = useState([]);

  const getHotel = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/hotel/");
    setHotel(response.data);
  };

  useEffect(() => {
    getHotel();
  }, []);

  const handleRoomClick = (id) => {
    window.location.href = `/hotel/${id}/`;
  };

  const firstTenHotels = hotel.slice(0, numToShow);

  return (
    <>
      {firstTenHotels.map((item, index) => (
        <div className="col-md-3 col-sm-6 col-xs-6" key={item.id}>
          <div className="card mb-30" style={{ height: 350 }}>
            <a
              className="card-img-tiles "
              href={"/hotel/" + item.id}
              data-abc="true"
            >
              <div className="inner ">
                <div className="main-img ">
                  <img
                    src={item.image}
                    alt="Hotel image"
                    style={{ width: "100%", height: 140 }}
                    className="d-flex justify-content-center"
                  />
                </div>
              </div>
            </a>
            <div className="card-body text-center">
              <div style={{ height: 40 }}>
                {" "}
                <h4 className="card-title">{item.name}</h4>
              </div>

              <div className="d-flex flex-row justify-content-center align-items-center my-3">
                <div className="text-warning mb-1 me-2">
                  {item.rating && item.rating > 0 && (
                    <>
                      {[...Array(item.rating)].map((_, index) => (
                        <i className="fa fa-star" key={index} />
                      ))}
                      {item.rating < 5 && <i className="" />}
                    </>
                  )}
                  {item.star && item.rating === 0 && (
                    <i className="fa fa-star" />
                  )}
                </div>
              </div>
              <div className="box-btn">
                <a
                  className="btn btn-outline-primary btn-sm"
                  href={"/hotel/" + item.id}
                  data-abc="true"
                >
                  Xem thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default HotelPage;
