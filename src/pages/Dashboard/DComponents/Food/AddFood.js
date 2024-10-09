import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "../../AdminLayout/AdminLayout";
import LoadingSpinner from "@/pages/Utils/LoadingSpinner";

const AddFood = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    // Imgbb API to upload the image
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const imgResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=d1fbaa0b9f043f285b08e6d997b387ef`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgResult = await imgResponse.json();
      if (imgResult.success) {
        const imageUrl = imgResult.data.url;

        // Call your backend API to store food data
        const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/foods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            image: imageUrl, // Store the image URL from imgbb
          }),
        });

        const result = await response.json();
        if (response.ok) {
          setSuccess("Food added successfully!");
        } else {
          setError("Failed to add food.");
        }
      } else {
        setError("Image upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while adding the food.");
    }

    setLoading(false);
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-lg mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Add New Food</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option disabled value="">Select Category</option>
            <option value="Hen">Hen</option>
            <option value="Beef">Beef</option>
            <option value="Fish">Fish</option>
            <option value="Drinks">Drinks</option>
            <option value="Ice Creem">Ice Creem</option>
          </select>
          {errors.category && (
            <p className="text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Food Name</label>
          <input
            type="text"
            {...register("foodName", { required: "Food name is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.foodName && (
            <p className="text-red-600">{errors.foodName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required", min: 1 })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.price && (
            <p className="text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">
            How Many People Can Share
          </label>
          <input
            type="number"
            {...register("people", {
              required: "Please specify the number of people",
              min: 1,
            })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.people && (
            <p className="text-red-600">{errors.people.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.image && (
            <p className="text-red-600">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition ${
            loading && "opacity-50"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Food"}
        </button>

        {/* Success or Error Messages */}
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

AddFood.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AddFood;
