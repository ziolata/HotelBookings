import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RoomDetailsPage() {
  const { roomId } = useParams(); // Access roomId from URL parameter
  const [room, setRoom] = useState([]);
  const [roomDetail, setRoomDetail] = useState({
    id: "",
    name: "",
    image: "",
    room_number: "",
    status: "",
    price: "",
    amenity_data: "",
  });
  const getRoom = async () => {
    try {
      const response = await axios({
        url: `http://127.0.0.1:8000/api/hotel/room/${roomId}/`,
        method: "GET",
      });
      setRoomDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
      // Hiển thị thông báo lỗi cho người dùng (tùy chọn)
      setRoomDetail([]); // Tùy chọn đặt mảng rỗng để kích hoạt thông báo tải
    }
  };
  const getRoomDifferent = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/hotel/room/");
    setRoom(response.data);
  };
  useEffect(() => {
    getRoom();
  }, []);
  useEffect(() => {
    getRoomDifferent();
  }, [roomId]); // Chạy lại getRoom khi ID phòng thay đổi // Re-run getRoom on roomId change
  const handleDifferentRoom = (roomId) => {
    window.location.href = `/room/${roomId}/`;
  };
  const handleRoomClick = (roomId) => {
    window.location.href = `/booking/roomid=${roomId}/`;
  };
  return (
    <>
      <section className="py-5">
        <div className=" text-center  border-bottom bg-light">
          <div className="">
            <div className="container mt-4 p-2">
              <nav className="d-flex">
                <h6 className="mb-2">
                  <a href="/" className="text-dark">
                    Home
                  </a>
                  <span className="text-black mx-2"> / </span>
                  <a href="/room/" className="text-dark">
                    Room
                  </a>
                  <span className="text-black mx-2"> / </span>
                  <a href="#" className="text-dark">
                    Details
                  </a>
                  {/* <span className="text-white-50 mx-2"> &gt; </span>
                <a href="" className="text-white">
                  <u>Data</u>
                </a> */}
                </h6>
              </nav>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row gx-5" key={roomDetail.id}>
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  data-type="image"
                  href={roomDetail.image}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={roomDetail.image}
                  />
                </a>
              </div>
              <div className="d-flex justify-content-center mb-3">
                <a
                  data-fslightbox="mygalley"
                  className="border mx-1 rounded-2"
                  target="_blank"
                  data-type="image"
                  href="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/02/23014734/image-10-hinh-anh-khach-san-du-khach-muon-duoc-nhin-thay-nhat-164553045440951.jpg"
                >
                  <img
                    width={60}
                    height={60}
                    className="rounded-2"
                    src="https://duonggiahotel.vn/wp-content/uploads/2023/01/4048e2d8302ae874b13b.jpg"
                  />
                </a>
                <a
                  data-fslightbox="mygalley"
                  className="border mx-1 rounded-2"
                  target="_blank"
                  data-type="image"
                  href="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/02/23014734/image-10-hinh-anh-khach-san-du-khach-muon-duoc-nhin-thay-nhat-164553045440951.jpg"
                >
                  <img
                    width={60}
                    height={60}
                    className="rounded-2"
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp"
                  />
                </a>
                <a
                  data-fslightbox="mygalley"
                  className="border mx-1 rounded-2"
                  target="_blank"
                  data-type="image"
                  href="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/02/23014734/image-10-hinh-anh-khach-san-du-khach-muon-duoc-nhin-thay-nhat-164553045440951.jpg"
                >
                  <img
                    width={60}
                    height={60}
                    className="rounded-2"
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp"
                  />
                </a>
                <a
                  data-fslightbox="mygalley"
                  className="border mx-1 rounded-2"
                  target="_blank"
                  data-type="image"
                  href="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/02/23014734/image-10-hinh-anh-khach-san-du-khach-muon-duoc-nhin-thay-nhat-164553045440951.jpg"
                >
                  <img
                    width={60}
                    height={60}
                    className="rounded-2"
                    src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/02/23014734/image-10-hinh-anh-khach-san-du-khach-muon-duoc-nhin-thay-nhat-164553045440951.jpg"
                  />
                </a>
                <a
                  data-fslightbox="mygalley"
                  className="border mx-1 rounded-2"
                  target="_blank"
                  data-type="image"
                  href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp"
                >
                  <img
                    width={60}
                    height={60}
                    className="rounded-2"
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp"
                  />
                </a>
              </div>
              {/* thumbs-wrap.// */}
              {/* gallery-wrap .end// */}
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                  Phòng: {roomDetail.room_number}
                </h4>
                <p>Loại phòng: {roomDetail.name}</p>
                {/* <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fas fa-star-half-alt" />
                    <span className="ms-1">4.5</span>
                  </div>
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1" />
                    154 orders
                  </span>
                  <span className="text-success ms-2">In stock</span>
                </div> */}
                <div className="mb-3">
                  <span> Giá: </span>
                  <span className="h5">{roomDetail.price}</span>
                  <span className="text-muted">đ/ngày</span>
                </div>
                {/* <p>{roomDetail.description}</p> */}
                <div className="row">
                  <dt className="text-center">Tiện nghi:</dt>
                  {roomDetail.amenity_data &&
                    roomDetail.amenity_data.map((amenity) => (
                      <dt className="col-md-4">
                        <div className="amenities d-flex" key={amenity.id}>
                          <img
                            src={amenity.icon}
                            style={{ width: 15, height: 15 }}
                          />
                          <p key={amenity.id} style={{ marginLeft: 10 }}>
                            {amenity.name}
                          </p>
                        </div>
                      </dt>
                    ))}
                  {/* <dd className="col-9">Regular</dd>
                    <dt className="col-3">Color</dt>
                    <dd className="col-9">Brown</dd>
                    <dt className="col-3">Material</dt>
                    <dd className="col-9">Cotton, Jeans</dd>
                    <dt className="col-3">Brand</dt>
                    <dd className="col-9">Reebook</dd> */}
                </div>
                <hr />
                <button
                  onClick={() => handleRoomClick(roomDetail.id)}
                  className="btn btn-warning shadow-0"
                >
                  {" "}
                  Book now{" "}
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>
      {/* content */}
      <section className="bg-light border-top py-4">
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-12">
              <div className="px-0 border rounded-2 shadow-0 ">
                <div className="card">
                  <div className="card-body ">
                    <h5 className="card-title text-center">Phòng khác</h5>
                    <div className="d-flex">
                      {room.map((item, index) => (
                        <div
                          onClick={() => handleDifferentRoom(item.id)}
                          className="col-lg-3 mb-3"
                        >
                          <a href="#" className="me-3">
                            <img
                              src={item.image}
                              style={{ minWidth: 96, height: 96 }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              Phòng: {item.room_number} <br />
                              Loại phòng: {item.name}
                            </a>
                            <strong className="text-dark">
                              {item.price}đ/ngày
                            </strong>
                          </div>
                        </div>
                      ))}
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
export default RoomDetailsPage;
