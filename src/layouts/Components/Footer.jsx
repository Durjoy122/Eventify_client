import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-1">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Eventify Logo" 
              className="w-10 h-10 object-cover rounded-full" 
            />
            <h2 className="text-2xl font-bold text-white">Eventify</h2>
          </div>
          <p className="mt-2 text-sm">
            Discover, create, and manage amazing events effortlessly.
          </p>
        </div>

        {/* Center Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                 Home
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="hover:text-white">
                 Upcoming Events
              </Link>
            </li>
            <li>
              <Link to="/create-event" className="hover:text-white">
                 Create Event
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p>Email: support@eventify.com</p>
            <p>Phone: +880 1234-567890</p>
            <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
         © {new Date().getFullYear()} Eventify — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;