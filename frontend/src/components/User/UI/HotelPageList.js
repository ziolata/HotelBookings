import React from "react";
import Header from "../Layout/header";
import Footer from "../Layout/footer";
import HotelPage from "../../../Pages/User/HotelPage";

function HotelPageUI() {
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
                  <a href="/room/" className="text-dark">
                    Hotel
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
          <div className="row">
            <h1 className="text-center">Hotel List</h1>
            <HotelPage numToShow={10} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
export default HotelPageUI;
