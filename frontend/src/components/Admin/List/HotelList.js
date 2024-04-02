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
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/hotel/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
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
          <div className="col-lg-12 col-md-8 ">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-title text-center mt-3">
                    <h3>Hotel List</h3>
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
                        <i className="fa fa-plus" aria-hidden="true"></i> Add
                      </button>
                    </a>
                  </div>

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: 40 }}>
                          #
                        </th>
                        <th scope="col" style={{ width: 200 }}>
                          Hotel
                        </th>
                        <th scope="col" style={{ width: 250 }}>
                          Address
                        </th>
                        <th scope="col" style={{ width: 120 }}>
                          image
                        </th>
                        <th scope="col" style={{ width: 50 }}>
                          rating
                        </th>

                        <th style={{ width: 50 }}>Edit</th>
                        <th style={{ width: 40 }}>Del</th>
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

                            {/* <Link to={`/room-detail/${item.id}`}>Edit</Link> */}
                          </td>
                          <td>
                            <div className="col-md-3 ">
                              <a
                                id="btnDelete"
                                href=""
                                onClick={() => handleDeleteClick(item.id)}
                              >
                                <i className="fa-solid fa-x "></i>
                              </a>
                            </div>
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
