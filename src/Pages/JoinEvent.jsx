import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../layouts/Components/loading";

const JoinEvent = () => {
    const { user , loading } = useContext(AuthContext);
    const [joinedEvents, setJoinedEvents] = useState([]);

    useEffect(() => {
      const fetchJoinedEvents = async () => {
          if(!user?.email) return;
          try {
             const res = await axios.get(`http://localhost:3000/joinedEvents?email=${user.email}`);
             setJoinedEvents(res.data);
          } 
          catch (error) {
             console.error("Error fetching joined events:", error);
          } 
          finally {
             // Removed setLoading(false) since loading is managed by AuthContext
          }
      };
      fetchJoinedEvents();
    }, [user]);

    if(!user) {
      return (
          <Loading></Loading>
      );
  }

  if (loading) {
    return (
        <Loading></Loading>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">My Joined Events</h2>
        {joinedEvents.length === 0 ? (
            <p className="text-center text-gray-600">You haven’t joined any events yet.</p>
        ) :
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
              {joinedEvents.map((event) => (
                  <div 
                      key={event._id} 
                      className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden flex flex-col transform hover:scale-[1.02] transition duration-300 ease-in-out hover:shadow-2xl"
                  >
                      <div className="relative">
                          <img
                              src={event.thumbnail}
                              alt={event.eventTitle}
                              className="h-52 w-full object-cover rounded-t-xl" // Slightly taller image, matching corner radius
                          />
                          <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                              {event.eventType}
                          </span>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                              {event.eventTitle}
                          </h3>
                          
                          {/* Location and Date grouped for better flow */}
                          <div className="mb-4 space-y-1">
                              <p className="text-sm font-medium text-indigo-600 flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                  {event.location}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                  {new Date(event.eventDate).toLocaleDateString()}
                              </p>
                          </div>
                          
                          {/* Separator Line */}
                          <hr className="my-3 border-gray-100" />

                          {/* Footer/Meta Info */}
                          <p className="text-xs text-gray-500 mt-auto pt-2">
                              <span className="font-semibold">Joined:</span> {new Date(event.joinedAt).toLocaleDateString()} at {new Date(event.joinedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                      </div>
                  </div>
              ))}
          </div>
        )}
    </div>
  );
};

export default JoinEvent;