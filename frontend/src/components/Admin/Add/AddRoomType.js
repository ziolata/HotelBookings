import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Select from "react-select";
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
    amenities: [],
  });

  console.log("Giá trị của amenities:", infoRoomType.amenities);
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
  const handleAmenitiesChange = (selectedOptions) => {
    const selectedAmenities = selectedOptions.map((option) => ({
      id: option.value,
    }));
    setInfoRoomType({ ...infoRoomType, amenities: selectedAmenities });
  };
  const handlePost = async () => {
    const formData = new FormData();
    infoRoomType.amenities.forEach((amenity) => {
      formData.append("amenities", amenity.id);
    });
    formData.append("name", infoRoomType.name);
    formData.append("description", infoRoomType.description);
    formData.append("price", infoRoomType.price);
    formData.append("image", image);
    formData.append("number_of_rooms", infoRoomType.number_of_rooms);
    formData.append("number_of_guest", infoRoomType.number_of_guest);
    formData.append("hotel_id", infoRoomType.hotel_id);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/hotel/room-type/create/`,
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
                    <h3>Add RoomType</h3>
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
                            Roomtype name
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="roomtypename"
                            placeholder="Roomtype name"
                            required
                            style={{ width: 300 }}
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="descrition" className="mr-2">
                            Description
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="descrition"
                            placeholder="Description"
                            required
                            style={{ width: 300 }}
                            name="description"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="amenities" className="mr-2">
                            Amenities
                          </label>
                        </div>
                        <div className="col-md-8">
                          <div
                            className="size"
                            style={{ width: 300, marginLeft: 15 }}
                          >
                            <Select
                              options={
                                amenities &&
                                amenities.map((amenity) => ({
                                  value: amenity.id,
                                  label: amenity.name,
                                }))
                              }
                              isMulti
                              name="amenities"
                              onChange={handleAmenitiesChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="price" className="mr-2">
                            Price
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="price"
                            placeholder="Price"
                            name="price"
                            onChange={handleChange}
                            style={{ width: 300 }}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="number_room" className="mr-2">
                            Number of Rooms
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="number_room"
                            placeholder="Number of Rooms"
                            name="number_of_rooms"
                            onChange={handleChange}
                            style={{ width: 300 }}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="number_of_guests" className="mr-2">
                            Number of guests
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="number_of_guests"
                            placeholder="Number of guests"
                            name="number_of_guest"
                            onChange={handleChange}
                            style={{ width: 300 }}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="number_of_guests" className="mr-2">
                            Hotel:
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
                            <option value="">-----Select Hotel-----</option>
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
                            Choose image
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
export default AddRoomTypes;
