import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Company Info */}
        <div className="ml-2">
          <h2 className="text-2xl font-semibold mb-4">Code Shine Technology</h2>
          <p className="mb-4">
            We provide web development services including React.js, Next.js, Node.js, and MongoDB. Let us help you build your next project.
          </p>
          <p className="text-sm text-gray-400">&copy; 2024 Code Shine Technology. All rights reserved.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="ml-2">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/components/Menu/Menu" className="hover:text-blue-400 transition-colors">
                Foods
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/components/Booking/Booking" className="hover:text-blue-400 transition-colors">
                Booking
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/components/Contact/Contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="ml-2">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <FaFacebook className="text-2xl hover:text-3xl ml-2 text-blue-700 bg-white rounded-full" />
            <FaInstagram className="text-2xl hover:text-3xl ml-2 text-red-400" />
            <FaTwitter className="text-2xl hover:text-3xl ml-2 text-blue-800" />
            <FaWhatsapp className="text-2xl hover:text-3xl ml-2 text-green-600" />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400">
        <p>Developed by Code Shine Technology</p>
      </div>
    </footer>
  );
};

export default Footer;
