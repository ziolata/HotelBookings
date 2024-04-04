import React, { useState, useEffect } from "react";
import SearchForm from "../Form/SearchForm";
import axios from "axios";
import Header from "../Layout/header";
import Footer from "../Layout/footer";
import RoomList from "../../../Pages/User/RoomList";
import RoomPage from "../../../Pages/User/RoomPage";
import { getRoom } from "../../../utils/Api";

function SearchClient() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [bookingDates, setBookingDates] = useState([]);
  const [searchParams, setSearchParams] = useState({
    roomTypeName: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    province: "",
  });

  useEffect(() => {
    getRoom(setAvailableRooms);

    const fetchBookingDates = async () => {
      try {
        const response = await axios.get("/api/hotel/booking/date/");
        setBookingDates(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching booking dates:", error);
      }
    };

    getRoom();
    fetchBookingDates();
  }, []);
  console.log(availableRooms);
  const handleSearch = (updatedSearchParams) => {
    setSearchParams(updatedSearchParams);

    try {
      // Filter rooms based on search parameters and booking dates
      const filteredRooms = availableRooms.filter((room) => {
        // Filter by room type, province, and number of guests
        if (
          updatedSearchParams.roomTypeName &&
          room.name !== updatedSearchParams.roomTypeName
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

        // Filter by check-in and check-out dates
        if (
          updatedSearchParams.checkInDate &&
          updatedSearchParams.checkOutDate
        ) {
          const checkInDate = new Date(updatedSearchParams.checkInDate);
          const checkOutDate = new Date(updatedSearchParams.checkOutDate);

          // Check if room is booked during the specified period
          const isBooked = bookingDates.filter((bookingDate) => {
            const bookedCheckInDate = new Date(bookingDate.check_in_date);
            const bookedCheckOutDate = new Date(bookingDate.check_out_date);

            return (
              room.id === bookingDate.room_id &&
              !(
                checkInDate >= bookedCheckOutDate ||
                checkOutDate <= bookedCheckInDate
              )
            );
          });

          return isBooked.length === 0;
        }

        return true;
      });

      setFilteredRooms(filteredRooms);
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  const handleBookNow = (roomId) => {
    // Fetch room details based on roomId
  };

  return (
    <div className="App">
      <Header />
      <SearchForm onSearch={handleSearch} {...searchParams} />
      <RoomList rooms={filteredRooms} onBookNow={handleBookNow} />
      <Footer />
    </div>
  );
}

export default SearchClient;
