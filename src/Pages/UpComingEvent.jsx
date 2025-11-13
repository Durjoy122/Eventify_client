import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.jpg';
import Loading from '../layouts/Components/loading.jsx';

const UpComingEvent = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async (searchText = "", selectedType = "All") => {
    setLoading(true);
    try {
        const res = await axios.get("https://eventify-server-sigma.vercel.app/events", {
          params: { search: searchText, type: selectedType },
        });
        setEvents(res.data);
    } 
    catch (error) {
        console.error("Failed to fetch events:", error);
    } 
    finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(search, type);
  };

  const handleFilterChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    fetchEvents(search, newType);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <h2 className="flex items-center justify-center text-3xl font-bold mb-10 gap-3">
        <img 
          src={Logo} 
          alt="Logo" 
          className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-gray-200 dark:border-gray-600" 
        />
        <span>Upcoming <span className="text-pink-500">Events</span></span>
      </h2>

      {/* Search + Filter Controls */}
      <form 
        onSubmit={handleSearch} 
        className="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-3"
      >
        <input 
          type="text"
          placeholder="Search by event name..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          value={type} 
          onChange={handleFilterChange} 
          className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="All">All Types</option>
          <option value="Cleanup">Cleanup</option>
          <option value="Plantation">Plantation</option>
          <option value="Donation">Donation</option>
        </select>
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <Loading />}

      {/* Event Grid */}
      {!loading && events.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-xl overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-600 transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="h-56 w-full object-cover rounded-xl"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md dark:shadow-gray-700">
                  {event.eventType}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">
                  {event.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 flex items-center">
                  📍 <span className="ml-1">{event.location}</span>
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center">
                  📅 <span className="ml-1">{new Date(event.eventDate).toLocaleDateString()}</span>
                </p>

                <div className="mt-auto">
                  <button
                    onClick={() => navigate(`/eventDetails/${event._id}`)}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600"
                  >
                    View Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpComingEvent;