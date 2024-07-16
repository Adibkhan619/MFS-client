import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import Root from "./root/Root";
import Home from "./home/Home";
import Register from "./register/Register";
import Login from "./login/Login";
import AdminDashboard from "./adminDashboard/AdminDashboard";
import AgentDashboard from "./agentDashboard.jsx/AgentDashboard";
import UserDashboard from "./userDashboard/UserDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/adminDashboard",
                element: <AdminDashboard></AdminDashboard>,
                loader: () => fetch("http://localhost:5000/users"),
            },
            {
                path: "/agentDashboard",
                element: <AgentDashboard></AgentDashboard>,
                loader: () => fetch("http://localhost:5000/users"),
            },
            {
                path: "/userDashboard",
                element: <UserDashboard></UserDashboard>,
                loader: () => fetch("http://localhost:5000/users"),
            },
        ],
    },
    {
        path: "/register",
        element: <Register></Register>,
    },
    {
        path: "/login",
        element: <Login></Login>,
        loader: () => fetch("http://localhost:5000/users"),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
);
