import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

function HotelUpdate() {
  const token = localStorage.getItem("authTokens"); // Lấy token lưu trữ
  const { authTokens } = useContext(AuthContext);
  const [hotel, setHotel] = useState([]);
  const getHotel = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/hotel/");
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
        await axios.delete(`http://127.0.0.1:8000/api/hotel/${id}/`, {
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
      <div className="container">
        <div className="row ">
          <div className="col-lg-11 col-md-8 ">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-title text-center mt-3">
                    <h3>Danh sách khách sạn</h3>
                  </div>
                  <div className="d-flex flex-row-reverse ">
                    <a href="/dashboard/hotel/add/">
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
                        <th scope="col">Tên KS</th>
                        <th scope="col">Đ/chỉ</th>
                        <th scope="col">image</th>
                        <th scope="col">rating</th>
                        <th>Edit/delete</th>
                      </tr>
                    </thead>
                    {hotel.map((item, index) => (
                      <tbody key={item.id}>
                        <tr>
                          <th scope="row">{item.id}</th>
                          <td>{item.name}</td>
                          <td>{item.address}</td>
                          <td>
                            <img
                              src={item.image}
                              alt="Hotel Image"
                              style={{ height: 100, width: 100 }}
                            />
                          </td>
                          <td>{item.rating}</td>
                          <td className="d-flex justify-content-center">
                            <div className="col-md-3">
                              <a href={"/dashboard/hotel/edit/id=" + item.id}>
                                <i className="fas fa-edit"></i>
                              </a>
                            </div>
                            <div className="col-md-3">
                              <a
                                id="btnDelete"
                                href=""
                                onClick={() => handleDeleteClick(item.id)}
                              >
                                <i className="fa-solid fa-x"></i>
                              </a>
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
export default HotelUpdate;
