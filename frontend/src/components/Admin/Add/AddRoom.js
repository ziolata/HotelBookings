import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
function AddRoom() {
  const { authTokens } = useContext(AuthContext);
  const csrftoken = Cookies.get("csrftoken");
  const token = localStorage.getItem("authTokens");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [image, setImage] = useState(null);
  const [roomInfo, setRoomInfo] = useState({
    room_number: "",
    room_type_id: "",
    check_in_date: "",
    check_out_date: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomInfo({ ...roomInfo, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  useEffect(() => {
    async function fetchRoomTypes() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/hotel/room-type/"
        );
        setRoomTypes(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }
    fetchRoomTypes();
  }, []);
  const handlePost = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/hotel/room/create/`,
        {
          image,
          room_number: roomInfo.room_number,
          room_type_id: roomInfo.room_type_id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrftoken,
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Phòng đã được thêm thành công.");
        setErrorMessage("");
        setImage(null);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setErrorMessage("Có lỗi xảy ra khi thêm phòng.");
      setSuccessMessage("");
    }
  };
  return (
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
                            name="room_number"
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Số phòng không thể trống !!!
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
                            name="room_type_id"
                            onChange={handleChange}
                          >
                            <option value="">-----Chọn loại phòng-----</option>
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
                        onClick={handlePost}
                      >
                        Thêm
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
  );
}
export default AddRoom;
