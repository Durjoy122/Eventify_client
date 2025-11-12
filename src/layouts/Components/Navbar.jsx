import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from '../../assets/logo.jpg';


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/auth/login"))
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center relative z-50">
        <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Social Events Logo" className="w-10 h-10 object-cover rounded-full" />
            <span className="text-2xl font-bold text-green-600 tracking-wide">
                Eventify
            </span>
        </Link>

      {/* Menu */}
      <div className="flex items-center gap-6">
            <NavLink to="/"
                className={({ isActive }) =>
                    isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-700 hover:text-green-600 transition"
                }
                >
                Home
            </NavLink>

           <NavLink to="/upcoming" className={({ isActive }) =>
                isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-700 hover:text-green-600 transition"
                }
                >
                Upcoming Events
            </NavLink>

        {/* Conditional Login/Logout */}
        {!user ? (
          <Link to="/auth/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Login   
          </Link>
        ) : (
          <div className="relative">
            {/* Profile section */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
                >
                {
                    user?.photoURL ? (
                        <img
                            src={user.photoURL || "https://i.ibb.co/0Jmshvb/avatar.png"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                    ) : 
                    (
                        <FaUserCircle className="text-3xl text-gray-600" />
                    )
                } 
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
                <div
                    className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-lg overflow-hidden"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <div className="px-4 py-2 bg-green-50 text-gray-800 font-medium text-sm border-b">
                    {user.displayName || "User"}
                    </div>
                    <Link
                        to="/create-event"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                    >
                        Create Event
                    </Link>
                    <Link
                        to="/manage-event"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                        >
                        Manage Events
                    </Link>
                    <Link
                        to="/join-event"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                        >
                        Joined Events
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 text-sm border-t"
                    >
                        Logout
                    </button>
                </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;