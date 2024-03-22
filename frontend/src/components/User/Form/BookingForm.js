import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import calculateNumberOfDays from "../../../Pages/caculator";
import { useParams } from "react-router-dom";
import AuthContext, { AuthProvider } from "../../../context/AuthContext";

const BookingForm = ({ room, onBookingConfirmed }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState(""); // Added for email sending
  const [fullname, setFullName] = useState("");
  const [phone, setCustomerPhone] = useState("");
  const [address, setCustomerAddress] = useState("");
  const [check_in_date, setCheckInDate] = useState("");
  const [check_out_date, setCheckOutDate] = useState("");
  const [number_of_guests, setNumberOfGuest] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [roomData, setRoomData] = useState({
    id: "",
    room_number: "",
    room_type_id: "",
    room_type_name: "",
    number_of_guest: "",
    check_in_date: "",
    check_out_date: "",
    province: "",
    image: "",
    price: "",
  });
  const { roomId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens } = useContext(AuthContext);
  const getRoom = async () => {
    try {
      const response = await axios({
        url: `http://127.0.0.1:8000/api/hotel/room/available/${roomId}/`,
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ` + String(authTokens.access),
        },
      });
      setRoomData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi:", error);
      setRoomData([]);
    }
  };
  useEffect(() => {
    getRoom();
  }, [roomId]);
  const csrftoken = Cookies.get("csrftoken");
  const handleBookingConfirmed = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/hotel/booking/`,
        {
          fullname,
          phone,
          address,
          check_in_date,
          check_out_date,
          number_of_guests,
          room_id: roomData[0].id,
        },
        {
          headers: {
            "X-CSRFToken": csrftoken,
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      setErrorMessage("");
      setBookingConfirmed(true);
      onBookingConfirmed();
    } catch (error) {
      console.error("Lỗi:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail); // Lưu thông báo lỗi từ API
      }
    }
  };
  const renderErrorMessage = () => {
    return (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  };
  var Day = calculateNumberOfDays(check_in_date, check_out_date);
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
                <a href="/room-type/" className="text-dark">
                  RoomType
                </a>
                <span className="text-black mx-2"> / </span>
                <a href="/room/" className="text-dark">
                  Room
                </a>
                <span className="text-black mx-2"> / </span>
                <a href="/#" className="text-dark">
                  Booking
                </a>
              </h6>
            </nav>
          </div>
        </div>
      </div>
      {bookingConfirmed ? (
        <div>
          <section className="bookSuccess">
            <div className="container">
              <div className="row">
                <div
                  className="col-md-12 text-center"
                  style={{ marginTop: 100 }}
                >
                  <h1>Đặt phòng thành công!</h1>
                  <p>Thông tin đặt phòng đã được gửi.</p>
                  <a href="/booking/history">
                    Nhấn vào đây để xem những phòng bạn đã đặt
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className="container" style={{ marginTop: 10 }}>
            <div className="row justify-content-center">
              <div className="col-12 col-xxl-11">
                <div className="card border-light-subtle shadow-sm">
                  <div className="row g-0">
                    <div className="col-12 col-md-6">
                      <div className="mt-4">
                        <h2 className="h4 text-center">Thông tin phòng</h2>
                      </div>
                      <div className="ms-5">
                        {roomData && roomData.length > 0 ? (
                          roomData.map((roomItem, index) => (
                            <div key={index}>
                              <img
                                src={
                                  "http://127.0.0.1:8000/media/" +
                                  roomItem.image
                                }
                                alt=""
                                style={{ width: 400, height: 200 }}
                              />
                              <p>Loại phòng: {roomItem.room_type_name}</p>
                              <p>Số phòng: {roomItem.room_number}</p>
                              <p>Giá phòng(VNĐ): {roomItem.price}đ/ngày</p>
                              {/* Kiểm tra xem check_in_date và check_out_date có dữ liệu không trước khi sử dụng */}

                              <>
                                <p>Số ngày ở: {Day}</p>
                                <p>
                                  Tổng giá tiền(VNĐ): {roomItem.price * Day}đ
                                </p>
                              </>
                            </div>
                          ))
                        ) : (
                          <p>
                            Không có dữ liệu phòng hoặc dữ liệu không hợp lệ.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <div className="col-12 col-lg-11 col-xl-10">
                        <div className="card-body p-3 p-md-4 p-xl-5">
                          <div className="row">
                            <div className="col-12">
                              <div className="mb-5">
                                <h2 className="h4 text-center">Đặt phòng</h2>
                              </div>
                            </div>
                          </div>

                          <form action="#!">
                            <div className="row gy-3 overflow-hidden">
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="fullname"
                                    name="fullname"
                                    placeholder="Họ và tên"
                                    value={fullname}
                                    onChange={(e) =>
                                      setFullName(e.target.value)
                                    }
                                  />
                                  <label
                                    htmlFor="fullname"
                                    className="form-label"
                                  >
                                    Họ và tên
                                  </label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                    onChange={(e) =>
                                      setCustomerPhone(e.target.value)
                                    }
                                  />
                                  <label htmlFor="phone" className="form-label">
                                    SĐT
                                  </label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input
                                    className="form-control"
                                    name="address"
                                    id="address"
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={address}
                                    onChange={(e) =>
                                      setCustomerAddress(e.target.value)
                                    }
                                  />
                                  <label
                                    htmlFor="address"
                                    className="form-label"
                                  >
                                    Địa chỉ
                                  </label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input
                                    className="form-control"
                                    name="check_in"
                                    id="check_in"
                                    type="date"
                                    placeholder="Ngày nhận phòng"
                                    value={check_in_date}
                                    onChange={(e) =>
                                      setCheckInDate(e.target.value)
                                    }
                                  />
                                  <label
                                    htmlFor="check_in"
                                    className="form-label"
                                  >
                                    Ngày nhận phòng
                                  </label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input
                                    className="form-control"
                                    name="check_out"
                                    id="check_out"
                                    type="date"
                                    placeholder="Ngày trả phòng"
                                    value={check_out_date}
                                    onChange={(e) =>
                                      setCheckOutDate(e.target.value)
                                    }
                                  />
                                  <label
                                    htmlFor="check_out"
                                    className="form-label"
                                  >
                                    Ngày trả phòng
                                  </label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input
                                    className="form-control"
                                    id="number_guest"
                                    name="number_guest"
                                    type="number"
                                    placeholder="Số người"
                                    value={number_of_guests}
                                    onChange={(e) =>
                                      setNumberOfGuest(e.target.value)
                                    }
                                  />
                                  <label
                                    htmlFor="number_guest"
                                    className="form-label"
                                  >
                                    Số người
                                  </label>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="d-grid">
                                  <button
                                    className="btn btn-dark btn-lg"
                                    type="button"
                                    onClick={handleBookingConfirmed}
                                  >
                                    Đặt ngay
                                  </button>
                                </div>
                              </div>
                              <div className="col-12">
                                {errorMessage && renderErrorMessage()}{" "}
                                {/* Hiển thị thông báo lỗi */}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BookingForm;
