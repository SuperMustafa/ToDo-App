import { useState } from 'react'
import './App.css'
 import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Error from './Components/Error/Error'






 export default   function App() {
  const router = createBrowserRouter([
    { path: '', element: <Login /> },
    { path: '/home', element: <Home /> },
    { path: '/register', element: <Register /> },
    // Wildcard route for handling 404 errors
    { path: '*', element: <Error /> }
  ]);

  return (
    <>
   <RouterProvider router={router}/>
  
    </>
  )
}


