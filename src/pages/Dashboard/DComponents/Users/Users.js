import { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout/AdminLayout";
import LoadingSpinner from "@/pages/Utils/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-green-400 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {users?.slice().reverse().map((user) => (
              <tr
                key={user._id}
                className="even:bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <td className="px-4 py-2 border-t">{user.name}</td>
                <td className="px-4 py-2 border-t">{user.email || "N/A"}</td>
                <td className="px-4 py-2 border-t">{user.phone}</td>
                <td className="px-4 py-2 border-t">{user.address || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

Users.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
