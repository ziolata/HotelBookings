import { useState } from "react";

export const useHotelState = () => {
  const provinces = [
    "Tỉnh Đắk Lắk",
    "Tỉnh Đắk Nông",
    "Thành Phố Đà Nẵng",
    "Tỉnh Bình Định",
    "Tỉnh Khánh Hòa",
    "Thành Phố Hồ Chí Minh",
    "Thủ Đô Hà Nội",
  ];
  const [infoHotel, setInfoHotel] = useState({
    name: "",
    address: "",
    province: "",
    description: "",
    rating: "",
  });

  return {
    infoHotel,
    setInfoHotel,
    provinces,
  };
};
export const useRoomTypeState = () => {
  const [infoRoomType, setInfoRoomType] = useState({
    name: "",
    description: "",
    price: "",
    number_of_rooms: "",
    number_of_guest: "",
    hotel_id: "",
    amenities: [],
  });
  return { infoRoomType, setInfoRoomType };
};
export const useRoomState = () => {
  const [room, setRoom] = useState([]);
  const [roomDetail, setRoomDetail] = useState([]);
  const [roomInfo, setRoomInfo] = useState({
    room_number: "",
    room_type_id: "",
    check_in_date: "",
    check_out_date: "",
  });
  return { room, setRoom, roomDetail, setRoomDetail, roomInfo, setRoomInfo };
};
