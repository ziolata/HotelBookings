import React from "react";
function HeaderSlide() {
  return (
    <div id="headerSlider" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#headerSlider" data-slide-to={0} className="active" />
        <li data-target="#headerSlider" data-slide-to={1} />
        <li data-target="#headerSlider" data-slide-to={2} />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/assets/img/slider/header-slider-1.jpg" alt="Royal Hotel" />
          <div className="carousel-caption">
            <h1 className="animated fadeInRight">Nullam mattis</h1>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/assets/img/slider/header-slider-2.jpg" alt="Royal Hotel" />
          <div className="carousel-caption">
            <h1 className="animated fadeInLeft">Lorem ipsum</h1>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/assets/img/slider/header-slider-3.jpg" alt="Royal Hotel" />
          <div className="carousel-caption">
            <h1 className="animated fadeInRight">Phasellus ultrices</h1>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#headerSlider"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#headerSlider"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
export default HeaderSlide;
