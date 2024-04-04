import axios from "axios";
import { useEffect } from "react";

/*----- API GET HOTEL ----- */
export const getHotel = async (set) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/hotel/");
    set(response.data);
  } catch (error) {
    console.error("Error fetching hotel:", error);
  }
};
export const getHotelDetail = async (Id, set) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/hotel/${Id}/`);
    set(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching room details:", error);
    set([]);
  }
};
/*----- API GET ROOM ----- */
export const getRoom = async (set) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/hotel/room/");
    set(response.data);
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};
export const getRoomFilter = async (id, set) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/hotel/room/room-type=${id}/`
    );
    set(response.data);
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};
export const useRoomEffect = (getFunction) => {
  useEffect(() => {
    getFunction();
  }, []);
};
export const getRoomDetail = async (roomId, setRoomDetail) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/hotel/room/${roomId}/`
    );
    setRoomDetail(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching room details:", error);
    setRoomDetail([]);
  }
};
export const useRoomDetailEffect = (getFunction, roomId) => {
  useEffect(() => {
    getFunction(roomId);
  }, [roomId]);
};
/*----- API GET ROOMTYPE ----- */
export const getRoomType = async (set) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/hotel/room-type/"
    );
    set(response.data);
  } catch (error) {
    console.error("Error fetching roomtype:", error);
  }
};
export const getRoomTypeDetail = async (Id, set) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/hotel/room-type/${Id}/`
    );
    set(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching room details:", error);
    set([]);
  }
};
export const useRoomTypeEffect = (getFunction) => {
  useEffect(() => {
    getFunction();
  }, []);
};

/*----- API GET AMENITIES ----- */
export const getAmenities = async (set) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/hotel/amenity/"
    );
    set(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching room details:", error);
    set([]);
  }
};
