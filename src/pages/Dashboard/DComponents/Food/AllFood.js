/* eslint-disable @next/next/no-img-element */
import React from "react";
import AdminLayout from "../../AdminLayout/AdminLayout";

import { useQuery, useMutation, useQueryClient } from "react-query";
import LoadingSpinner from "@/pages/Utils/LoadingSpinner";

const fetchFoods = async () => {
  const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/api/foods");
  if (!response.ok) {
    throw new Error("Failed to fetch food items");
  }
  return response.json();
};

const AllFood = () => {
  const queryClient = useQueryClient();

  // Fetch all food items
  const {
    data: foods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  // Delete food item
  const deleteFood = useMutation(
    async (id) => {
      const response = await fetch(`https://full-start-rastaurant-back-end.vercel.app/api/foods/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete food item");
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries("foods"),
    }
  );

// Handle Delete Button Click
const handleDelete = (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this food item?");
  if (confirmed) {
    deleteFood.mutate(id); // Proceed with deletion if user confirms
  }
};


if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching food items.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Food Items</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md text-sm md:text-base">
          <thead>
            <tr className="border bg-gray-100">
              <th className="border py-2 px-4 text-left">Category</th>
              <th className="border py-2 px-4 text-left">Name</th>
              <th className="border py-2 px-4 text-left">Title</th>
              <th className="border py-2 px-4 text-left">Image</th>
              <th className="border py-2 px-4 text-left">Price</th>
              <th className="border py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="hover:bg-gray-50">
                <td className="border py-2 px-4 text-center">
                  {food.category}
                </td>
                <td className="border py-2 px-4 text-center">
                  {food.foodName}
                </td>
                <td className="border py-2 px-4 text-center">{food.title}</td>
                <td className="border py-2 px-4 text-center">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="border py-2 px-4 text-center">{food.price}</td>
                <td className="border py-2 px-4 text-center">
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFood;

AllFood.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
