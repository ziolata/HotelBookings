import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens } = useContext(AuthContext);
  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/hotel/booking/history/`,
          {
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ` + String(authTokens.access),
            },
          }
        );
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    fetchBookingHistory();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
                  BookingHistory
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
      <div className="container mb-50">
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 text-center">
            <h2 className="text-center">Booking History</h2>
          </div>
          {bookings.map((booking) => (
            <div className="col-md-6 mt-2" key={booking.id}>
              <div className="card">
                {/* <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src=""
                    className="card-img img-fluid"
                    width={96}
                    height={350}
                    alt=""
                  />
                </div>
              </div> */}
                <div className="card-body bg-light text-center">
                  <div className="mb-2">
                    <h6 className="font-weight-semibold mb-2">
                      Fullname: {booking.fullname}
                    </h6>
                    <h6 className="font-weight-semibold mb-2">
                      Phone: {booking.phone}
                    </h6>
                    <h6 className="font-weight-semibold mb-2">
                      Check in date: {booking.check_in_date}
                    </h6>
                    <h6 className="font-weight-semibold mb-2">
                      Check out date: {booking.check_out_date}
                    </h6>
                    <h6 className="font-weight-semibold mb-2">
                      Price: {booking.price}$/1 day
                    </h6>
                    <h6 className="font-weight-semibold mb-2">
                      Total price: {booking.total_price}$
                    </h6>
                    <h6 className="font-weight-semibold mb-2">
                      Status: {booking.status}
                    </h6>
                    <h6 className="font-weight-semibold mb-2">
                      Booking date: {booking.date_booking}
                    </h6>
                  </div>

                  {/* <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div> */}
                  {/* <div className="text-muted mb-3">34 reviews</div> */}
                  {/* <button
                  type="button"
                  className="btn bg-cart btn btn-info"
                  onClick={handleRoomClick(item.id)}
                >
                  Xem chi tiết
                </button> */}
                  {/* <Link
                  to="#"
                  className="btn btn-info"
                  
                >
                  Xem chi tiết
                </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingHistoryPage;
