import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import AuthProvider from './provider/AuthProvider';
import Root from './root/Root';
import Home from './home/Home';
import Register from './register/Register';
import Login from './login/Login';


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        }
      ]
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/login",
        element: <Login></Login>,
        loader: () => fetch("http://localhost:5000/users") 
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
