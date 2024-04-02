import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Room() {
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

  return (
    <div>
      <div id="rooms" className="mt-5">
        <div className="container">
          <div className="section-header ">
            <h2>RoomType</h2>
            <p>
              A variety of room types allow customers to choose the most
              suitable room type for themselves.
            </p>
          </div>
          <div className="row">
            {hotel.map((hotelItem, index) => (
              <div className="col-md-12" key={hotelItem.id}>
                <div className="row">
                  <div className="col-md-3">
                    <div className="room-img">
                      <div className="box12">
                        <img
                          src={hotelItem.image}
                          style={{ width: "250px", height: "180px" }}
                          alt={hotelItem.name}
                        />
                        <div className="box-content">
                          <h3 className="title">{hotelItem.name}</h3>
                          <ul className="icon">
                            <li>
                              <Link
                                to="#"
                                onClick={() => handleRoomClick(hotelItem.id)}
                              >
                                <i className="fa fa-link" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="room-des">
                      <h3>
                        <Link
                          to="#"
                          onClick={() => handleRoomClick(hotelItem.id)}
                        >
                          {hotelItem.name}
                        </Link>
                      </h3>
                      <p>{hotelItem.description}</p>
                      <ul className="room-icon">
                        <li className="icon-1" />
                        <li className="icon-2" />
                        <li className="icon-3" />
                        <li className="icon-4" />
                        <li className="icon-5" />
                        <li className="icon-6" />
                        <li className="icon-7" />
                        <li className="icon-8" />
                        <li className="icon-9" />
                        <li className="icon-10" />
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="room-rate">
                      <h3>From</h3>
                      <h1>${hotelItem.price}</h1>
                      <Link to="/booking">Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
