import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { useHotelState } from "../../../utils/useHotel_RoomState";
import { MessageState } from "../../../utils/Message";
function AddHotel() {
  const { authTokens } = useContext(AuthContext);
  const csrftoken = Cookies.get("csrftoken");
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    MessageState;
  const { infoHotel, setInfoHotel, provinces } = useHotelState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoHotel({ ...infoHotel, [name]: value });
  };
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("name", infoHotel.name);
      formData.append("address", infoHotel.address);
      formData.append("province", infoHotel.province);
      formData.append("description", infoHotel.description);
      formData.append("rating", infoHotel.rating);
      formData.append("image", image);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/hotel/create/`,
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
        setSuccessMessage("The hotel has been successfully added.");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("error:", error);
      setErrorMessage("An error occurred while adding a hotel.");
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
                    <h3>Add Hotel</h3>
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

                    <form action="#" className="" encType="multipart/form-data">
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
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="address" className="mr-2">
                            Address
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
                            <option value="">-----Select Province-----</option>
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
                            onChange={handleChange}
                          />
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
                            placeholder="Choose image"
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
export default AddHotel;
