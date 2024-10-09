import { useState, useEffect } from "react";

const Order = () => {
  const [user, setUser] = useState(null); // User data from localStorage
  const [orders, setOrders] = useState([]); // Orders state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [deleting, setDeleting] = useState(false); // Deleting state

  // Fetch user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  // Fetch orders based on userId
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `https://full-start-rastaurant-back-end.vercel.app/api/orders/${user.userId}`
          );
          const data = await response.json();
          setOrders(data);
        } catch (err) {
          setError("An error occurred while fetching orders.");
        }

        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Handle order deletion
  const handleDelete = async (orderId) => {
    const confirm = window.confirm("are you sure about delete?");
    if (confirm) {
      setDeleting(true);
      setError(null);

      try {
        const response = await fetch(
          `https://full-start-rastaurant-back-end.vercel.app/api/order/${orderId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Remove the order from the state after successful deletion
          setOrders(orders.filter((order) => order._id !== orderId));
        } else {
          setError("Failed to delete order. Please try again.");
        }
      } catch (err) {
        setError("An error occurred while deleting the order.");
      }
      setDeleting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Orders</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6 text-left">Food Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Total Price</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders
                ?.slice()
                .reverse()
                .map((order) => (
                  <tr key={order._id} className="border-t border-gray-200">
                    <td className="py-3 px-6">{order.foodName}</td>
                    <td className="py-3 px-6">{order.foodPrice}</td>
                    <td className="py-3 px-6">{order.quantity}</td>
                    <td className="py-3 px-6">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-6">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        onClick={() => handleDelete(order._id)}
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default Order;
