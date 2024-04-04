import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { MessageState } from "../../../utils/Message";
import { useRoomState } from "../../../utils/useHotel_RoomState";
import { getRoomType, useRoomTypeEffect } from "../../../utils/Api";
function AddRoom() {
  const { authTokens } = useContext(AuthContext);
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    MessageState;
  const { roomInfo, setRoomInfo } = useRoomState;
  const csrftoken = Cookies.get("csrftoken");
  const [roomTypes, setRoomTypes] = useState([]);
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomInfo({ ...roomInfo, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  useRoomTypeEffect(() => getRoomType(setRoomTypes));
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("room_number", roomInfo.room_number);
    formData.append("room_type_id", roomInfo.room_type_id);
    formData.append("image", image);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/hotel/room/create/`,
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
                    <h3>Add Room</h3>
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
                            Room number
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="number"
                            className="form-control w-300 addrt"
                            id="room_number"
                            placeholder="Room number"
                            required
                            style={{ width: 300 }}
                            name="room_number"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="roomTypeId" className="mr-2">
                            Roomtype
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
                            <option value="">-----Select Roomtype-----</option>
                            {roomTypes.map((roomType) => (
                              <option key={roomType.id} value={roomType.id}>
                                {roomType.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="image" className="mr-2">
                            Choose image
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
                          <div className="invalid-feedback">Choose image</div>
                        </div>
                      </div>

                      <button
                        className="btn btn-dark mt-5 mx-auto d-block"
                        type="button"
                        onClick={handlePost}
                      >
                        Add
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
