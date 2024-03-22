import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens } = useContext(AuthContext);
  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/hotel/booking/history/`,{
          headers:{
            "Content-Type": `application/json`,
            "Authorization": `Bearer ` + String(authTokens.access),
          },
        });
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
    <>
    {/* // <div>
    //   <h1>Booking History</h1>
    //   <ul>
    //     
    //       <li key={booking.id}>
    //         <p>Fullname: {booking.fullname}</p>
    //         <p>Phone: {booking.phone}</p>
    //         <p>Address: {booking.address}</p>
    //         <p>Check-in Date: {booking.check_in_date}</p>
    //         <p>Check-out Date: {booking.check_out_date}</p>
    //         <p>Total Price: {booking.total_price}</p>
    //         <p>Number of Guests: {booking.number_of_guests}</p>
    //       </li>
    //     
    //   </ul>
    // </div> */}
    <div className=" text-center  border-bottom bg-light">
      <div className="container">
      <div className="p-3">
              <nav className="d-flex">
                <h6 className="mb-2">
                  <a href="/" className="text-dark">
                    Home
                  </a>
                  <span className="text-black mx-2"> / </span>
                  <a href="/room-type/" className="text-dark">
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
    <div className="container d-flex  mb-50">
      
      <div className="row" style={{ marginTop: 80 }}>
      <h2 className="text-center">Lịch sử đặt phòng</h2>
        {bookings.map((booking) => (
          <div className="col-md-6 mt-2">
            <div className="card" >
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
                      Họ và Tên: {booking.fullname}
                  </h6>
                  <h6 className="font-weight-semibold mb-2">                   
                      Sđt: {booking.phone}
                  </h6>
                  <h6 className="font-weight-semibold mb-2">
                    Ngày nhận phòng: {booking.check_in_date}
                  </h6>
                  <h6 className="font-weight-semibold mb-2">
                      Ngày trả phòng: {booking.check_out_date}                
                  </h6>
                  <h6 className="font-weight-semibold mb-2">
                      Giá: {booking.price}đ               
                  </h6>
                  <h6 className="font-weight-semibold mb-2">
                      Tình trạng: {booking.status}               
                  </h6>
                  <h6 className="font-weight-semibold mb-2">
                      Ngày đặt phòng: {booking.date_booking}đ               
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
    </>
  );
};

export default BookingHistory;
