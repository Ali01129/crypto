import React, { useState, useRef, useEffect } from "react";
import "./AdminHeader.css";
import { MdCircleNotifications } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
const AdminHeader = (props) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('admin'));  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);
  const navigate=useNavigate()
  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsPopoverOpen(false);
    }
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleLogin = () => {
    navigate('/admin/login');
  };
  const handleLogout = () => {
    Swal.fire({
      title: '',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
          if (decodedToken.exp < currentTime) {
            // Token is expired
            localStorage.removeItem("admin"); // Remove the expired token
            navigate("/admin/login"); // Redirect to login page or show a message to the user
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    const tokenCheckInterval = setInterval(checkTokenExpiry, 60000); // Check token expiry every minute

    // Clean up interval on component unmount
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, []);


  return (
    <>
      <div className={props.rightHeader ? "topMainHeaderAdmin" : "topMainHeaderAdminRight"}>
        <div className="mainHeaderAdmin">
          <div className="topIconNameHd">
            <div>{loggedIn}</div>
            <BsFillPersonFill className="bsProfileIconHd" onClick={togglePopover} />
          </div>
        </div>
      </div>
      {isPopoverOpen && (
        <div ref={popoverRef} className="absolute3 right-20 mt-20 w-28 bg-white rounded-lg shadow-lg z-10">
          <div className="py-1">
          {loggedIn ? (
  <button
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
    onClick={handleLogout}
  >
    Logout
  </button>
) : (
  <button
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
    onClick={handleLogin}
  >
    Login
  </button>
)}

            
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
