import React from "react";
function calculateNumberOfDays(checkInDate, checkOutDate) {
  // Parse the date strings (assuming YYYY-MM-DD format)
  const parsedCheckIn = new Date(checkInDate);
  const parsedCheckOut = new Date(checkOutDate);

  // Check if parsing was successful (avoid invalid dates)
  if (isNaN(parsedCheckIn.getTime()) || isNaN(parsedCheckOut.getTime())) {
    return "Invalid date format. Please use YYYY-MM-DD.";
  }

  // Calculate the difference in milliseconds and convert to days
  const differenceInMs = parsedCheckOut.getTime() - parsedCheckIn.getTime();
  const days = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  // Handle negative result (check-out before check-in)
  if (days < 0) {
    return "Check-out date cannot be before check-in date.";
  }

  return days;
}
export default calculateNumberOfDays;
