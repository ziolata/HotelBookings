function calculateNumberOfDays(checkInDate, checkOutDate) {
  const parsedCheckIn = new Date(checkInDate);
  const parsedCheckOut = new Date(checkOutDate);
  if (isNaN(parsedCheckIn.getTime()) || isNaN(parsedCheckOut.getTime())) {
    return "Please select checkin date and checkout date.";
  }
  const differenceInMs = parsedCheckOut.getTime() - parsedCheckIn.getTime();
  const days = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  // Handle negative result (check-out before check-in)
  if (days < 0) {
    return "Checkout date cannot be less than check in date.";
  }
  return days;
}
export default calculateNumberOfDays;
