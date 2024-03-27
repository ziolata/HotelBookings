import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Cookies from "js-cookie";
function RoomUpdate() {
  const { authTokens } = useContext(AuthContext);
  const csrftoken = Cookies.get("csrftoken");
  const { Id } = useParams(); // Access roomId from URL parameter
  const [room, setRoom] = useState([]);
  const [roomDetail, setRoomDetail] = useState({
    id: "",
    name: "",
    image: "",
    room_number: "",
    status: "",
    price: "",
    amenity_data: "",
    room_type_id: "",
  });

  const [room_number, setRoomNumber] = useState("");
  const [room_type_id, setRoom_type_id] = useState("");
  const [check_in_date, setCheckInDate] = useState("");
  const [check_out_date, setCheckOutDate] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const getRoom = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/hotel/room/${Id}/`
      );
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
    setStatus(roomDetail.status);
    setRoomNumber(roomDetail.room_number);
    setRoom_type_id(roomDetail.room_type_id);
  }, [roomDetail.room_number, roomDetail.status, roomDetail.room_type_id]);

  useEffect(() => {
    // Hàm gọi API để lấy danh sách các loại phòng khi component được tạo
    async function fetchRoomTypes() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/hotel/room-type/"
        );
        setRoomTypes(response.data); // Cập nhật trạng thái mới với danh sách các loại phòng từ API
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }

    fetchRoomTypes(); // Gọi hàm lấy danh sách loại phòng
  }, []);

  const handlePatchRoom = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("room_number", room_number);
      formData.append("room_type_id", room_type_id);
      formData.append("status", status);

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/hotel/room/update/${Id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrftoken,
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Thay đổi thông tin thành công.");
        setErrorMessage("");
        setRoomNumber("");
        setRoom_type_id("");
        setStatus("");
        setImage(null);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setErrorMessage("Có lỗi xảy ra khi thay đổi thông tin.");
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
                      <h3>Thêm phòng</h3>
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
                      <form action="" className="">
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="room_number" className="mr-2">
                              Số phòng:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="number"
                              className="form-control w-300 addrt"
                              id="room_number"
                              placeholder="Nhập số phòng"
                              required
                              style={{ width: 300 }}
                              value={room_number}
                              onChange={(e) => setRoomNumber(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              Số phòng không thể trống !!!
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
                              <option value="available">Có sẵn</option>
                              <option value="booked">Đã đặt</option>
                            </select>
                            <div className="invalid-feedback">
                              Trạng thái không thể để trống !!!
                            </div>
                          </div>
                        </div>

                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="roomTypeId" className="mr-2">
                              Loại phòng:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-control w-300 addrt"
                              id="roomTypeId"
                              required
                              style={{ width: 300 }}
                              value={room_type_id}
                              onChange={(e) => setRoom_type_id(e.target.value)}
                            >
                              <option value="">
                                -----Chọn loại phòng-----
                              </option>
                              {roomTypes.map((roomType) => (
                                <option key={roomType.id} value={roomType.id}>
                                  {roomType.name}
                                </option>
                              ))}
                            </select>
                            <div className="invalid-feedback">
                              Loại phòng không thể để trống !!!
                            </div>
                          </div>
                        </div>

                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="image" className="mr-2">
                              Chọn hình ảnh:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="file"
                              className="form-control w-300 addrt"
                              id="image"
                              placeholder=""
                              required
                              style={{ width: 300 }}
                              onChange={(e) => handleImageChange(e)}
                            />
                            <div className="invalid-feedback">chọn ảnh</div>
                          </div>
                        </div>

                        <button
                          className="btn btn-dark mt-5 mx-auto d-block"
                          type="button"
                          onClick={handlePatchRoom}
                        >
                          Sửa
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
export default RoomUpdate;
