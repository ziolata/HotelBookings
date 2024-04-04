import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { getRoom } from "../../../utils/Api";

function RoomList() {
  const { authTokens } = useContext(AuthContext);
  const [room, setRoom] = useState([]);

  useEffect(() => {
    getRoom(setRoom);
  }, []);
  const handleDeleteClick = async (id) => {
    // Hiển thị hộp thoại xác nhận
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/hotel/room/update/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        // Sau khi xóa thành công, cập nhật lại danh sách phòng
        getRoom();
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
                    <h3>Room List</h3>
                  </div>
                  <div className="d-flex flex-row-reverse ">
                    <a href="/dashboard/room/add/">
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
                        <th scope="col">#</th>
                        <th scope="col">Room number</th>
                        <th scope="col">Status</th>
                        <th scope="col">RoomType</th>
                        <th scope="col">image</th>
                        <th>Edit</th>
                        <th>Del</th>
                      </tr>
                    </thead>
                    {room.map((item, index) => (
                      <tbody key={item.id}>
                        <tr>
                          <th scope="row">{item.id}</th>
                          <td>{item.room_number}</td>
                          <td>{item.status}</td>
                          <td>{item.name}</td>
                          <td>
                            <img
                              src={item.image}
                              alt="Hotel Image"
                              style={{ height: 100, width: 100 }}
                            />
                          </td>

                          <td className="d-flex justify-content-center">
                            <div className="col-md-3">
                              <a href={"/dashboard/room/edit/id=" + item.id}>
                                <i className="fas fa-edit"></i>
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
export default RoomList;
