import React, { Component } from "react";

export default class SearchPage extends Component {
  render() {
    return (
      <div id="search">
        <div className="container">
          <div className="row check-availabilty" id="next">
            <div
              className="block-32 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-offset={-200}
            >
              <form action="#">
                <div className="row">
                  <div className="col-md-6 mb-3 mb-lg-0 col-lg-3">
                    <label
                      htmlFor="checkin_date"
                      className="font-weight-bold text-black"
                    >
                      Check In
                    </label>
                    <div className="field-icon-wrap">
                      <div className="icon">
                        <span className="icon-calendar" />
                      </div>
                      <input
                        type="text"
                        id="checkin_date"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3 mb-lg-0 col-lg-3">
                    <label
                      htmlFor="checkout_date"
                      className="font-weight-bold text-black"
                    >
                      Check Out
                    </label>
                    <div className="field-icon-wrap">
                      <div className="icon">
                        <span className="icon-calendar" />
                      </div>
                      <input
                        type="text"
                        id="checkout_date"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3 mb-md-0 col-lg-3">
                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label
                          htmlFor="adults"
                          className="font-weight-bold text-black"
                        >
                          Adults
                        </label>
                        <div className="field-icon-wrap">
                          <div className="icon">
                            <span className="ion-ios-arrow-down" />
                          </div>
                          <select name="" id="adults" className="form-control">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4+</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label
                          htmlFor="children"
                          className="font-weight-bold text-black"
                        >
                          Children
                        </label>
                        <div className="field-icon-wrap">
                          <div className="icon">
                            <span className="ion-ios-arrow-down" />
                          </div>
                          <select
                            name=""
                            id="children"
                            className="form-control"
                          >
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 align-self-end">
                    <button className="btn btn-primary btn-block text-white">
                      Check Availabilty
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
