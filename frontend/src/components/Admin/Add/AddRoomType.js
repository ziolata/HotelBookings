import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
function AddRoomTypes() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [Amenity, setAmenity] = useState([]);
  const [Hotel, setHotel] = useState([]);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [number_of_rooms, setNumberOfRoom] = useState("");
  const [number_of_guest, setNumberOfGuest] = useState("");
  const [hotel_id, setHotelId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  console.log(amenities);
  const csrftoken = Cookies.get("csrftoken");
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens } = useContext(AuthContext);
  useEffect(() => {
    // Hàm gọi API để lấy danh sách các loại phòng khi component được tạo
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
        setAmenities(response.data); // Cập nhật trạng thái mới với danh sách các loại phòng từ API
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }

    fetchRoomTypes(); // Gọi hàm lấy danh sách loại phòng
  }, []);
  useEffect(() => {
    // Hàm gọi API để lấy danh sách các loại phòng khi component được tạo
    async function fetchHotel() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/hotel/");
        setHotel(response.data); // Cập nhật trạng thái mới với danh sách các loại phòng từ API
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }

    fetchHotel(); // Gọi hàm lấy danh sách loại phòng
  }, []);
  const handlePost = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/hotel/room-type/`,
        {
          name,
          description,
          amenities,
          price,
          image,
          number_of_rooms,
          number_of_guest,
          hotel_id,
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
        // setRoomNumber("");
        // setRoom_type_id("");
        // setStatus("");
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            value={amenities}
                            onChange={(e) =>
                              setAmenities(
                                Array.from(
                                  e.target.selectedOptions,
                                  (option) => option.value
                                )
                              )
                            }
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
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                            value={number_of_rooms}
                            onChange={(e) => setNumberOfRoom(e.target.value)}
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
                            value={number_of_guest}
                            onChange={(e) => setNumberOfGuest(e.target.value)}
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
                            value={hotel_id}
                            onChange={(e) => setHotelId(e.target.value)}
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
