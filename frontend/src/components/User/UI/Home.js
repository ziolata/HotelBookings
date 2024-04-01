import React from "react";
import Header from "../Layout/header";
import Footer from "../Layout/footer";
import HeaderSlide from "../Layout/headerSlide";
import RoomTypePage from "../../../Pages/User/RoomTypePage";
import HotelPage from "../../../Pages/User/HotelPage";

function RoomTypePageI() {
  return (
    <>
      <Header />
      <HeaderSlide />
      <div className="container ">
        <div className="seenAll" style={{ marginBottom: 20, marginTop: 20 }}>
          <a href="/room-type/" style={{ color: "black" }}>
            {" "}
            <h2>KHÁCH SẠN</h2>
          </a>
        </div>
        <div className="row">
          <HotelPage numToShow={4} />
          <div className="col-md-3 col-sm-6 d-flex justify-content-center">
            <a
              href="/hotel/"
              className="AllHotel"
              style={{
                borderRadius: "50%",
                backgroundColor: "#ccc",
                width: "100px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 80,

                textDecoration: "none",
                color: "black",
              }}
            >
              <i className="fas fa-arrow-right " style={{ fontSize: 50 }}></i>
              <span style={{}}>Xem tất cả</span>
            </a>
          </div>
        </div>

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
