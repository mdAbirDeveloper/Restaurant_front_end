import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Validate phone format
  const validatePhone = (phone) => {
    const phoneRegex = /^01\d{9}$/; // Phone must start with 01 and be 11 digits long
    return phoneRegex.test(phone);
  };

  const onSubmit = async (data) => {
    const { name, phone, email, password, address } = data;
    setError("");
    setSuccess(false);
    setLoading(true);

    // Check phone format manually (even though react-hook-form validation handles it too)
    if (!validatePhone(phone)) {
      setError("Phone number must start with 01 and be 11 digits long.");
      setLoading(false);
      return;
    }

    try {
      // Prepare the user data
      const userData = {
        name,
        phone,
        email: email || null, // Email is optional
        password,
        address: address || null, // Address is optional
      };

      // If phone is not a duplicate, proceed to create the new user
      const signupResponse = await fetch("https://full-start-rastaurant-back-end.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const signupData = await signupResponse.json();

      if (signupResponse.ok) {
        setSuccess(true);
        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(signupData));
        router.reload(); // Reset the form fields after successful signup
      } else {
        setError(signupData.message || "Error signing up. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg text-black"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Signup</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^01\d{9}$/,
                message:
                  "Phone number must start with 01 and be 11 digits long",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Email (Optional) */}
        <div className="mb-4">
          <label className="block text-gray-700">Email (Optional)</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })} // Using react-hook-form
              className="w-full p-2 border rounded"
              required
            />
            {/* Button to toggle password visibility */}
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Address (Optional) */}
        <div className="mb-4">
          <label className="block text-gray-700">Address (Optional)</label>
          <input
            type="text"
            {...register("address")}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Success Message */}
        {success && (
          <p className="text-green-500 text-center mb-4">Signup successful!</p>
        )}

        {/* Submit Button */}
        {user?.phone ? (
          <button
          disabled
            className="w-full bg-blue-300 text-white py-2 px-4 rounded mt-2"
          >
            Already SignUp
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        )}

        <div>
          <p>
            {"Already have an account?"}{" "}
            <Link href="/components/LogIn/Login" className="text-blue-400">
              LogIn
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
