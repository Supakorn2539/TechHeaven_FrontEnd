import axios from "axios";

export const createBooking = async (token, data) => {
  return await axios.post(
    "http://localhost:8000/booking/create-booking",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllBookings = async () => {
  return await axios.get("http://localhost:8000/booking/get-all-bookings/")
}

export const getBookingByUserId = async (token) => {
    return await axios.get("http://localhost:8000/booking/get-booking-by-user-id/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const updateBooking = async (token, id, data) => {
    return await axios.patch("http://localhost:8000/booking/update-booking/"+id, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}