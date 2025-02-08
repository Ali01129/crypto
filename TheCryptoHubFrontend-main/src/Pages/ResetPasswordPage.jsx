
import Footer from '../Components/Footer/Footer'
import TopBar from '../Components/TopBar/TopBar'
import { SERVERURL } from "../ServerUrl";
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import ResetPassword from '../Components/ForgotPassword/Reset';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const ResetPasswordPage = () => {
  const navigate=useNavigate();
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetToken(token);
    }
  }, []);

  const handleResetPasswordSubmit = async (token, password) => {
    try {
      const response = await axios.post(`${SERVERURL}/api/v1/resetPassword`, { token, password });
      console.log(response.data);
      if (response.data.message==="Password Reset successfully!") {
        Swal.fire('Reset Done', response.data.message, 'success');      
        navigate(`/`);
      }
      else
      {
        Swal.fire('', response.data.message, 'error');      
      }     

    } catch (error) {
      console.error('Error:', error);
    }
  };  
  return (
    <>
    <TopBar/>
    <ResetPassword token={resetToken} onSubmit={handleResetPasswordSubmit} />

    {/* {!resetToken && (
      ) : ( */}
        {/* <ForgotPassword onSubmit={handleForgotPasswordSubmit} /> */}
      {/* )} */}
    <Footer/>
    </>
  )
}

export default ResetPasswordPage