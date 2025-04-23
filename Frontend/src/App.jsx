import React, { useContext, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AboutUs from './pages/AboutUs';
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserAppointments from "./components/UserAppointments";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';
import { Context } from './main';
import axios from 'axios';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
 const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);
 useEffect(() => {
  const fetchUser = async() => {
    try {
      const response = await axios.get("https://mern-apollo24-1.onrender.com/api/v1/user/patient/me", {withCredentials: true});
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
     setIsAuthenticated(false);
     setUser({});
    }
  };
  fetchUser();
 }, [isAuthenticated]);

  return (
    <div className='app-container'>
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/my-appointments' element={<UserAppointments/>}/>
      </Routes>
      <Footer/>
      <ToastContainer position="top-center"/>
     </Router>
     <Chatbot /> 
    </div>
  )
}

export default App
