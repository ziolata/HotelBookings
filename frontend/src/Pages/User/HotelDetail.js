import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function HotelDetailPage() {
  const { id } = useParams(); // Access roomId from URL parameter
  const [hotel, setHotel] = useState([]);
  const [hotelDetail, setHotelDetail] = useState([]);
  const getHotelDetail = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/hotel/${id}/`
      );
      setHotelDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
      setHotelDetail([]);
    }
  };
  const getHotelDifferent = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/hotel/");
    setHotel(response.data);
  };
  useEffect(() => {
    getHotelDetail();
  }, []);
  useEffect(() => {
    getHotelDifferent();
  }, [id]); // Chạy lại khi id thay đổi
  const handleDifferentRoom = (id) => {
    window.location.href = `/room/${id}/`;
  };
  const handleRoomClick = (id) => {
    window.location.href = `/hotel/`;
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
                    Hotel
                  </a>
                  <span className="text-black mx-2"> / </span>
                  <a href="#" className="text-dark">
                    Detail
                  </a>
                </h6>
              </nav>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row gx-5" key={hotelDetail.id}>
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  data-type="image"
                  href={hotelDetail.image}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      width: "100vw",
                      height: 200,
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={hotelDetail.image}
                  />
                </a>
              </div>
              <div className="d-flex justify-content-center mb-3"></div>
              {/* thumbs-wrap.// */}
              {/* gallery-wrap .end// */}
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{hotelDetail.name}</h4>

                <div className="d-flex flex-row my-3">
                  Rating:
                  <div className="text-warning mb-1 me-2">
                    {hotelDetail.rating && hotelDetail.rating > 0 && (
                      <>
                        {[...Array(hotelDetail.rating)].map((_, index) => (
                          <i className="fa fa-star" key={index} />
                        ))}
                        {hotelDetail.rating < 5 && <i className="" />}
                      </>
                    )}
                    {hotelDetail.star && hotelDetail.rating === 0 && (
                      <i className="fa fa-star" />
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <span> Địa chỉ: {hotelDetail.address}</span>
                  {/* <span className="h5">{roomDetail.price}</span> */}
                </div>
                {/* <p>{roomDetail.description}</p> */}
                <div className="row">
                  <dd className="">Tỉnh/Thành Phố: {hotelDetail.province}</dd>
                </div>
                <hr />
              </div>
              <div className="ps-lg-3 d-flex justify-content-center">
                <button
                  onClick={() => handleRoomClick(hotelDetail.id)}
                  className="btn btn-warning shadow-0"
                >
                  {" "}
                  Xem thêm các khách sạn khác{" "}
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
                    <h5 className="card-title text-center">Khách sạn khác</h5>
                    <div className="d-flex">
                      {hotel.map((item, index) => (
                        <div className="col-lg-3 mb-3">
                          <a href={"/hotel/" + item.id} className="me-3">
                            <img
                              src={item.image}
                              style={{ minWidth: 96, height: 96 }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              KS: {item.name}
                            </a>
                            <strong className="text-dark">
                              {item.province}
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
export default HotelDetailPage;
