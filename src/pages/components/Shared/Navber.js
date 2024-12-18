/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// components/Navbar.js

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/components/LogIn/Login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-100 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="">
          <img src="/logo.png" className="w-20 ml-2" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 ">
          <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
            <Link
              href="/"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Home
            </Link>
          </li>
          <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
            <Link
              href="/components/About/About"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              About
            </Link>
          </li>
          <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
            <Link
              href="/components/Menu/Menu"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Foods
            </Link>
          </li>
          {/* <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
            <Link
              href="/components/Gallery/Gallery"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Gallery
            </Link>
          </li> */}
          <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
            <Link
              href="/components/Contact/Contact"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Contact
            </Link>
          </li>
          <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
            <Link
              href="/components/Booking/Booking"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Booking
            </Link>
          </li>
          {user?.phone && (
            <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
              <Link
                href="/components/Order/Order"
                className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
              >
                Orders
              </Link>
            </li>
          )}
          {user?.name && user?.phone == "01832822560" && (
            <>
              <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
                <Link
                  href="/Dashboard/AdminLayout"
                  className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
          {user?.phone ? (
            <>
              <li onClick={handleLogout} className="bg-yellow-400 px-4 py-2 rounded font-bold">
                <Link
                  href="/components/LogIn/Login"
                  className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
                >
                  SignOut
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="bg-yellow-400 px-4 py-2 rounded font-bold">
                <Link
                  href="/components/LogIn/Login"
                  className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
                >
                  SignIn
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden mr-2">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {/* Hamburger Icon */}
            <div className={`space-y-1`}>
              <span
                className={`block w-6 h-0.5 bg-white transform transition ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transform transition ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex-col md:hidden space-y-4 bg-yellow-600 p-4">
          <Link
            onClick={closeMenu}
            href="/"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <li className="border text-center py-2 rounded-lg  mt-2">Home</li>
          </Link>
          <Link
            onClick={closeMenu}
            href="/components/About/About"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <li className="border text-center py-2 rounded-lg  mt-2">About</li>
          </Link>
          <Link
            onClick={closeMenu}
            href="/components/Menu/Menu"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <li className="border text-center py-2 rounded-lg  mt-2">Foods</li>
          </Link>
          {/* <Link
            onClick={closeMenu}
            href="/components/Gallery/Gallery"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <li className="border text-center py-2 rounded-lg  mt-2">
              Gallery
            </li>
          </Link> */}
          <Link
            onClick={closeMenu}
            href="/components/Contact/Contact"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <li className="border text-center py-2 rounded-lg  mt-2">
              Contact
            </li>
          </Link>
          <Link
            onClick={closeMenu}
            href="/components/Gallary/Gallary"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <li className="border text-center py-2 rounded-lg  mt-2">
              Gallary
            </li>
          </Link>
          <Link
            onClick={closeMenu}
            href="/components/Booking/Booking"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <li className="border text-center py-2 rounded-lg  mt-2">
              Booking
            </li>
          </Link>
          {user?.phone ? (
            <>
              <Link
                onClick={closeMenu}
                href="/Dashboard/AdminLayout"
                className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
              >
                <li className="border text-center py-2 rounded-lg  mt-2">
                  Dashboard
                </li>
              </Link>
              <Link
                onClick={() => {
                  closeMenu(), handleLogout();
                }}
                href="/components/LogIn/Login"
                className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
              >
                <li className="border text-center py-2 rounded-lg  mt-2">
                  SignOut
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={closeMenu}
                href="/components/LogIn/Login"
                className="text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110"
              >
                <li className="border text-center py-2 rounded-lg  mt-2">
                  SignIn
                </li>
              </Link>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
