import React from "react";
import Header from "../Layout/header";
import Footer from "../Layout/footer";
import RoomPage from "../../../Pages/User/RoomPage";

function RoomClient() {
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
                    Room
                  </a>
                </h6>
              </nav>
            </div>
          </div>
        </div>
        <div className="container mb-50">
          <div className="row" style={{ marginTop: 10 }}>
            <h2 className="text-center">Room List</h2>
            <RoomPage />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
export default RoomClient;
