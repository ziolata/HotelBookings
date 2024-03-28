import React from "react";

import Header from "../Layout/header";
import Footer from "../Layout/footer";
import RoomTypePage from "../../../Pages/User/RoomTypePage";

function RoomType() {
  return (
    <>
      <Header />
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
                </h6>
              </nav>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="section-header pt-4">
            <h2>Danh sách loại phòng</h2>
          </div>
          <RoomTypePage numToShow={10} />
        </div>
      </section>

      <Footer />
    </>
  );
}
export default RoomType;
