import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Cookies from "js-cookie";
import Select from "react-select";
function RoomTypeDetail() {
  const { authTokens } = useContext(AuthContext);
  const csrftoken = Cookies.get("csrftoken");
  const [amenities1, setAmenities] = useState([]);
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const { Id } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomType({ ...roomtype, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleAmenitiesChange = (selectedOptions) => {
    const selectedAmenities = selectedOptions.map((option) => ({
      id: option.value,
    }));
    setRoomType({ ...roomtype, amenities: selectedAmenities });
  };
  const [roomDetail, setRoomDetail] = useState([]);
  const [roomtype, setRoomType] = useState("");

  const getRoom = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/hotel/room-type/${Id}/`
      );
      setRoomDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);

      setRoomDetail([]);
    }
  };
  useEffect(() => {
    getRoom();
    setRoomType({ ...roomtype, ...roomDetail });
  }, [
    roomDetail.name,
    roomDetail.price,
    roomDetail.number_of_rooms,
    roomDetail.description,
    roomDetail.number_of_guest,
    roomDetail.hotel_id,
    roomDetail.image,
  ]);
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
    async function fetchRoomTypes() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/hotel/");
        setRoomTypes(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }

    fetchRoomTypes();
  }, []);

  const handlePatchRoom = async () => {
    try {
      const formData = new FormData();
      formData.append("name", roomtype.name);
      formData.append("image", image);
      formData.append("price", roomtype.price);
      formData.append("number_of_rooms", roomtype.number_of_rooms);
      formData.append("number_of_guest", roomtype.number_of_guest);
      formData.append("description", roomtype.description);
      roomtype.amenities.forEach((amenity) => {
        formData.append("amenities", amenity.id);
      });
      formData.append("hotel_id", roomtype.hotel_id);
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/hotel/room-type/update/${Id}/`,

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
        setErrorMessage("");
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
                      <h3>Update info Roomtype</h3>
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
                              defaultValue={roomtype.name}
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
                              defaultValue={roomtype.description}
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
                                  amenities1 &&
                                  amenities1.map((amenity) => ({
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
                              type="number"
                              className="form-control w-300 addrt"
                              id="price"
                              placeholder="Price"
                              name="price"
                              defaultValue={roomtype.price}
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
                              defaultValue={roomtype.number_of_rooms}
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
                              type="number"
                              className="form-control w-300 addrt"
                              id="number_of_guests"
                              placeholder="Number of guest"
                              name="number_of_guest"
                              defaultValue={roomtype.number_of_guest}
                              onChange={handleChange}
                              style={{ width: 300 }}
                            />
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="number_of_guests" className="mr-2">
                              Hotel
                            </label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-control w-300 addrt"
                              id="roomTypeId"
                              required
                              style={{ width: 300 }}
                              name="hotel_id"
                              defaultValue={roomTypes.hotel_id}
                              onChange={handleChange}
                            >
                              <option value="">-----Select Hotel-----</option>
                              {roomTypes.map((hotel) => (
                                <option key={hotel.id} value={hotel.id}>
                                  {hotel.name}
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
                              onChange={(e) => handleImageChange(e)}
                              style={{ width: 300 }}
                            />
                            <div className="invalid-feedback">Choose image</div>
                          </div>
                        </div>

                        <button
                          className="btn btn-dark mt-5 mx-auto d-block"
                          type="button"
                          onClick={handlePatchRoom}
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
export default RoomTypeDetail;
