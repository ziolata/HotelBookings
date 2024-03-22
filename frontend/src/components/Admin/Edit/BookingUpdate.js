import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext, { AuthProvider } from "../../../context/AuthContext";
function BookingUpdate() {
  const csrftoken = Cookies.get("csrftoken");
  const { authTokens } = useContext(AuthContext);
  const { Id } = useParams(); // Access roomId from URL parameter
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [check_in_date, setCheckInDate] = useState("");
  const [check_out_date, setCheckOutDate] = useState("");
  const [total_price, setTotalPrice] = useState(null);
  const [number_of_guests, setNumberOfGuest] = useState("");
  const [room_name, setRoomName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomDetail, setRoomDetail] = useState({
    fullname: "",
    phone: "",
    address: "",
    check_in_date: "",
    check_out_date: "",
    total_price: "",
    number_of_guests: "",
    room_name: "",
    email: "",
    status: "",
  });
  const getRoom = async () => {
    try {
      const response = await axios({
        url: `http://127.0.0.1:8000/api/hotel/booking/${Id}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setRoomDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
      // Hiển thị thông báo lỗi cho người dùng (tùy chọn)
      setRoomDetail([]); // Tùy chọn đặt mảng rỗng để kích hoạt thông báo tải
    }
  };
  useEffect(() => {
    getRoom();
    setFullName(roomDetail.fullname);
    setAddress(roomDetail.address);
    setPhone(roomDetail.phone);
    setCheckInDate(roomDetail.check_in_date);
    setCheckOutDate(roomDetail.check_out_date);
    setTotalPrice(roomDetail.total_price);
    setNumberOfGuest(roomDetail.number_of_guests);
    setRoomName(roomDetail.room_name);
    setEmail(roomDetail.email);
    setStatus(roomDetail.status);
  }, [
    roomDetail.fullname,
    roomDetail.address,
    roomDetail.phone,
    roomDetail.check_in_date,
    roomDetail.check_out_date,
    roomDetail.room_name,
    roomDetail.email,
    roomDetail.status,
    roomDetail.number_of_guests,
    roomDetail.total_price,
  ]);

  const handlePatchBooking = async () => {
    try {
      const formData = new FormData();
      formData.append("address", address);
      formData.append("fullname", fullname);
      formData.append("phone", phone);
      formData.append("check_in_date", check_in_date);
      formData.append("check_out_date", check_out_date);
      formData.append("room_name", room_name);
      formData.append("email", email);
      formData.append("status", status);
      formData.append("number_of_guest", number_of_guests);
      formData.append("total_price", total_price);
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/hotel/booking/${Id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrftoken,
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Cập nhật thông tin thành công.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setErrorMessage("Có lỗi xảy ra khi cập nhật thông tin.");
      setSuccessMessage("");
    }
  };
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row ">
            <div className="col-lg-10 col-md-8 ml-auto">
              <div className="row align-items-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-title text-center mt-3">
                      <h3>Cập nhật thông tin đặt phòng</h3>
                    </div>
                    <div className="card-body">
                      {successMessage && (
                        <div className="alert alert-success" role="alert">
                          {successMessage}
                        </div>
                      )}
                      {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      )}

                      <form
                        action="#"
                        className=""
                        encType="multipart/form-data"
                      >
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="name" className="mr-2">
                              Tên khách sạn:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="name"
                              placeholder="Tên khách hàng"
                              required
                              style={{ width: 300 }}
                              value={fullname}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="address" className="mr-2">
                              Địa chỉ:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="address"
                              placeholder="Địa chỉ"
                              required
                              style={{ width: 300 }}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              Địa chỉ không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="phone" className="mr-2">
                              Tỉnh/Thành Phố:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="phone"
                              placeholder="phone"
                              required
                              style={{ width: 300 }}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="checkin" className="mr-2">
                              Ngày nhận phòng
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="checkin"
                              placeholder="checkin"
                              required
                              style={{ width: 300 }}
                              value={check_in_date}
                              onChange={(e) => setCheckInDate(e.target.value)}
                            />
                            <div className="invalid-feedback"></div>
                          </div>
                        </div>

                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="checkout" className="mr-2">
                              Ngày trả phòng
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="checkout"
                              placeholder="ngày trả phòng"
                              required
                              style={{ width: 300 }}
                              value={check_out_date}
                              onChange={(e) => setCheckOutDate(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="room_name" className="mr-2">
                              Ngày trả phòng
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="room_name"
                              placeholder="tên phòng"
                              required
                              style={{ width: 300 }}
                              value={room_name}
                              onChange={(e) => setRoomName(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="email" className="mr-2">
                              Email
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="email"
                              placeholder="email"
                              required
                              style={{ width: 300 }}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="numberOfGuest" className="mr-2">
                              Số người
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="NumberOfGuest"
                              placeholder="Số người"
                              required
                              style={{ width: 300 }}
                              value={number_of_guests}
                              onChange={(e) => setNumberOfGuest(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="totalprice" className="mr-2">
                              Tổng tiền
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="totalprice"
                              placeholder="ngày trả phòng"
                              readonly
                              style={{ width: 300 }}
                              value={total_price}
                              //   onChange={(e) => setTotalPrice(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="status" className="mr-2">
                              Trạng thái:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-control w-300 addrt"
                              id="status"
                              required
                              style={{ width: 300 }}
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="">
                                -----Chọn trạng thái-----
                              </option>
                              <option value="Pending">Chờ phê duyệt</option>
                              <option value="Confirmed">Đã xác nhận</option>
                              <option value="Cancelled">Đã hủy</option>
                            </select>
                            <div className="invalid-feedback">
                              Trạng thái không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-dark mt-5 mx-auto d-block"
                          type="button"
                          onClick={handlePatchBooking}
                        >
                          Cập Nhật
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default BookingUpdate;
