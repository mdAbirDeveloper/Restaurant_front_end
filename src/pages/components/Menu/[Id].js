/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const FoodDetail = () => {
  const router = useRouter();
  const { Id } = router.query;

  const [food, setFood] = useState(null); // Food data
  const [user, setUser] = useState(null); // User data from localStorage
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [totalPrice, setTotalPrice] = useState(0); // Total price based on quantity
  const [loading, setLoading] = useState(false); // Loading state
  const [orderSuccess, setOrderSuccess] = useState(null); // Success message
  const [orderError, setOrderError] = useState(null); // Error message

  // Fetch user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  // Fetch food data by Id
  useEffect(() => {
    const fetchFood = async () => {
      if (Id) {
        try {
          const response = await fetch(`https://full-start-rastaurant-back-end.vercel.app/api/foods/${Id}`);
          const data = await response.json();
          setFood(data);
          setTotalPrice(parseFloat(data.price)); // Initialize total price
        } catch (error) {
          console.error("Error fetching food:", error);
        }
      }
    };
    fetchFood();
  }, [Id]);

  // Handle Order Button Click
  const handleOrder = async () => {
    if (!user) return;

    setLoading(true);
    setOrderSuccess(null);
    setOrderError(null);

    const orderData = {
      foodName: food.foodName,
      foodTitle: food.title,
      foodPrice: food.price,
      userId: user.userId,
      userName: user.name,
      userPhone: user.phone,
      quantity,
      totalPrice,
    };

    try {
      const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        setOrderSuccess("Order placed successfully!");
      } else {
        setOrderError("Failed to place order. Please try again.");
      }
    } catch (error) {
      setOrderError("An error occurred while placing the order.");
    }

    setLoading(false);
  };

  // Handle quantity increment
  const incrementQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      setTotalPrice(parseFloat(food.price) * newQuantity);
      return newQuantity;
    });
  };

  // Handle quantity decrement (minimum is 1)
  const decrementQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        setTotalPrice(parseFloat(food.price) * newQuantity);
        return newQuantity;
      }
      return prev;
    });
  };

  return (
    <div className="container mx-auto p-6">
      {food ? (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Side: Food Image */}
          <div className="md:w-1/2">
            <img
              src={food.image}
              alt={food.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Food Info */}
          <div className="md:w-1/2 p-6 my-auto">
            <h1 className="text-3xl font-bold text-gray-700 mb-2">
              {food.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{food.name}</p>
            <p className="text-lg text-gray-600 mb-4">{food.title}</p>
            <p className="text-lg text-gray-600 mb-4">
              Category: {food.category}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Price: ${totalPrice.toFixed(2)}
            </p>

            {/* Quantity Control */}
            <div className="flex items-center space-x-4 mb-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={decrementQuantity}
                disabled={quantity === 1} // Disable if quantity is 1
              >
                -
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>

            {/* Conditionally render buttons */}
            {user ? (
              <button
                onClick={handleOrder}
                className={`w-full ${
                  loading ? "bg-gray-400" : "bg-blue-500"
                } text-white px-4 py-2 rounded-md hover:bg-blue-600 transition`}
                disabled={loading}
              >
                {loading ? "Ordering..." : "Cash on Delivery"}
              </button>
            ) : (
              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => router.push("/components/LogIn/Login")}
              >
                Login First to Order
              </button>
            )}

            {/* Display order success or error message */}
            {orderSuccess && (
              <p className="text-green-600 text-center mt-4">{orderSuccess}</p>
            )}
            {orderError && (
              <p className="text-red-600 text-center mt-4">{orderError}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading food details...</p>
      )}
    </div>
  );
};

export default FoodDetail;
