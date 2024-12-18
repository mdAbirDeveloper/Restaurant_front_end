import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  if (!user || user?.phone !== "01832822560") {
    return (
      <div className=" flex items-center justify-center bg-gray-100 text-center p-4 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-red-500">
            Access Denied
          </h1>
          <p className="text-lg text-gray-700">
            You do not have permission to view this page. Please contact the
            administrator if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const offMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="max-w-[1200px] mx-auto  text-green-500 bg-slate-100 min-h-screen">
      <div className="md:flex block">
        <div className="w-52 shadow-md p-2  hidden md:block">
          <ul>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/Dashboard/DComponents/Users/Users"}>Users</Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/Dashboard/DComponents/Booking/Booking"}>
                Booking
              </Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/Dashboard/DComponents/Food/AddFood"}>Add Food</Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/Dashboard/DComponents/Food/AllFood"}>All Food</Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/Dashboard/DComponents/Orders/Orders"}>Orders</Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/Dashboard/DComponents/Messages/Messages"}>
                Messages
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:hidden block">
          <button onClick={toggleMenu} className="mt-2 ml-2">
            {menuOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </button>
          {menuOpen && (
            <ul className="shadow-md p-2">
              <Link href={"/Dashboard/DComponents/Users/Users"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Users
                </li>
              </Link>
              <Link href={"/Dashboard/DComponents/Booking/Booking"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Booking
                </li>
              </Link>
              <Link href={"/Dashboard/DComponents/Food/AddFood"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Add Food
                </li>
              </Link>
              <Link href={"/Dashboard/DComponents/Food/AllFood"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  All Food
                </li>
              </Link>
              <Link href={"/Dashboard/DComponents/Orders/Orders"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Orders
                </li>
              </Link>
              <Link href={"/Dashboard/DComponents/Messages/Messages"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Messages
                </li>
              </Link>
            </ul>
          )}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
