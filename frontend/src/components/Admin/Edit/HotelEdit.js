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
        `http://127.0.0.1:8000/api/hotel/${Id}/`,
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
        setSuccessMessage("Thay đổi thông tin thành công.");

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
                      <h3>Cập nhật thông tin khách sạn</h3>
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
                              placeholder="Tên khách sạn"
                              required
                              style={{ width: 300 }}
                              name="name"
                              defaultValue={hotelInfo.name}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Tên khách sạn không thể để trống !!!
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
                              name="address"
                              defaultValue={hotelInfo.address}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Địa chỉ không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="province" className="mr-2">
                              Tỉnh/Thành Phố:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="province"
                              placeholder="Chọn tỉnh thành phố"
                              required
                              name="province"
                              style={{ width: 300 }}
                              defaultValue={hotelInfo.province}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Tỉnh/Thành phố không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="description" className="mr-2">
                              Mô tả:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="description"
                              placeholder="Mô tả"
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
                              Số sao:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="rating"
                              placeholder="Số sao của khách sạn"
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
                          onClick={handlePatchHotel}
                        >
                          Cập nhật
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
