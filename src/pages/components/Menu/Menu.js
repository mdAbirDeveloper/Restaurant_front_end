/* eslint-disable @next/next/no-img-element */
import LoadingSpinner from "@/pages/Utils/LoadingSpinner";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Fetch all menu items on mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://full-start-rastaurant-back-end.vercel.app/menu"
        );
        const data = await response.json();
        setMenuItems(data);
        setFilteredItems(data); // Show all menu items initially
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();

    setLoading(false);
  }, []);

  // Handle category filtering
  const handleCategoryClick = (category) => {
    setLoading(false);
    setSelectedCategory(category);
    setShowAll(false); // Reset showAll when switching categories

    if (category === "All") {
      setLoading(false);
      setFilteredItems(menuItems); // Show all items if "All" is selected
    } else {
      const filtered = menuItems.filter((item) => item.category === category);
      setFilteredItems(filtered); // Filter by category
      setLoading(false);
    }
  };

  const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, 6);

  // Categories based on backend categories
  const categories = ["All", "Hen", "Beef", "Fish", "Drinks", "Ice Creem"];

 

  return (
    <div className="bg-gray-100 py-12 min-h-screen">
      <div className="text-center mb-8">
        <h3 className="text-yellow-500 text-lg font-semibold">Our Menu</h3>
        <h2 className="text-3xl font-bold text-gray-800">Delicious Choices</h2>
      </div>

      {/* Category Menu */}
      <div className="flex justify-center space-x-6 mb-10 text-gray-600 text-lg">
        {categories.map((category) => (
          <button
            key={category}
            className={`${
              selectedCategory === category
                ? "text-yellow-500 font-bold underline"
                : "hover:text-yellow-500"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        { loading && <LoadingSpinner></LoadingSpinner>}
        {itemsToShow.map((item) => (
          <div
            key={item._id}
            className="relative bg-white text-black border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>

            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-green-600">
                {item.price} Taka
              </span>
              <span
                className={`text-sm font-medium ${
                  item.isAvailable ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.isAvailable ? "Available" : "Not Available"}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                {item.people} {item.people > 1 ? "people" : "person"}
              </span>
            </div>

            <div className="flex justify-between">
              <button className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <Link href={`/components/Menu/${item._id}`}>
                <button className="text-blue-500 text-xl hover:text-blue-700 transition-colors duration-200">
                  <FaShoppingCart />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {filteredItems.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
