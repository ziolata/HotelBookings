import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import RoomDetail from "./RoomEdit";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";

function UserUpdate() {
  const csrftoken = Cookies.get("csrftoken");
  const token = localStorage.getItem("authTokens");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { authTokens, userinfo } = useContext(AuthContext); // Lấy token lưu trữ
  const { Id } = useParams();
  const [role_id, setRoleID] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Role, setRole] = useState([]);

  const [User, setUser] = useState({
    id: "",
    fullname: "",
    username: "",
    phone_number: "",
    address: "",
    role_id: "",
    email: "",
    is_staff: "",
  });
  const [UserInfo, setUserInfo] = useState({
    id: "",
    fullname: "",
    username: "",
    phone_number: "",
    address: "",
    role_id: "",
    email: "",
    is_staff: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...UserInfo, [name]: value });
  };
  const getUser = async () => {
    try {
      const response = await axios({
        url: `http://127.0.0.1:8000/api/user/${Id}/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
      setUser([]);
    }
  };
  useEffect(() => {
    getUser();
    setUserInfo({ ...UserInfo, ...User });
    setRoleID(User.role_id);
  }, [
    User.fullname,
    User.address,
    User.phone_number,
    User.role_id,
    User.is_staff,
    User.username,
    User.email,
  ]);

  const handlePatchUser = async () => {
    try {
      const formData = new FormData();
      formData.append("fullname", UserInfo.fullname);
      formData.append("username", UserInfo.username);
      formData.append("address", UserInfo.address);
      formData.append("phone_number", UserInfo.phone_number);
      formData.append("role_id", role_id);
      formData.append("is_staff", UserInfo.is_staff);
      formData.append("email", UserInfo.email);

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/user/${Id}/`,
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
        setSuccessMessage("Thay đổi thông tin thành công.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setErrorMessage("Có lỗi xảy ra khi thay đổi thông tin.");
      setSuccessMessage("");
    }
  };
  useEffect(() => {
    // Hàm gọi API để lấy danh sách các loại phòng khi component được tạo
    async function fetchRoomTypes() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/role/", {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ` + String(authTokens.access),
          },
        });
        setRole(response.data); // Cập nhật trạng thái mới với danh sách các loại phòng từ API
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    }

    fetchRoomTypes(); // Gọi hàm lấy danh sách loại phòng
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
    <>
      <section>
        <div className="container-fluid">
          <div className="row ">
            <div className="col-lg-10 col-md-8 ml-auto">
              <div className="row align-items-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-title text-center mt-3">
                      <h3>Cập nhật thông tin người dùng</h3>
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

                      <form
                        action="#"
                        className=""
                        encType="multipart/form-data"
                      >
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="name" className="mr-2">
                              Họ và tên:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="name"
                              placeholder="Nhập họ và tên"
                              required
                              style={{ width: 300 }}
                              name="fullname"
                              defaultValue={UserInfo.fullname}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Không thể để trống ô này!!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="username" className="mr-2">
                              Username
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="username"
                              placeholder="Username"
                              required
                              style={{ width: 300 }}
                              name="username"
                              defaultValue={UserInfo.username}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Không thể để trống ô này!!!
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
                              defaultValue={UserInfo.address}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Địa chỉ không thể để trống !!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="email" className="mr-2">
                              Email:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="email"
                              className="form-control w-300 addrt"
                              id="email"
                              placeholder="Nhập email"
                              required
                              style={{ width: 300 }}
                              name="email"
                              defaultValue={UserInfo.email}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Không thể để trống ô này!!!
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="province" className="mr-2">
                              Điện thoại
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control w-300 addrt"
                              id="province"
                              placeholder="Điện thoại"
                              required
                              style={{ width: 300 }}
                              defaultValue={UserInfo.phone_number}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              Không thể để trống ô này !!!
                            </div>
                          </div>
                        </div>

                        <div className="form-group d-flex justify-content-center mb-3">
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
                        </div>

                        <div className="form-group d-flex justify-content-center mb-3">
                          <div className="col-md-3">
                            <label htmlFor="rating" className="mr-2">
                              Nhân viên
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
                              name="is_staff"
                              defaultValue={UserInfo.is_staff}
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
                          onClick={handlePatchUser}
                        >
                          Cập nhật
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
export default UserUpdate;
