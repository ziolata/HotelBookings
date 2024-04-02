import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
function UserList() {
  const { authTokens, userinfo, userAll } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/user/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        window.location.reload();
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  useEffect(() => {
    if (userinfo.role_name === "Mod" || userinfo.role_name === "User") {
      window.location.href = "/";
    } else if (userinfo.role_name === "Admin") {
      window.location.href = "/dashboard";
    } else {
      setLoading(false);
    }
  }, [userinfo]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <div className="container">
        <div className="row ">
          <div className="col-lg-12 col-md-8 ">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-title text-center mt-3">
                    <h3>User List</h3>
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
                        <i className="fa fa-plus" aria-hidden="true"></i> Add
                      </button>
                    </a>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Fullname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Role</th>
                        <th>Edit</th>
                        <th>Del</th>
                      </tr>
                    </thead>
                    {userAll.map((user, index) => (
                      <tbody key={user.id}>
                        <tr>
                          <th scope="row">{user.id}</th>
                          <td>{user.username}</td>
                          <td>{user.fullname}</td>
                          <td>{user.email}</td>
                          <td>{user.address}</td>
                          <td>{user.role_name}</td>
                          <td className="d-flex justify-content-center">
                            <div className="col-md-3">
                              <a href={"/dashboard/user/edit/id=" + user.id}>
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
                                onClick={() => handleDeleteClick(user.id)}
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
export default UserList;
