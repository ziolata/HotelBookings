import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RoomTypeDetailsPage() {
  // Access roomId from URL parameter
  const { roomId } = useParams();
  const [room, setRoom] = useState([]);
  const [roomDetail, setRoomDetail] = useState({
    name: "",
    description: "",
    amenities: "",
    image: "",
    price: "",
    number_of_rooms: "",
    number_of_guest: "",
    hotel_id: "",
  });

  // Fetch data based on roomId
  const getRoom = async () => {
    try {
      const response = await axios({
        url: `http://127.0.0.1:8000/api/hotel/room-type/${roomId}/`,
        method: "GET",
      });
      setRoomDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
      setRoomDetail([]);
    }
  };

  const getRoomDifferent = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/hotel/room-type/"
    );
    setRoom(response.data);
  };
  useEffect(() => {
    getRoom();
  }, []);
  useEffect(() => {
    getRoomDifferent();
  }, [roomId]);
  const handleDifferentRoom = (roomId) => {
    window.location.href = `/room-type/${roomId}/`;
  };
  return (
    <>
      {/* Heading */}
      {/* content */}
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
                  <a href="/room-type/" className="text-dark">
                    RoomType
                  </a>
                  <span className="text-black mx-2"> / </span>
                  <a href="/room-type/" className="text-dark">
                    RoomType-Details
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
        <div className="container mt-3">
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
                    src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/02/23014734/image-10-hinh-anh-khach-san-du-khach-muon-duoc-nhin-thay-nhat-164553045440951.jpg"
                  />
                </a>
                <a
                  data-fslightbox="mygalley"
                  className="border mx-1 rounded-2"
                  target="_blank"
                  data-type="image"
                  href="https://duonggiahotel.vn/wp-content/uploads/2023/01/4048e2d8302ae874b13b.jpg"
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
                  href="https://duonggiahotel.vn/wp-content/uploads/2023/03/phong-family-vip-duong-gia-hoel.jpg"
                >
                  <img
                    width={60}
                    height={60}
                    className="rounded-2"
                    src="https://duonggiahotel.vn/wp-content/uploads/2023/03/phong-family-vip-duong-gia-hoel.jpg"
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
                  href="https://duonggiahotel.vn/wp-content/uploads/2023/03/phong-family-vip-duong-gia-hoel2.jpg"
                >
                  <img
                    width={60}
                    height={60}
                    className="rounded-2"
                    src="https://duonggiahotel.vn/wp-content/uploads/2023/03/phong-family-vip-duong-gia-hoel2.jpg"
                  />
                </a>
              </div>
              {/* thumbs-wrap.// */}
              {/* gallery-wrap .end// */}
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{roomDetail.name}</h4>

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
                  <span className="text-muted">đ/một ngày</span>
                </div>
                <p>{roomDetail.description}</p>
                <div className="row">
                  <dt className="text-center">Tiện nghi:</dt>
                  {roomDetail.amenities &&
                    roomDetail.amenities.map((amenity) => (
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
                <a href="/room/" className="btn btn-warning shadow-0">
                  {" "}
                  Xem các loại phòng {roomDetail.name}{" "}
                </a>
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
                    <h5 className="card-title text-center">Loại phòng khác</h5>
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
export default RoomTypeDetailsPage;
