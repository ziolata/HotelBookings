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
  const { Id } = useParams(); // Access roomId from URL parameter
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [role_id, setRoleID] = useState("");
  const [is_staff, setIsStaff] = useState("");
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
    is_staff: "",
  });
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
      // Hiển thị thông báo lỗi cho người dùng (tùy chọn)
      setUser([]); // Tùy chọn đặt mảng rỗng để kích hoạt thông báo tải
    }
  };
  useEffect(() => {
    getUser();
    setFullName(User.fullname);
    setUserName(User.username);
    setAddress(User.address);
    setPhoneNumber(User.phone_number);
    setRoleID(User.role_id);
    setIsStaff(User.is_staff);
  }, [
    User.fullname,
    User.address,
    User.phone_number,
    User.role_id,
    User.is_staff,
    User.username,
  ]);

  const handlePatchUser = async () => {
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("address", address);
      formData.append("phone_number", phone_number);
      formData.append("role_id", role_id);
      formData.append("is_staff", is_staff);

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
                              value={fullname}
                              onChange={(e) => setFullName(e.target.value)}
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
                              value={phone_number}
                              onChange={(e) => setPhoneNumber(e.target.value)}
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
                              value={is_staff}
                              onChange={(e) => setIsStaff(e.target.value)}
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
