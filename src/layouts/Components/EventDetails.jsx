import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Logo from '../../assets/logo.jpg';

const EventDetails = () => {
    const { user } = useContext(AuthContext);
    const event = useLoaderData();

    const handleJoinEvent = async () => {
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please log in to join this event.",
            });
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/joinEvent", {
                eventId: event._id,
                user: {
                    name: user.displayName,
                    email: user.email,
                },
            });
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Joined Successfully!",
                    text: `You have joined ${event.title}.`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to join event",
                text: error.response?.data?.message || error.message,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-16 px-6 transition-colors duration-300">
            <div className="text-center mb-12 max-w-3xl">
                <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
                    Join The Event & Make a <span className="text-green-600 dark:text-green-400">Contribution</span> for a Better World
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Participate, connect, and create a positive impact together.
                </p>
            </div>

            {/* Event Card Section */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl dark:shadow-lg rounded-3xl p-12 max-w-7xl w-full grid md:grid-cols-2 gap-12 transition-colors duration-300">
                {/* Left side — Event Info */}
                <div className="flex flex-col justify-center">
                    {/* Logo + Date */}
                    <div className="flex items-center gap-6 mb-8">
                        <img
                            src={Logo}
                            alt="Event Logo"
                            className="w-28 h-28 rounded-full object-cover shadow-lg dark:shadow-gray-700 border-2 border-gray-200 dark:border-gray-600"
                        />
                        <div>
                            {/* Dark mode added */}
                            <h3 className="text-purple-700 dark:text-purple-400 text-xl font-semibold uppercase tracking-wide">
                                {new Date(event.eventDate).toLocaleDateString()}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-100 text-sm font-medium px-4 py-1 rounded-full">
                                    Physical Event
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Time + Location */}
                    <div className="mb-6">
                        <p className="text-gray-700 dark:text-gray-200 text-lg font-medium mb-1">🕒 1:00pm – 3:00pm</p>
                        <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">📍 {event.location}</p>
                    </div>

                    {/* Title + Description */}
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{event.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-justify">{event.description}</p>
                    </div>
                </div>

                {/* Right side — Image + Button */}
                <div className="flex flex-col justify-center">
                    <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-[460px] object-cover rounded-2xl shadow-lg dark:shadow-gray-700 mb-6"
                    />
                    <button
                        onClick={handleJoinEvent}
                        className="w-full bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Join Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;