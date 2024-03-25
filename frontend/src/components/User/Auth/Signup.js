import React, { useState } from "react";
import axios from "axios";

function Signup() {
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
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Đăng ký
                    </p>
                    <form className="mx-1 mx-md-4">
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="name" className="mr-2">
                            Họ và tên
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="name"
                            name="fullname"
                            placeholder="Nhập họ và tên"
                            required
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Họ và tên không thể để trống !!!
                          </div>
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
                            placeholder="Nhập username"
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Username không thể để trống !!!
                          </div>
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
                            placeholder="Nhập email"
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
                            Mật khẩu
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="password"
                            className="form-control w-300 addrt"
                            id="password"
                            placeholder="Nhập mật khẩu"
                            name="password"
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback"></div>
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="address" className="mr-2">
                            Địa chỉ:
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control w-300 addrt"
                            id="address"
                            name="address"
                            placeholder="Địa chỉ"
                            required
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Địa chỉ không thể để trống !!!
                          </div>
                        </div>
                      </div>

                      <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="rating" className="mr-2">
                            SĐT
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="number"
                            className="form-control w-300 addrt"
                            id="rating"
                            placeholder="Nhập số điện thoại"
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
                        onClick={handleSignup}
                      >
                        Đăng ký
                      </button>
                    </form>
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
  );
}
export default Signup;
