import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

import { useAuth } from "../../../context/useAuth";
import AuthContext from "../../../context/AuthContext";

function UserList() {
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens, userinfo } = useContext(AuthContext);
  const [hotel, setHotel] = useState([]);
  const { userAll } = useAuth();
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/user/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + String(authTokens.access),
          },
        });
        window.location.reload();
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };
  const handleEditClick = () => {
    window.location.reload();
  };

  const [loading, setLoading] = useState(true);
  const history = useHistory();
  // const role_name = userinfo.role_name;
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
      <div className="container">
        <div className="row ">
          <div className="col-lg-11 col-md-8 ">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-title text-center mt-3">
                    <h3>Danh sách người dùng</h3>
                  </div>
                  <div className="d-flex flex-row-reverse ">
                    <a href="/dashboard/user/add/">
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{
                          marginBottom: 10,
                          padding: 5,
                          marginRight: 20,
                        }}
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i> Thêm
                      </button>
                    </a>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">SĐT</th> */}
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Quyền</th>
                        {/* <th scope="col">Nhân viên</th> */}

                        <th>Edit/delete</th>
                      </tr>
                    </thead>
                    {userAll.map((user, index) => (
                      <tbody key={user.id}>
                        <tr>
                          <th scope="row">{user.id}</th>
                          <td>{user.username}</td>
                          <td>{user.fullname}</td>
                          <td>{user.email}</td>
                          {/* <td>{user.phone_number}</td> */}
                          <td>{user.address}</td>
                          <td>{user.role_name}</td>
                          {/* <td>{user.is_staff}</td> */}

                          {/* <td>
                          <img
                            src={item.image}
                            alt="Hotel Image"
                            style={{ height: 100, width: 100 }}
                          />
                        </td> */}

                          <td className="d-flex justify-content-center">
                            <div className="col-md-3">
                              <a href={"/dashboard/user/edit/id=" + user.id}>
                                <i className="fas fa-edit"></i>
                              </a>
                            </div>
                            <div className="col-md-3">
                              <p
                                id="btnDelete"
                                href=""
                                onClick={() => handleDeleteClick(user.id)}
                              >
                                <i className="fa-solid fa-x"></i>
                              </p>
                            </div>

                            {/* <Link to={`/room-detail/${item.id}`}>Edit</Link> */}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default UserList;
