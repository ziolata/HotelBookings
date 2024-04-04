import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
function AddUser() {
  const { userinfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Signup, setSignup] = useState({
    fullname: "",
    username: "",
    email: "",
    address: "",
    password: "",
    phone_number: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...Signup, [name]: value });
  };
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("fullname", Signup.fullname);
    formData.append("username", Signup.username);
    formData.append("email", Signup.email);
    formData.append("address", Signup.address);
    formData.append("password", Signup.password);
    formData.append("phone_number", Signup.phone_number);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/signup/`, {
        formData,
      });

      if (response.status === 201) {
        setSuccessMessage("Thêm người dùng thành công.");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setErrorMessage("Có lỗi xảy ra khi thêm người dùng.");
      setSuccessMessage("");
    }
  };
  useEffect(() => {
    if (
      userinfo.role_name === "Admin" ||
      userinfo.role_name === "Mod" ||
      userinfo.role_name === "User"
    ) {
      history.push("/");
      window.location.reload();
    } else {
      setLoading(false);
    }
  }, [userinfo, history]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-10 col-md-8 ml-auto">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-title text-center mt-3">
                    <h3>Add User</h3>
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
                            Fullname
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="name"
                            name="fullname"
                            placeholder="Write fullname"
                            required
                            style={{ width: 300 }}
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
                            name="address"
                            placeholder="Address"
                            required
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="Username" className="mr-2">
                            Username
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="Username"
                            name="username"
                            placeholder="Username"
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="email" className="mr-2">
                            Email
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="email"
                            placeholder="Email"
                            name="email"
                            required
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback"></div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="password" className="mr-2">
                            Password
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="password"
                            className="form-control w-300 addrt"
                            id="password"
                            placeholder="Password"
                            name="password"
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="phone" className="mr-2">
                            Phone
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="number"
                            className="form-control w-300 addrt"
                            id="phone"
                            placeholder="Phone number"
                            required
                            name="phone_number"
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Số sao không thể để trống !!!
                          </div>
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
export default AddUser;
