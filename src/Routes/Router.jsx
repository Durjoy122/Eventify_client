import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import Home from '../Pages/Home.jsx';
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import UpComingEvent from '../Pages/UpComingEvent.jsx';
import ManageEvent from '../Pages/ManageEvent.jsx';
import CreateEvent from '../Pages/CreateEvent.jsx';
import JoinEvent from '../Pages/JoinEvent.jsx';
import EventDetails from '../layouts/Components/EventDetails.jsx';
import PrivateRoute from '../Provider/PrivateRoute.jsx';
import Loading from '../layouts/Components/loading.jsx';

const router = createBrowserRouter([
    {
       path: "/",
       element: <HomeLayout />,
       children: [
            {
                index: true,
                element: <Home />,
            }
            ,
            {
                path: "upcoming", // ✅ correct
                element: <UpComingEvent />,
                hydrateFallbackElement:<Loading></Loading>
            }
            ,
            {
                path : "manage-event",
                element: <PrivateRoute><ManageEvent /></PrivateRoute>,
                hydrateFallbackElement:<Loading></Loading>
            }
            ,
            {
                path: "create-event",
                element: <PrivateRoute><CreateEvent /></PrivateRoute>,
                hydrateFallbackElement:<Loading></Loading>
            }
            ,
            {
                path: "join-event",
                element: <PrivateRoute><JoinEvent /></PrivateRoute>,
                hydrateFallbackElement:<Loading></Loading>
            }
            ,
            {
                path: 'eventDetails/:id',
                loader: ({params}) => fetch(`http://localhost:3000/events/${params.id}`),
                element: <PrivateRoute><EventDetails /></PrivateRoute>
            },
        ], 
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    }
]);

export default router;