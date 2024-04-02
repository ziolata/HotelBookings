function calculateNumberOfDays(checkInDate, checkOutDate) {
  const parsedCheckIn = new Date(checkInDate);
  const parsedCheckOut = new Date(checkOutDate);
  if (isNaN(parsedCheckIn.getTime()) || isNaN(parsedCheckOut.getTime())) {
    return "Vui lòng chọn ngày checkin và ngày checkout.";
  }
  const differenceInMs = parsedCheckOut.getTime() - parsedCheckIn.getTime();
  const days = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  // Handle negative result (check-out before check-in)
  if (days < 0) {
    return "Ngày checkout không thể nhỏ hơn ngày checkin.";
  }
  return days;
}
export default calculateNumberOfDays;
