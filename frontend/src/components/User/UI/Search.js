import React, { useState, useEffect } from "react";
import RoomList from "../../../Pages/RoomList";
import SearchForm from "../Form/SearchForm";
import axios from "axios";
import Header from "../../../Pages/header";
import Footer from "../../../Pages/footer";
const Search = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchParams, setSearchParams] = useState({
    roomTypeName: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    province: "",
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/hotel/room/available/");
        setAvailableRooms(response.data);
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleSearch = (updatedSearchParams) => {
    setSearchParams(updatedSearchParams);

    const filteredRooms = availableRooms.filter((room) => {
      // Lọc theo loại phòng
      if (
        updatedSearchParams.roomTypeName &&
        room.room_type_name !== updatedSearchParams.roomTypeName
      ) {
        return false;
      }

      // Lọc theo tỉnh/thành phố
      if (
        updatedSearchParams.province &&
        room.province !== updatedSearchParams.province
      ) {
        return false;
      }

      // Lọc theo số lượng khách (room.numberOfGuests >= updatedSearchParams.numberOfGuests)
      if (room.number_of_guest < updatedSearchParams.numberOfGuests) {
        return false;
      }

      // Lọc theo ngày tháng
      if (updatedSearchParams.checkInDate && updatedSearchParams.checkOutDate) {
        const checkInDate = new Date(updatedSearchParams.checkInDate);
        const checkOutDate = new Date(updatedSearchParams.checkOutDate);

        const roomCheckInDate = new Date(room.check_in_date);
        const roomCheckOutDate = new Date(room.check_out_date);

        // Hiển thị phòng có:
        // - check_out_date (data) < check_in_date (form)
        // - check_in_date và check_out_date (data) null (Phòng trống)
        return (
          roomCheckOutDate < checkInDate ||
          (!roomCheckInDate && !roomCheckOutDate)
        );
      }
      return true;
    });

    setFilteredRooms(filteredRooms);
  };

  const handleBookNow = (roomId) => {
    // Fetch room details based on roomId
    axios
      .get(`/api/hotel/room/available/${roomId}/`)
      .then((response) => {
        const roomData = response.data;
        // Use roomData for booking or display booking form
        console.log("Room details:", roomData);
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  };

  return (
    <div className="App">
      <Header />
      {/* <HeaderSlide /> */}
      <SearchForm onSearch={handleSearch} {...searchParams} />
      <RoomList rooms={filteredRooms} onBookNow={handleBookNow} />
      <Footer />
    </div>
  );
};

export default Search;
