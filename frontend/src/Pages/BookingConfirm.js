import React from "react";

const BookingConfirmation = ({ booking }) => {
  const { room, checkInDate, checkOutDate, numberOfGuests } = booking;

  return (
    <div>
      <h1>Đặt phòng thành công</h1>
      <p>Mã đặt phòng: {booking.id}</p>
      <p>Tên phòng: {room.name}</p>
      <p>Ngày check-in: {checkInDate}</p>
      <p>Ngày check-out: {checkOutDate}</p>
      <p>Số lượng khách: {numberOfGuests}</p>
      <p>Giá phòng: {room.price}</p>

      <div className="buttons">
        <a href="/">Quay lại trang chủ</a>
        <a href="/bookings">Lịch sử đặt phòng</a>
      </div>
    </div>
  );
};

export default BookingConfirmation;
