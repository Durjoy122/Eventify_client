import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from "../../assets/logo.jpg";

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/auth/login"))
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm px-6 py-3 flex justify-between items-center relative z-50 transition-colors duration-300">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Eventify Logo"
          className="w-10 h-10 object-cover rounded-full"
        />
        <span className="text-2xl font-bold text-green-600 dark:text-green-400 tracking-wide">
          Eventify
        </span>
      </Link>

      {/* ====== Desktop Links ====== */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 dark:text-green-400 font-semibold"
              : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 dark:text-green-400 font-semibold"
              : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
          }
        >
          Upcoming Events
        </NavLink>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 rounded-full p-2 shadow-md text-gray-700 dark:text-yellow-400 bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>

        {/* Login / Profile */}
        {!user ? (
          <Link
            to="/auth/login"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-500 transition"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL || "https://i.ibb.co/0Jmshvb/avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden transition-colors duration-300"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="px-4 py-2 bg-green-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium text-sm border-b dark:border-gray-700">
                  {user.displayName || "User"}
                </div>

                <Link
                  to="/create-event"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                >
                  Create Event
                </Link>

                <Link
                  to="/manage-event"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                >
                  Manage Events
                </Link>

                <Link
                  to="/join-event"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                >
                  Joined Events
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm border-t dark:border-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ====== Mobile Menu Button ====== */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-400"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-gray-700 dark:text-gray-300"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ====== Mobile Menu (Dropdown) ====== */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 flex flex-col items-center gap-4 py-6 border-t dark:border-gray-700 md:hidden">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            Home
          </NavLink>

          <NavLink
            to="/upcoming"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            Upcoming Events
          </NavLink>

          {!user ? (
            <Link
              to="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-500 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/create-event"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              >
                Create Event
              </Link>
              <Link
                to="/manage-event"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              >
                Manage Events
              </Link>
              <Link
                to="/join-event"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              >
                Joined Events
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;