import React, { useContext } from "react";
import logo1 from '../assets/canal.jpg';
import logo2 from '../assets/poor.jpg';
import logo3 from '../assets/plantation.jpg';
import { FaCalendarAlt, FaLeaf, FaUsers, FaHandsHelping } from "react-icons/fa";
import { Link, NavLink} from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../layouts/Components/loading";


const Home = () => {
    const {loading } = useContext(AuthContext);
    if(loading) {
        return <Loading></Loading>
    }
    return (
        <div className="bg-gray-50 text-gray-800">
            <section className="relative bg-gradient-to-r from-blue-600 to-green-500 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-10 md:py-20">
                    <div className="md:w-1/2 space-y-6 text-center md:text-left">
                        <h1 className="text-5xl font-extrabold leading-tight">
                            Join Events that <br /> <span className="text-yellow-300">Make the World Better</span>
                        </h1>
                        <p className="text-lg text-blue-100">
                           Connect, contribute, and create positive change through community events.
                        </p>
                        <Link to="/upcoming">
                            <button className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition">
                               Explore Events
                            </button>
                        </Link>

                    </div>

                    <div className="md:w-1/2 mt-10 md:mt-0">
                        <img
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5JTIwZXZlbnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                            alt="Community Event"
                            className="w-full rounded-2xl shadow-2xl object-cover"
                        />
                    </div>
               </div>
            </section>
            <section className="max-w-7xl mx-auto py-20 px-6 text-center">
                <h2 className="text-4xl font-bold mb-12">Why Join Our Platform?</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <FaCalendarAlt className="text-green-600 text-4xl mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">Easy Event Creation</h3>
                    <p className="text-gray-600">
                    Create and manage impactful events effortlessly with our user-friendly interface.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <FaUsers className="text-green-600 text-4xl mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                    <p className="text-gray-600">
                    Connect with like-minded individuals working for environmental and social good.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <FaLeaf className="text-green-600 text-4xl mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">Sustainability Focused</h3>
                    <p className="text-gray-600">
                    All our events promote sustainability and community well-being.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <FaHandsHelping className="text-green-600 text-4xl mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">Volunteer Opportunities</h3>
                    <p className="text-gray-600">
                    Join hands in making a difference through organized volunteering events.
                    </p>
                </div>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* 1. Image Collage Column (Left) */}
                    <div className="relative w-full h-full flex justify-center lg:justify-start">
                        <div className="grid grid-cols-2 gap-4 max-w-lg lg:max-w-none">
                        
                        {/* Main vertical image (left side) */}
                        <div className="col-span-1 row-span-2 self-center">
                            <img
                                src={logo1} // Replace with your first image path
                                alt="Poor children receiving aid"
                                className="w-full h-[500px] object-cover rounded-xl shadow-2xl"
                                style={{ objectPosition: 'center' }}
                            />
                        </div>
                        
                        {/* Top small image (top right) */}
                        <div className="col-span-1">
                            <img
                                src={logo2} // Replace with your second image path
                               alt="Poor children receiving aid"
                               className="w-full h-56 object-cover rounded-xl shadow-xl"
                            />
                        </div>
                        
                        {/* Bottom small image (bottom right) */}
                        <div className="col-span-1">
                            <img
                               src={logo3} // Replace with your third image path
                                alt="Plantation field"
                               className="w-full h-56 object-cover rounded-xl shadow-xl"
                            />
                        </div>

                        </div>
                    </div>

                    {/* 2. Content Column (Right) */}
                    <div className="lg:pr-12">
                        
                        {/* Sub-headline / Brand Name */}
                        <p className="text-xl font-serif text-orange-500 mb-3">
                              Our Vision
                        </p>

                        {/* Main Headline */}
                        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
                                Make a Better Bangladesh
                        </h2>
                        
                        {/* Paragraph 2 */}
                        <p className="mt-4 text-gray-600 text-lg leading-relaxed mb-8">
                           Our vision is to build a cleaner and greener Bangladesh by inspiring people to take part in cleaning activities and contributing through donations. We aim to create a nation where every citizen takes responsibility for keeping the environment healthy, sustainable, and beautiful for future generations.
                        </p>

                        {/* CTA Button */}
                        <Link to="/create-event">
                            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-orange-600 hover:bg-orange-700 transition duration-300 transform hover:scale-105">
                                Create Event Now
                            </button>
                        </Link>
                    </div>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16 px-6">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-4xl font-bold">Stay Connected</h2>
                <p className="text-lg text-blue-100">
                    Join to our newsletter to get the latest updates on upcoming events and opportunities.
                </p>
                </div>
            </section>
        </div>
    );
};

export default Home;