/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // Success message
  const [serverError, setServerError] = useState(null); // Error message

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess(null);
    setServerError(null);

    try {
      const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, date }), // Send form data and selected date
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess("Booking submitted successfully!");
        reset();
      } else {
        setServerError("Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setServerError("An error occurred while submitting your booking.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto bg-slate-50">
      <div className="flex flex-col md:flex-row bg-white  overflow-hidden max-w-[1000px] mx-auto">
        {/* Left Side Image */}
        <div className="md:w-1/2 h-auto my-auto">
          <img
            src="/booking.png"
            alt="Restaurant"
            className="w-full"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Book a Table
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-black"
          >
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^01\d{9}$/,
                    message:
                      "Phone number must start with 01 and be exactly 11 digits",
                  },
                })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.phone && (
                <p className="text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">People</label>
              <input
                type="number"
                {...register("people", {
                  required: "Number of people is required",
                  min: 1,
                })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.people && (
                <p className="text-red-600">{errors.people.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Time</label>
              <div className="flex space-x-2">
                <select
                  {...register("timeHour", {
                    required: "Time hour is required",
                  })}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  {...register("timePeriod", {
                    required: "AM/PM is required",
                  })}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              {errors.timeHour && (
                <p className="text-red-600">{errors.timeHour.message}</p>
              )}
              {errors.timePeriod && (
                <p className="text-red-600">{errors.timePeriod.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Date</label>
              <div className="relative">
                <DatePicker
                  required
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholderText="Select a date"
                  minDate={new Date()} // Prevent selecting past dates
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                {...register("message")}
                className="w-full px-4 py-2 border rounded-md"
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-blue-500"
              } text-white px-4 py-2 rounded-md hover:bg-blue-600 transition`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>

            {success && <p className="text-green-600 text-center">{success}</p>}
            {serverError && (
              <p className="text-red-600 text-center">{serverError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
