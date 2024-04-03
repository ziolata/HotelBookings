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
            <h2>HOTEL</h2>
          </a>
        </div>
        <div className="row">
          <HotelPage numToShow={3} />
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
              <span style={{}}>See all</span>
            </a>
          </div>
        </div>

        <div className="section-header" style={{ marginTop: 30 }}>
          <h2>RoomType</h2>
          <p>
            A variety of room types allow customers to choose the most suitable
            room type for themselves.
          </p>
        </div>
        <RoomTypePage numToShow={4} />
        <div className="col-md-12 d-flex justify-content-around">
          <div className="seenAll" style={{ marginBottom: 20 }}>
            <i className="fa-solid fa-arrow-right"></i>
            <a href="/room-type/" style={{ color: "black" }}>
              {" "}
              See all Roomtype
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default RoomTypePageI;
