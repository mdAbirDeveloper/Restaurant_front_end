import React from "react";
import AdminLayout from "../../AdminLayout/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "react-query";
import LoadingSpinner from "@/pages/Utils/LoadingSpinner";

const fetchBookings = async () => {
  const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/api/bookings");
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
};

const Booking = () => {
  const queryClient = useQueryClient();

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  const approveBooking = useMutation(
    async (id) => {
      const response = await fetch(
        `https://full-start-rastaurant-back-end.vercel.app/api/bookings/${id}/approve`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isApprove: true }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to approve booking");
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries("bookings"),
    }
  );

  const cancelBooking = useMutation(
    async (id) => {
      const response = await fetch(
        `https://full-start-rastaurant-back-end.vercel.app/api/bookings/${id}/approve`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isApprove: false }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries("bookings"),
    }
  );

  const deleteBooking = useMutation(
    async (id) => {
      const response = await fetch(`https://full-start-rastaurant-back-end.vercel.app/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries("bookings"),
    }
  );

  const handleApprove = (id) => {
    approveBooking.mutate(id);
  };

  const handleCancel = (id) => {
    cancelBooking.mutate(id);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (confirmed) {
      deleteBooking.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching bookings.</p>;

  const unapprovedBookings = bookings.filter((booking) => !booking.isApprove);
  const approvedBookings = bookings.filter((booking) => booking.isApprove);

  const sortByDate = (bookings) => {
    return bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="p-4">
      {/* Unapproved Bookings Table */}
      <h2 className="text-xl font-semibold mb-4">Pending Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md mb-8 text-sm md:text-base">
          <thead>
            <tr className="border bg-gray-100">
              <th className="border py-2 px-4 text-left">Name</th>
              <th className="border py-2 px-4 text-left">Phone</th>
              <th className="border py-2 px-4 text-left">Date</th>
              <th className="border py-2 px-4 text-left">Time</th>
              <th className="border py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortByDate(unapprovedBookings).map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="border py-2 px-4 text-center">{booking.name}</td>
                <td className="border py-2 px-4 text-center">
                  {booking.phone}
                </td>
                <td className="border py-2 px-4 text-center">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="border py-2 px-4 text-center">{booking.time}</td>
                <td className="border py-2 px-4 text-center">
                  <div className="flex justify-around">
                    <button
                      onClick={() => handleApprove(booking._id)}
                      className="bg-green-500 text-white py-1 px-2 rounded-md mx-2 w-full"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md mx-2 w-full"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Approved Bookings Table */}
      <h2 className="text-xl font-semibold mb-4">Approved Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md text-sm md:text-base">
          <thead>
            <tr className="border bg-gray-100">
              <th className="border py-2 px-4 text-left">Name</th>
              <th className="border py-2 px-4 text-left">Phone</th>
              <th className="border py-2 px-4 text-left">Date</th>
              <th className="border py-2 px-4 text-left">Time</th>
              <th className="border py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortByDate(approvedBookings).map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="border py-2 px-4 text-center">{booking.name}</td>
                <td className="border py-2 px-4 text-center">
                  {booking.phone}
                </td>
                <td className="border py-2 px-4 text-center">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="border py-2 px-4 text-center">{booking.time}</td>
                <td className="border py-2 px-4 text-center">
                  <div className="flex justify-around">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded-md mx-2 w-full"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md mx-2 w-full"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;

Booking.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
