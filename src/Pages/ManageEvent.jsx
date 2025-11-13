import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../layouts/Components/loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageEvents = () => {
  const { user , loading } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);

  // For modal
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      eventType: "",
      location: "",
      eventDate: new Date(),
      thumbnail: "",
  });

  const fetchMyEvents = async () => {
      if(!user?.email) return;
      try {
        const res = await axios.get(`http://eventify-server-sigma.vercel.app/myEvents?email=${user.email}`);
        setMyEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
  };  

  useEffect(() => {
    fetchMyEvents();
  }, [user]);

  const handleDelete = async (id) => {
      const confirm = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
      });

      if(confirm.isConfirmed) {
          try {
              await axios.delete(
                `http://localhost:3000/events/${id}?userEmail=${user.email}`
              );
              Swal.fire("Deleted!", "Your event has been deleted.", "success");
              fetchMyEvents();
          } catch (error) {
              Swal.fire(
                  "Error!",
                  error.response?.data?.message || error.message,
                  "error"
              );
          }
      }
  };

  const openEditModal = (event) => {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        eventType: event.eventType,
        location: event.location,
        eventDate: new Date(event.eventDate),
        thumbnail: event.thumbnail,
      });
      document.getElementById("edit_modal").showModal();
  };

  const handleUpdateSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.put(`http://localhost:3000/events/${editingEvent._id}`, {
            ...formData,
            userEmail: user.email,
          });
          Swal.fire("Updated!", "Event has been updated successfully.", "success");
          document.getElementById("edit_modal").close();
          fetchMyEvents();
      } catch (error) {
          Swal.fire(
              "Error!",
              error.response?.data?.message || error.message,
              "error"
          );
      }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-100">
        <p>Please log in to manage your events.</p>
      </div>
    );
  }

  if(loading) return <Loading />;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
        Manage My Events
      </h2>

      {myEvents.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          You haven’t created any events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg overflow-hidden flex flex-col transition-colors duration-300"
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{event.title}</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-1">📍 {event.location}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Type: {event.eventType}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  📅 {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <div className="mt-auto flex gap-2">
                    <button onClick={() => openEditModal(event)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded">
                          Edit
                    </button>
                    <button onClick={() => handleDelete(event._id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded">
                         Delete
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle dark:bg-gray-900 dark:text-gray-100">
          <div className="modal-box dark:bg-gray-800 dark:text-gray-100">
            <h3 className="font-bold text-lg mb-4 text-center">Edit Event</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                />

                <textarea
                    placeholder="Description"
                    className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required  
                />

                <select className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600" value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  required
                >
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Donation">Donation</option>
                </select>

                <input
                  type="text"
                  placeholder="Thumbnail URL"
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  value={formData.thumbnail || ""}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  required
               />

                <input type="text" placeholder="Location" className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required  
                />

                <DatePicker
                    selected={formData.eventDate}
                    onChange={(date) => setFormData({ ...formData, eventDate: date })}
                    className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    minDate={new Date()}
                    required
                />
                <div className="modal-action">
                    <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white">Save Changes</button>
                    <button type="button" onClick={() => document.getElementById("edit_modal").close()}className="btn">Cancel</button>
                </div>
            </form>
          </div>
      </dialog>
    </div>
  );
};

export default ManageEvents;