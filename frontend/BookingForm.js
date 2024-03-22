import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import calculateNumberOfDays from "../../../Pages/caculator";

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
  const [roomData, setRoomData] = useState(null);
  useEffect(() => {
    if (!room) {
      const selectedRoomId = localStorage.getItem("selectedRoomId");
      if (selectedRoomId) {
        axios
          .get(`/api/hotel/room/available/${selectedRoomId}/`)
          .then((response) => {
            setRoomData(response.data);
            console.log(response);
          });
      }
    }
  }, []);
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
          room_id: roomData?.id,
        },
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      );

      setBookingConfirmed(true);
      onBookingConfirmed();
      // Redirect to confirmation page

      // Handle email sending here, using customerEmail and booking details
    } catch (error) {
      console.error("Error booking room:", error);
      // Display error message to the user
    }
  };
  var Day = calculateNumberOfDays(check_in_date, check_out_date);
  return (
    <div>
      {bookingConfirmed ? (
        <div>
          <h1>Đặt phòng thành công!</h1>
          <p>Thông tin đặt phòng đã được gửi đến email của bạn.</p>
        </div>
      ) : (
        <>
          <section className="bg-light p-3 p-md-4 p-xl-5">
            <div className="container" style={{ marginTop: 50 }}>
              <div className="row justify-content-center">
                <div className="col-12 col-xxl-11">
                  <div className="card border-light-subtle shadow-sm">
                    <div className="row g-0">
                      <div className="col-12 col-md-6">
                        <div className="mt-4">
                          <h2 className="h4 text-center">Thông tin phòng</h2>
                        </div>
                        <div className="ms-5">
                          <img
                            src={
                              "http://127.0.0.1:8000/media/" + roomData?.image
                            }
                            alt=""
                            style={{ width: 400, height: 200 }}
                          />
                          <p>Loại phòng: {roomData?.room_type_name}</p>
                          <p>Số phòng: {roomData?.room_number}</p>
                          <p>Giá phòng(VNĐ): {roomData?.price}</p>
                          <p>Số ngày ở: {Day}</p>
                          <p>Tổng giá tiền(VNĐ): {roomData?.price * Day} </p>
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
                                    <label
                                      htmlFor="phone"
                                      className="form-label"
                                    >
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
          </section>
        </>
      )}
    </div>
  );
};

export default BookingForm;
