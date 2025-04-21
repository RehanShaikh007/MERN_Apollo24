import React, { useContext, useState, useEffect, useRef } from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../main";
import axios from 'axios';
import { toast } from 'react-toastify';
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const {isAuthenticated, setIsAuthenticated, user} = useContext(Context);
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
            if (navRef.current && !navRef.current.contains(event.target)) {
                setShow(!show);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfile = () => {
        setShowProfile(!showProfile);
    }

    const navigateTo = useNavigate();
   
    const handleLogout = async()=>{
        try {
            const response = await axios.get("http://localhost:4000/api/v1/user/patient/logout", 
                {withCredentials: true}
            );
            toast.success(response.data.message);
            setIsAuthenticated(false);
            setShowProfile(false);
            setShow(false);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const gotoLogin = ()=>{
      navigateTo("/login");  
      setShow(!show);
    };

    const handleLinkClick = () => {
        setShow(!show);
      };

  return (
    <nav className='container' ref={navRef}>
      <div className="logo">
        <img src="/logo.png" alt="logo" className="logo-img"/>
      </div>
      <div className={show ? "navLinks showmenu": "navLinks"}>
        <div className="links">
            <Link to={"/"} onClick={handleLinkClick}>HOME</Link>
            <Link to={"/appointment"} onClick={handleLinkClick}>APPOINTMENT</Link>
            <Link to={"/about"} onClick={handleLinkClick}>ABOUT US</Link>
        </div>
        {isAuthenticated ? (
            <div 
                ref={profileRef}
                className='profile-btn' 
                onClick={handleProfile}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    cursor: 'pointer'
                }}
            >
                {user && user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                {showProfile && user && (
                    <div className="profile-menu">
                        <div className="profile-links">
                            <Link to={"/"} style={{ fontWeight: 'bold' }}>{user.firstName} {user.lastName}</Link>
                            <Link to={"/my-appointments"} onClick={handleLinkClick}>My Appointments</Link>
                            <Link to={"/"} onClick={handleLogout} >Logout</Link>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <button className='loginBtn btn' onClick={gotoLogin} style={{cursor: 'pointer'}}>LOGIN</button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
         <GiHamburgerMenu/>
      </div>
    </nav>
  )
}

export default Navbar
