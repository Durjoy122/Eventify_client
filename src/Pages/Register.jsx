import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register = () => {
    const { createUser, setUser , updateUser ,  signInWithGoogle } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;

        if(!uppercasePattern.test(password)) {
            setNameError("Password must contain at least one uppercase letter.");
            return;
        } 
        else if(!lowercasePattern.test(password)) {
            setNameError("Password must contain at least one lowercase letter.");
            return;
        } 
        else if (password.length < 6) {
            setNameError("Password must be at least 6 characters long.");
            return;
        } 
        else {
            setNameError("");
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({displayName: name , photoURL: photoURL})
                    .then(()=> {
                        setUser({...user, displayName: name , photoURL: photoURL});
                        Swal.fire({
                            title: 'Success!',
                            text: 'User registered successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        const newUser = { name, email, photoURL };
                        axios.post("http://localhost:3000/users", newUser)
                        .then((res) => {
                            console.log("Data after user save:", res.data);
                        })
                        .catch((err) => {
                            console.error("Error saving user:", err);
                        });
                        navigate("/"); 
                        form.reset();
                    })
                    .catch((error)=> {
                        Swal.fire({
                            title: 'Error!',
                            text: "Profile update failed: " + error.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                        setUser(user);
                    })
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
            const loggedUser = result.user;
            const newUser = {
                name: loggedUser.displayName,
                email: loggedUser.email,
                photoURL: loggedUser.photoURL,
            };

           axios.post("http://localhost:3000/users", newUser)
            .then((res) => {
                 console.log("Data after user save:", res.data);
                Swal.fire({
                    title: 'Success!',
                    text: 'Logged in with Google!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/");
                })
                .catch((err) => {
                    console.error("Error saving user:", err);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to save user data.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
               });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
     };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"> {/* Dark mode background */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-sm"> {/* Dark mode form background */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Sign Up</h2> {/* Dark mode text */}
                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input name="name" 
                            type="text" 
                            placeholder="Enter your name" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                         />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input name="email" type="email" placeholder="Enter your email"  
                            required 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
                        <input name="photo" type="text" placeholder="Enter your photo URL"  
                            required 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                        />
                    </div>
                    {/* Password */}
                    <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                           />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                     </div>
                     {nameError && <p className='text-xs text-red-500'>{nameError}</p>}
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200">Register</button>
                    <div className="flex items-center my-5">
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" /> {/* Dark mode separator */}
                        <span className="px-2 text-gray-400 dark:text-gray-300 text-sm">or</span>
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="text-gray-700 dark:text-gray-200 font-medium">Continue with Google</span>
                     </button>
                </form>
                <p className="text-sm text-center text-green-600 mt-4 dark:text-gray-300">
                    Already have an account? <Link to="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;