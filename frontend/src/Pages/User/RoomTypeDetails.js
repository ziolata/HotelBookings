import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getRoomType, getRoomTypeDetail } from "../../utils/Api";

function RoomTypeDetailsPage() {
  const { roomId } = useParams();
  const [roomType, setRoomType] = useState([]);
  const [roomTypeDetail, setRoomTypeDetail] = useState("");
  useEffect(() => {
    getRoomTypeDetail(roomId, setRoomTypeDetail);
  }, []);
  useEffect(() => {
    getRoomType(setRoomType);
  }, [roomId]);
  const handleDifferentRoom = (roomId) => {
    window.location.href = `/room-type/${roomId}/`;
  };
  const RoomTypeOtherType = roomType.slice(0, 4);
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
                  <a href="/room-type/" className="text-dark">
                    RoomType
                  </a>
                  <span className="text-black mx-2"> / </span>
                  <a href="/room-type/" className="text-dark">
                    Detail
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
          <div className="row gx-5" key={roomTypeDetail.id}>
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  data-type="image"
                  href={roomTypeDetail.image}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={roomTypeDetail.image}
                  />
                </a>
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{roomTypeDetail.name}</h4>
                <div className="mb-3">
                  <p>
                    Hotel:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {roomTypeDetail.hotel_name}
                    </span>
                  </p>
                  <p>
                    Address:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {roomTypeDetail.hotel_adress}, {roomTypeDetail.province}
                    </span>{" "}
                  </p>
                  <span> Price: </span>
                  <span className="h5">{roomTypeDetail.price}</span>
                  <span className="text-muted">$/day</span>
                </div>
                <p>{roomTypeDetail.description}</p>
                <div className="row">
                  <dt className="text-center">Amenities:</dt>
                  {roomTypeDetail.amenities_info &&
                    roomTypeDetail.amenities_info.map((amenity) => (
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
                </div>
                <hr />
                <div className="ps-lg-3 d-flex justify-content-center">
                  <button className="btn btn-warning shadow-0">
                    <a
                      href={"/room/roomtype/" + roomTypeDetail.id}
                      className="btn btn-warning shadow-0"
                    >
                      {" "}
                      see rooms in the room type {roomTypeDetail.name}
                    </a>
                  </button>
                </div>
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
                    <h5 className="card-title text-center">Other roomtype</h5>
                    <div className="d-flex">
                      {RoomTypeOtherType.map((item, index) => (
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
                              Room: {item.room_number} <br />
                              RoomType: {item.name}
                            </a>
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
