import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";
function HotelDetail() {
  const csrftoken = Cookies.get("csrftoken");
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens } = useContext(AuthContext);
  const { Id } = useParams(); // Access roomId from URL parameter
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomDetail, setRoomDetail] = useState([]);
  const provinces = [
    "Tỉnh Đắk Lắk",
    "Tỉnh Đắk Nông",
    "Thành Phố Đà Nẵng",
    "Tỉnh Bình Định",
    "Tỉnh Khánh Hòa",
    "Thành Phố Hồ Chí Minh",
    "Thủ Đô Hà Nội",
  ];
  const [hotelInfo, setHotelInfo] = useState({
    id: "",
    name: "",
    address: "",
    province: "",
    description: "",
    image: "",
    rating: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo({ ...hotelInfo, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const getRoom = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/hotel/${Id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
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
    setHotelInfo({ ...hotelInfo, ...roomDetail });
  }, [
    roomDetail.name,
    roomDetail.address,
    roomDetail.description,
    roomDetail.province,
    roomDetail.rating,
  ]);

  const handlePatchHotel = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", hotelInfo.name);
      formData.append("address", hotelInfo.address);
      formData.append("province", hotelInfo.province);
      formData.append("description", hotelInfo.description);
      formData.append("rating", hotelInfo.rating);

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/hotel/update/${Id}/`,
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
        setSuccessMessage("Successfully updated.");

        setImage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while updating information.");
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
                      <h3>Update info hotel</h3>
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
                              Hotel name
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="name"
                              placeholder="Hotel name"
                              required
                              style={{ width: 300 }}
                              name="name"
                              defaultValue={hotelInfo.name}
                              onChange={handleChange}
                            />
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
                              placeholder="Address"
                              required
                              style={{ width: 300 }}
                              name="address"
                              defaultValue={hotelInfo.address}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="province" className="mr-2">
                              Province
                            </label>
                          </div>
                          <div className="col-md-8">
                            <select
                              id="province"
                              className="form-control w-300 addrt"
                              style={{ width: 300 }}
                              name="province"
                              onChange={handleChange}
                            >
                              <option value="">
                                -----Select Province-----
                              </option>
                              {provinces.map((province) => (
                                <option key={province} value={province}>
                                  {province}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="description" className="mr-2">
                              Description
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="description"
                              placeholder="Description"
                              required
                              style={{ width: 300 }}
                              name="description"
                              defaultValue={hotelInfo.description}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback"></div>
                          </div>
                        </div>

                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="rating" className="mr-2">
                              Rating
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="rating"
                              placeholder="Rating"
                              required
                              style={{ width: 300 }}
                              name="rating"
                              defaultValue={hotelInfo.rating}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Số sao không thể để trống !!!
                            </div>
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
                          onClick={handlePatchHotel}
                        >
                          Update
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
export default HotelDetail;
