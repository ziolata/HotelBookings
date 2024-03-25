import React, { useEffect, useState } from "react";
import axios from "axios";
function Test() {
  const [hotel, setHotel] = useState([]);
  const getHotel = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/hotel/");
    // console(response.data);
    setHotel(response.data);
  };
  useEffect(() => {
    getHotel();
  }, []);
  return (
    <div className="container d-flex justify-content-center mt-50 mb-50">
      <div className="row">
        {hotel.map((item, index) => (
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src={item.image}
                    className="card-img img-fluid"
                    width={96}
                    height={350}
                    alt=""
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
                <h3 className="mb-0 font-weight-semibold">
                  {item.price}đ/1 ngày
                </h3>
                {/* <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div> */}
                {/* <div className="text-muted mb-3">34 reviews</div> */}
                <button type="button" className="btn bg-cart btn btn-info">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Test;
