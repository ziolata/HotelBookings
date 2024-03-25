import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <>
        <div id="footer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="social">
                  <a href="">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href="">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
                  <a href="">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                </div>
              </div>
              <div className="col-12">
                <p>
                  Copyright © 2045 <a href="/">HotelBooking Site</a> All Rights
                  Reserved.
                </p>
                {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                {/* <p>
                  Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                </p> */}
              </div>
            </div>
          </div>
        </div>
        {/* Footer Section End */}
        <a href="#" className="back-to-top">
          <i className="fa fa-chevron-up" />
        </a>
        {/* Vendor JavaScript File */}
        {/* Booking Javascript File */}
        {/* Main Javascript File */}
      </>
    );
  }
}
