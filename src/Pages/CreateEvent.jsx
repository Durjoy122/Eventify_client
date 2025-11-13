import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Provider/AuthProvider";
import Logo from '../assets/logo.jpg';
import api from "../api"; // <-- Use the HTTPS Axios instance

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState(null);

  if (!user?.email) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "You must be logged in to create an event."
    });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventDate || eventDate < new Date()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Please select a future date!",
      });
      return;
    }

    const newEvent = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
      userEmail: user.email,
    };

    try {
      const res = await api.post("/events", newEvent); // <-- HTTPS Axios

      if (res.data.insertedId || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Event Created",
          text: "Your event has been created successfully!",
        }).then(() => navigate("/upcoming"));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `Something went wrong. Please try again. ${error.message}`,
      });
    }
  };

  // -------------------------
  // Keep your original layout exactly as it was
  // -------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-700 rounded-2xl w-full max-w-3xl p-10 transition-all duration-300 hover:shadow-3xl dark:hover:shadow-gray-600">
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="Logo" className="w-24 h-24 rounded-full object-cover mb-4 shadow-md dark:shadow-gray-700 border-2 border-gray-200 dark:border-gray-600"/>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">Create Event</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
            Fill in the details below to create your event. Only future dates are allowed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Event Title</label>
            <input
              type="text"
              placeholder="Enter your event title"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Description</label>
            <textarea
              placeholder="Briefly describe your event..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Event Type</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              required
            >
              <option value="">Select Event Type</option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
            </select>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Thumbnail Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Location</label>
            <input
              type="text"
              placeholder="Event location"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Event Date</label>
            <DatePicker
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              minDate={new Date()}
              placeholderText="Select event date"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600 transition-all duration-300"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
