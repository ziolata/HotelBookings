import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
function AddUser() {
  const csrftoken = Cookies.get("csrftoken");
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens, userinfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [role_id, setRoleID] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Role, setRole] = useState([]);
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
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/signup/`, {
        fullname: Signup.fullname,
        username: Signup.username,
        email: Signup.email,
        address: Signup.address,
        password: Signup.password,
        phone_number: Signup.phone_number,
        role_id: role_id,
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
    async function fetchRoomTypes() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/role/", {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ` + String(authTokens.access),
          },
        });
        setRole(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }

    fetchRoomTypes();
  }, []);
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
                    <h3>Thêm người dùng</h3>
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
                            Họ và tên
                          </label>
                        </div>
                        <div className="col-md-8">
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
                            placeholder="Nhập username"
                            style={{ width: 300 }}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Tỉnh/Thành phố không thể để trống !!!
                          </div>
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
                        <div className="col-md-8">
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
                          <label htmlFor="rating" className="mr-2">
                            SĐT
                          </label>
                        </div>
                        <div className="col-md-8">
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
                      {/* <div className="form-group d-flex justify-content-center mb-3">
                        <div className="col-md-3">
                          <label htmlFor="number_of_guests" className="mr-2">
                            Quyền
                          </label>
                        </div>
                        <div className="col-md-8">
                          <select
                            className="form-control w-300 addrt"
                            id="roomTypeId"
                            required
                            style={{ width: 300 }}
                            value={role_id}
                            onChange={(e) => setRoleID(e.target.value)}
                          >
                            <option value="">-----Chọn Quyền-----</option>
                            {Role.map((hotel) => (
                              <option key={hotel.id} value={hotel.id}>
                                {hotel.name}
                              </option>
                            ))}
                          </select>
                          <div className="invalid-feedback">
                            Product Name Can't Be Empty
                          </div>
                        </div>
                      </div> */}
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
export default AddUser;
