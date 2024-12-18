import React from 'react';
import AdminLayout from './AdminLayout';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 to-yellow-200 p-6">
      <header className="bg-white shadow-lg rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Restaurant Dashboard</h1>
        <p className="text-gray-600">Manage your restaurant effortlessly with real-time updates and insights.</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Todays Bookings</h2>
          <p className="text-gray-500 mb-4">Stay updated with the latest bookings.</p>
          <span className="block text-4xl font-bold text-green-500">42</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total Sales</h2>
          <p className="text-gray-500 mb-4">Track your revenue at a glance.</p>
          <span className="block text-4xl font-bold text-yellow-500">$1,250</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Popular Menu Item</h2>
          <p className="text-gray-500 mb-4">Discover whats trending today.</p>
          <span className="block text-4xl font-bold text-red-500">Grilled Salmon</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center md:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pending Orders</h2>
          <p className="text-gray-500 mb-4">Check the orders that need your attention.</p>
          <span className="block text-4xl font-bold text-blue-500">8</span>
        </div>

        {/* Card 5 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Overall Feedback</h2>
          <p className="text-gray-500 mb-4">Monitor customer satisfaction.</p>
          <span className="block text-4xl font-bold text-purple-500">4.7 / 5</span>
        </div>
      </main>

      <footer className="mt-6 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Your Restaurant Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

