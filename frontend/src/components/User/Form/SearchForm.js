import React, { useState } from "react";

const SearchForm = ({
  onSearch,
  roomTypeName,
  checkInDate,
  checkOutDate,
  numberOfGuests,
  province,
}) => {
  // Replace with actual data from your backend
  const roomTypes = ["Standard Single", "Standard Double"];
  const provinces = ["Đắk Lắk", "Đắk Nông", "Đà Nẵng", "Phú Quốc"];

  const [formData, setFormData] = useState({
    roomTypeName,
    checkInDate,
    checkOutDate,
    numberOfGuests,
    province,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch(formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div id="search">
      <div className="container" style={{ marginTop: 50 }}>
        <h1 className="text-center">Tìm kiếm phòng</h1>
        <div className="row check-availabilty" id="next">
          <div
            className="block-32 aos-init aos-animate"
            data-aos="fade-up"
            data-aos-offset={-200}
          >
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3 mb-lg-0 col-lg-2">
                  <label
                    htmlFor="roomTypeName"
                    className="font-weight-bold text-black"
                  >
                    Loại Phòng
                  </label>
                  <div className="field-icon-wrap">
                    <div className="icon">
                      <span className="ion-ios-arrow-down" />
                    </div>
                    <select
                      name="roomTypeName"
                      id="roomTypeName"
                      className="form-control"
                      value={formData.roomTypeName}
                      onChange={handleInputChange}
                    >
                      <option value="">Tất cả</option>
                      {roomTypes.map((roomType) => (
                        <option key={roomType} value={roomType}>
                          {roomType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3 mb-lg-0 col-lg-2">
                  <label
                    htmlFor="province"
                    className="font-weight-bold text-black"
                  >
                    Tỉnh/Thành Phố
                  </label>
                  <div className="field-icon-wrap">
                    <div className="icon">
                      <span className="ion-ios-arrow-down" />
                    </div>
                    <select
                      id="province"
                      className="form-control"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                    >
                      <option value="">Tất cả</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3 mb-lg-0 col-lg-2">
                  <label
                    htmlFor="check-in-date"
                    className="font-weight-bold text-black"
                  >
                    Check In
                  </label>
                  <div className="field-icon-wrap">
                    <div className="icon">
                      <span className="icon-calendar" />
                    </div>
                    <input
                      type="date"
                      id="check-in-date"
                      className="form-control"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3 mb-lg-0 col-lg-2">
                  <label
                    htmlFor="check-out-date"
                    className="font-weight-bold text-black"
                  >
                    Check Out
                  </label>
                  <div className="field-icon-wrap">
                    <div className="icon">
                      <span className="icon-calendar" />
                    </div>
                    <input
                      type="date"
                      id="check-out-date"
                      className="form-control"
                      name="checkOutDate"
                      value={formData.checkOutDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 mb-3 mb-md-0 col-lg-2">
                  <label
                    htmlFor="number-of-guests"
                    className="font-weight-bold text-black"
                  >
                    Số người
                  </label>
                  <div className="field-icon-wrap">
                    <div className="icon">
                      <span className="ion-ios-arrow-down" />
                    </div>
                    <select
                      id="number-of-guests"
                      className="form-control"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleInputChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2  align-self-end">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-white mx-auto mt-1"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
