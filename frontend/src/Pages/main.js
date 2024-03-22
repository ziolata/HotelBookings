import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Main extends Component {
  render() {
    return (
      <>
        <div id="welcome">
          <div className="container">
            <h3>Welcome to Royal Hotel</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              gravida sollicitudin turpis id posuere. Fusce nec rhoncus nibh.
              Fusce arcu libero, euismod eget commodo at, venenatis a nisi. Sed
              faucibus metus sed leo vulputate blandit.
            </p>
            <a href="#">Book Now</a>
          </div>
        </div>
        {/* Welcome Section End */}
        {/* Amenities Section Start */}
        <div id="amenities" className="home-amenities">
          <div className="container">
            <div className="section-header">
              <h2>Amenities &amp; Services</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in mi libero. Quisque convallis, enim at venenatis
                tincidunt.
              </p>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-6 icons">
                <i className="icon icon-2" />
                <h3>Air Conditioner</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
              <div className="col-md-3 col-sm-6 icons">
                <i className="icon icon-3" />
                <h3>Bathtub</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
              <div className="col-md-3 col-sm-6 icons">
                <i className="icon icon-4" />
                <h3>Shower</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
              <div className="col-md-3 col-sm-6 icons">
                <i className="icon icon-6" />
                <h3>Television</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
              <div className="col-md-3 col-sm-6 icons">
                <i className="icon icon-7" />
                <h3>WiFi</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
              <div className="col-md-3 col-sm-6 icons">
                <i className="icon icon-8" />
                <h3>Telephone</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
              <div className="col-md-3 col-sm-6 icons">
                <i className="icon icon-9" />
                <h3>Mini Bar</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
              <div className="col-md-3 col-sm-6 icons">
                <i className="icon icon-10" />
                <h3>Kitchen</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Amenities Section Start */}
        {/* Room Section Start */}
        <div id="rooms">
          <div className="container">
            <div className="section-header">
              <h2>Our Rooms</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in mi libero. Quisque convallis, enim at venenatis
                tincidunt.
              </p>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="room-img">
                      <div className="box12">
                        <img src="img/room/room-1.jpg" />
                        <div className="box-content">
                          <h3 className="title">Standard Single</h3>
                          <ul className="icon">
                            <li>
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-id"
                              >
                                <i className="fa fa-link" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="room-des">
                      <h3>
                        <a href="#" data-toggle="modal" data-target="#modal-id">
                          Standard Single
                        </a>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <ul className="room-size">
                        <li>
                          <i className="fa fa-arrow-right" />
                          Size: 260 sq ft{" "}
                        </li>
                        <li>
                          <i className="fa fa-arrow-right" />
                          Beds: 2 Single(s){" "}
                        </li>
                      </ul>
                      <ul className="room-icon">
                        <li className="icon-1" />
                        <li className="icon-2" />
                        <li className="icon-3" />
                        <li className="icon-4" />
                        <li className="icon-5" />
                        <li className="icon-6" />
                        <li className="icon-7" />
                        <li className="icon-8" />
                        <li className="icon-9" />
                        <li className="icon-10" />
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="room-rate">
                      <h3>From</h3>
                      <h1>$150</h1>
                      <a href="#">Book Now</a>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="room-img">
                      <div className="box12">
                        <img src="img/room/room-2.jpg" />
                        <div className="box-content">
                          <h3 className="title">Standard Double</h3>
                          <ul className="icon">
                            <li>
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-id"
                              >
                                <i className="fa fa-link" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="room-des">
                      <h3>
                        <a href="#" data-toggle="modal" data-target="#modal-id">
                          Standard Double
                        </a>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <ul className="room-size">
                        <li>
                          <i className="fa fa-arrow-right" />
                          Size: 350 sq ft{" "}
                        </li>
                        <li>
                          <i className="fa fa-arrow-right" />
                          Beds: 2 Double(s){" "}
                        </li>
                      </ul>
                      <ul className="room-icon">
                        <li className="icon-1" />
                        <li className="icon-2" />
                        <li className="icon-3" />
                        <li className="icon-4" />
                        <li className="icon-5" />
                        <li className="icon-6" />
                        <li className="icon-7" />
                        <li className="icon-8" />
                        <li className="icon-9" />
                        <li className="icon-10" />
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="room-rate">
                      <h3>From</h3>
                      <h1>$200</h1>
                      <a href="#">Book Now</a>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="room-img">
                      <div className="box12">
                        <img src="img/room/room-3.jpg" />
                        <div className="box-content">
                          <h3 className="title">Premium Single</h3>
                          <ul className="icon">
                            <li>
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-id"
                              >
                                <i className="fa fa-link" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="room-des">
                      <h3>
                        <a href="#" data-toggle="modal" data-target="#modal-id">
                          Premium Single
                        </a>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <ul className="room-size">
                        <li>
                          <i className="fa fa-arrow-right" />
                          Size: 200 sq ft{" "}
                        </li>
                        <li>
                          <i className="fa fa-arrow-right" />
                          Beds: 2 Single(s){" "}
                        </li>
                      </ul>
                      <ul className="room-icon">
                        <li className="icon-1" />
                        <li className="icon-2" />
                        <li className="icon-3" />
                        <li className="icon-4" />
                        <li className="icon-5" />
                        <li className="icon-6" />
                        <li className="icon-7" />
                        <li className="icon-8" />
                        <li className="icon-9" />
                        <li className="icon-10" />
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="room-rate">
                      <h3>From</h3>
                      <h1>$220</h1>
                      <a href="#">Book Now</a>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="room-img">
                      <div className="box12">
                        <img src="img/room/room-4.jpg" />
                        <div className="box-content">
                          <h3 className="title">Silver Double</h3>
                          <ul className="icon">
                            <li>
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-id"
                              >
                                <i className="fa fa-link" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="room-des">
                      <h3>
                        <a href="#" data-toggle="modal" data-target="#modal-id">
                          Silver Double
                        </a>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <ul className="room-size">
                        <li>
                          <i className="fa fa-arrow-right" />
                          Size: 200 sq ft{" "}
                        </li>
                        <li>
                          <i className="fa fa-arrow-right" />
                          Beds: 2 Double(s){" "}
                        </li>
                      </ul>
                      <ul className="room-icon">
                        <li className="icon-1" />
                        <li className="icon-2" />
                        <li className="icon-3" />
                        <li className="icon-4" />
                        <li className="icon-5" />
                        <li className="icon-6" />
                        <li className="icon-7" />
                        <li className="icon-8" />
                        <li className="icon-9" />
                        <li className="icon-10" />
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="room-rate">
                      <h3>From</h3>
                      <h1>$180</h1>
                      <a href="#">Book Now</a>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="room-img">
                      <div className="box12">
                        <img src="img/room/room-5.jpg" />
                        <div className="box-content">
                          <h3 className="title">Premium Double</h3>
                          <ul className="icon">
                            <li>
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-id"
                              >
                                <i className="fa fa-link" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="room-des">
                      <h3>
                        <a href="#" data-toggle="modal" data-target="#modal-id">
                          Premium Double
                        </a>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <ul className="room-size">
                        <li>
                          <i className="fa fa-arrow-right" />
                          Size: 450 sq ft{" "}
                        </li>
                        <li>
                          <i className="fa fa-arrow-right" />
                          Beds: 2 Double(s){" "}
                        </li>
                      </ul>
                      <ul className="room-icon">
                        <li className="icon-1" />
                        <li className="icon-2" />
                        <li className="icon-3" />
                        <li className="icon-4" />
                        <li className="icon-5" />
                        <li className="icon-6" />
                        <li className="icon-7" />
                        <li className="icon-8" />
                        <li className="icon-9" />
                        <li className="icon-10" />
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="room-rate">
                      <h3>From</h3>
                      <h1>$400</h1>
                      <a href="#">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Room Section End */}
        {/* Modal for Room Section Start */}
        <div id="modal-id" className="modal fade" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="port-slider">
                      <div>
                        <img src="img/room-slider/room-1.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-2.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-3.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-4.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-5.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-6.jpg" />
                      </div>
                    </div>
                    <div className="port-slider-nav">
                      <div>
                        <img src="img/room-slider/room-1.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-2.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-3.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-4.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-5.jpg" />
                      </div>
                      <div>
                        <img src="img/room-slider/room-6.jpg" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <h2>Lorem ipsum dolor</h2>
                    <p>
                      Lorem ipsum dolor viverra purus imperdiet rhoncus
                      imperdiet. Suspendisse vulputate condimentum ligula
                      sollicitudin hendrerit. Phasellus luctus, elit et ultrices
                      interdum, neque mi pellentesque massorci. Nam in cursus
                      ex, nec mattis lectus. Curabitur quis elementum nunc.
                      Mauris iaculis, justo eu aliquam sagittis, arcu eros
                      cursus libero, sit amet eleifend dolor odio at lacus.
                    </p>
                    <div className="modal-link">
                      <a href="#">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
