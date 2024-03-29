import React from "react";
import Header from "../Layout/header";
import Footer from "../Layout/footer";
import HeaderSlide from "../Layout/headerSlide";
import RoomTypePage from "../../../Pages/User/RoomTypePage";

function RoomTypePageI() {
  return (
    <>
      <Header />
      <HeaderSlide />
      <div className="container ">
        <div className="section-header" style={{ marginTop: 30 }}>
          <h2>Loại Phòng</h2>
          <p>
            Đa dạng các loại phòng cho quý khách hàng lựa chọn cho mình một loại
            phòng phù hợp nhất.
          </p>
        </div>
        <RoomTypePage numToShow={4} />
        <div className="col-md-12 d-flex justify-content-around">
          <div className="seenAll" style={{ marginBottom: 20 }}>
            <i className="fa-solid fa-arrow-right"></i>
            <a href="/room-type/" style={{ color: "black" }}>
              {" "}
              Xem tất cả loại phòng
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default RoomTypePageI;
