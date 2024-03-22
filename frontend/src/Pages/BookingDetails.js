import React from "react";

const BookingDetails = ({ room }) => {
  return (
    <div>
      <h1>{room.name}</h1>
      <img src={room.image} alt={room.name} />
      <p>{room.description}</p>
      <ul>
        {room.amenities.map((amenity) => (
          <li key={amenity}>{amenity}</li>
        ))}
      </ul>
      <p>Giá: {room.price}</p>
      <BookingForm room={room} />
    </div>
  );
};

export default BookingDetails;
