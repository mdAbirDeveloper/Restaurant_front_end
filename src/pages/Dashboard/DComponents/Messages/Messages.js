import LoadingSpinner from "@/pages/Utils/LoadingSpinner";
import AdminLayout from "../../AdminLayout/AdminLayout";

import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]); // Messages state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch messages from the backend
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/api/messages");
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError("An error occurred while fetching messages.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a message
  const deleteMessage = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (confirm) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://full-start-rastaurant-back-end.vercel.app/api/messages/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg._id !== id)
          );
        } else {
          setError("Failed to delete the message.");
        }
      } catch (err) {
        setError("An error occurred while deleting the message.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Messages</h1>

      {loading && <LoadingSpinner></LoadingSpinner>}
      {error && <p className="text-red-500">{error}</p>}

      {messages.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Comment</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message._id} className="border-t border-gray-200">
                  <td className="py-3 px-6">{message.name}</td>
                  <td className="py-3 px-6">{message.email}</td>
                  <td className="py-3 px-6">{message.comment}</td>
                  <td className="py-3 px-6">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteMessage(message._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No messages found.</p>
      )}
    </div>
  );
};

export default Messages;

Messages.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
