import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

function BookingList() {
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens } = useContext(AuthContext);
  const [hotel, setHotel] = useState([]);
  const getHotel = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/hotel/booking/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(authTokens.access),
        },
      }
    );
    // console(response.data);
    setHotel(response.data);
  };
  useEffect(() => {
    getHotel();
  }, []);
  const handleDeleteClick = async (id) => {
    // Hiển thị hộp thoại xác nhận
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/hotel/booking/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + String(authTokens.access),
          },
        });
        getHotel();
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };
  return (
    <section>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-12 col-md-8 ">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-title text-center mt-3">
                    <h3>Danh sách đặt phòng</h3>
                  </div>

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">Đ/Chỉ</th>
                        <th scope="col">CheckIn</th>
                        <th scope="col">CheckOut</th>
                        <th scope="col">Price</th>
                        <th scope="col">Loại phòng:</th>
                        <th scope="col">User:</th>
                        <th scope="col">TT</th>
                        <th>Edit/delete</th>
                      </tr>
                    </thead>
                    {hotel.map((item, index) => (
                      <tbody key={item.id}>
                        <tr>
                          <th scope="row">{item.id}</th>
                          <td>{item.fullname}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>{item.check_in_date}</td>
                          <td>{item.check_out_date}</td>
                          <td>{item.price}</td>
                          <td>{item.room_name}</td>
                          <td>{item.email}</td>
                          <td>{item.status}</td>
                          <td className="d-flex justify-content-center">
                            <div className="col-md-3">
                              <a href={"/dashboard/booking/edit/id=" + item.id}>
                                <i class="fas fa-edit"></i>
                              </a>
                            </div>
                            <div className="col-md-3">
                              <p
                                id="btnDelete"
                                href=""
                                onClick={() => handleDeleteClick(item.id)}
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
export default BookingList;
