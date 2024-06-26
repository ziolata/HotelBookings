import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

function Signup() {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState({
    email: "",
    password: "",
    username: "",
    address: "",
    fullname: "",
    phone_number: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSignup = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/signup/`, {
        email: info.email,
        username: info.username,
        password: info.password,
        address: info.address,
        phone_number: info.phone_number,
        fullname: info.fullname,
      });
      if (response.status === 201) {
        alert("Bạn đã đăng ký thành công");
        window.location.href = "/login";
      } else {
        alert("Đăng ký thất bại vui lòng kiểm tra lại thông tin đăng ký");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  return (
    <>
      {user ? (
        (window.location.href = "/")
      ) : (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Signup
                        </p>
                        <form className="mx-1 mx-md-4">
                          <div className="form-group d-flex justify-content-center mb-3">
                            <div className="col-md-3">
                              <label htmlFor="name" className="mr-2">
                                Fullname
                              </label>
                            </div>
                            <div className="col-md-9">
                              <input
                                type="text"
                                className="form-control w-300 addrt"
                                id="name"
                                name="fullname"
                                placeholder="Fullname"
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
                            <div className="col-md-9">
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
                            <div className="col-md-9">
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
                            <div className="col-md-9">
                              <input
                                type="password"
                                className="form-control w-300 addrt"
                                id="password"
                                placeholder="Password"
                                name="password"
                                style={{ width: 300 }}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group d-flex justify-content-center mb-3">
                            <div className="col-md-3">
                              <label htmlFor="address" className="mr-2">
                                Address:
                              </label>
                            </div>
                            <div className="col-md-9">
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
                              <label htmlFor="phone" className="mr-2">
                                Phone
                              </label>
                            </div>
                            <div className="col-md-9">
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
                            </div>
                          </div>
                          <button
                            className="btn btn-dark mt-5 mx-auto d-block"
                            type="button"
                            onClick={handleSignup}
                          >
                            Signup
                          </button>
                        </form>
                        <a href="/login" className="nav-link">
                          Click here if you already have an account
                        </a>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
export default Signup;
