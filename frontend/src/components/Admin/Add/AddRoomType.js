import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
function AddRoomTypes() {
  const csrftoken = Cookies.get("csrftoken");
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens } = useContext(AuthContext);
  const [amenities, setAmenities] = useState([]);
  const [Hotel, setHotel] = useState([]);
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoRoomType, setInfoRoomType] = useState({
    name: "",
    description: "",
    price: "",
    number_of_rooms: "",
    number_of_guest: "",
    hotel_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoRoomType({ ...infoRoomType, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  useEffect(() => {
    async function fetchRoomTypes() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/hotel/amenity/",
          {
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ` + String(authTokens.access),
            },
          }
        );
        setAmenities(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }

    fetchRoomTypes(); //
  }, []);
  useEffect(() => {
    async function fetchHotel() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/hotel/");
        setHotel(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }

    fetchHotel();
  }, []);
  const handlePost = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/hotel/room-type/create/`,
        {
          name: infoRoomType.name,
          description: infoRoomType.description,
          amenities: infoRoomType.amenities,
          price: infoRoomType.price,
          image: image,
          number_of_rooms: infoRoomType.number_of_rooms,
          number_of_guest: infoRoomType.number_of_guest,
          hotel_id: infoRoomType.hotel_id,
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
        setSuccessMessage("Khách sạn đã được thêm thành công.");
        setErrorMessage("");
        setImage(null);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setErrorMessage("Có lỗi xảy ra khi thêm khách sạn.");
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
                    <h3>Thêm kiểu phòng</h3>
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
                          <label htmlFor="roomtypename" className="mr-2">
                            Tên loại phòng:
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="roomtypename"
                            placeholder="Tên loại phòng"
                            required
                            style={{ width: 300 }}
                            name="name"
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Product Name Can't Be Empty
                          </div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="descrition" className="mr-2">
                            Mô tả:
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="descrition"
                            placeholder="Mô tả"
                            required
                            style={{ width: 300 }}
                            name="description"
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Product Name Can't Be Empty
                          </div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="amenities" className="mr-2">
                            Tiện nghi
                          </label>
                        </div>
                        <div className="col-md-8">
                          <select
                            className="form-control w-300 addrt"
                            id="amenities"
                            required
                            multiple
                            name="amenities"
                            onChange={handleChange}
                            style={{ width: 300 }}
                          >
                            {amenities.amenities &&
                              amenities.amenities.length > 0 &&
                              amenities.amenities.map((amenity) => (
                                <option key={amenity.id} value={amenity.id}>
                                  {amenity.name}
                                </option>
                              ))}
                          </select>
                          <div className="invalid-feedback">
                            Product Name Can't Be Empty
                          </div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="price" className="mr-2">
                            Giá:
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="price"
                            placeholder="Nhập giá"
                            name="price"
                            onChange={handleChange}
                            style={{ width: 300 }}
                          />
                          <div className="invalid-feedback">
                            Product Name Can't Be Empty
                          </div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="number_room" className="mr-2">
                            Tổng số phòng:
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="number_room"
                            placeholder="Nhập tổng số phòng"
                            name="number_of_rooms"
                            onChange={handleChange}
                            style={{ width: 300 }}
                          />
                          <div className="invalid-feedback">
                            Product Name Can't Be Empty
                          </div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="number_of_guests" className="mr-2">
                            Số người:
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="number_of_guests"
                            placeholder="Nhập số người có thể ở"
                            name="number_of_guest"
                            onChange={handleChange}
                            style={{ width: 300 }}
                          />
                          <div className="invalid-feedback">
                            Product Name Can't Be Empty
                          </div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="number_of_guests" className="mr-2">
                            Thuộc khách sạn:
                          </label>
                        </div>
                        <div className="col-md-8">
                          <select
                            className="form-control w-300 addrt"
                            id="roomTypeId"
                            required
                            style={{ width: 300 }}
                            name="hotel_id"
                            onChange={handleChange}
                          >
                            <option value="">-----Chọn khách sạn-----</option>
                            {Hotel.map((hotel) => (
                              <option key={hotel.id} value={hotel.id}>
                                {hotel.name}
                              </option>
                            ))}
                          </select>
                          <div className="invalid-feedback">
                            Product Name Can't Be Empty
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
                            onChange={(e) => handleImageChange(e)}
                            style={{ width: 300 }}
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
export default AddRoomTypes;
