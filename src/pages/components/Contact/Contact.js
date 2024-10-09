import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess("Message sent successfully!");
        reset(); // Reset form after successful submission
      } else {
        setError(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col justify-center items-center p-4">
      <Head>
        <title>Contact Us</title>
      </Head>

      <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
        Get in Touch with Us
      </h1>
      <p className="text-gray-700 text-center mb-10 max-w-2xl">
        We would love to hear from you! Fill out the form below and we’ll get
        back to you as soon as possible!
      </p>

      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-800 font-semibold">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-800 font-semibold"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          {/* Phone Input */}
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-800 font-semibold"
            >
              Your Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <p className="text-red-500">Phone number is required</p>
            )}
          </div>

          {/* Location Input */}
          <div className="mb-6">
            <label
              htmlFor="location"
              className="block text-gray-800 font-semibold"
            >
              Your Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your location"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <p className="text-red-500">Location is required</p>
            )}
          </div>

          {/* Comment Input */}
          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block text-gray-800 font-semibold"
            >
              Comment
            </label>
            <textarea
              id="comment"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter your comment"
              {...register("comment", { required: true })}
            ></textarea>
            {errors.comment && (
              <p className="text-red-500">Comment is required</p>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition duration-200"
          >
            {loading ? "Message sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
