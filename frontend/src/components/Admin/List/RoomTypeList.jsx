import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { getRoomType } from "../../../utils/Api";

function RoomTypeList() {
  const { authTokens } = useContext(AuthContext);
  const [roomType, setRoomType] = useState([]);

  useEffect(() => {
    getRoomType(setRoomType);
  }, []);
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/hotel/room-type/update/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + String(authTokens.access),
            },
          }
        );
        getRoomType();
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
                    <h3>Roomtype List</h3>
                  </div>
                  <div className="d-flex flex-row-reverse ">
                    <a href="/dashboard/room-type/add/">
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{
                          marginBottom: 10,
                          padding: 5,
                          marginRight: 20,
                        }}
                      >
                        <i class="fa fa-plus" aria-hidden="true"></i> Add
                      </button>
                    </a>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Roomtype</th>
                        <th scope="col">Amenities</th>
                        <th scope="col">Price</th>
                        <th scope="col" style={{ width: 100 }}>
                          Hotel
                        </th>
                        <th>Edit</th>
                        <th>Del</th>
                      </tr>
                    </thead>
                    {roomType.map((item, index) => (
                      <tbody key={item.id}>
                        <tr>
                          <th scope="row">{item.id}</th>
                          <td>{item.name}</td>
                          <td>
                            {item.amenities_info.map((amenity) => (
                              <p>{amenity.name}</p>
                            ))}
                          </td>

                          <td>{item.price}</td>

                          <td>{item.hotel_name}</td>
                          {/* <td>
                            <img
                              src={item.image}
                              alt="Hotel Image"
                              style={{ height: 100, width: 100 }}
                            />
                          </td> */}
                          <td className="d-flex justify-content-center">
                            <div className="col-md-3">
                              <a
                                href={"/dashboard/room-type/edit/id=" + item.id}
                              >
                                <i class="fas fa-edit"></i>
                              </a>
                            </div>

                            {/* <Link to={`/room-detail/${item.id}`}>Edit</Link> */}
                          </td>
                          <td>
                            <div className="col-md-3">
                              <a
                                id="btnDelete"
                                href=""
                                onClick={() => handleDeleteClick(item.id)}
                              >
                                <i className="fa-solid fa-x"></i>
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
export default RoomTypeList;
