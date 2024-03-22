import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
function AddHotel() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const csrftoken = Cookies.get("csrftoken");
  const token = localStorage.getItem("authTokens");

  const { authTokens } = useContext(AuthContext);
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("province", province);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("rating", rating);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/hotel/`,
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
        setName("");
        setAddress("");
        setProvince("");
        setDescription("");
        setImage(null);
        setRating("");
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
                    <h3>Thêm khách sạn</h3>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                            style={{ width: 300 }}
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
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
export default AddHotel;
