
import Footer from '../Components/Footer/Footer'
import TopBar from '../Components/TopBar/TopBar'
import { SERVERURL } from "../ServerUrl";
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import ResetPassword from '../Components/ForgotPassword/Reset';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const ForgotPasswordPage = () => {
  const navigate=useNavigate();
  const [resetToken, setResetToken] = useState('');


  const handleForgotPasswordSubmit = async (email) => {
    try {
      console.log("came forgot password",email);
      const response = await axios.post(`${SERVERURL}/api/v1/forgotPassword`, { email });
      if (response.data.message === 'Email sent') {
        setResetToken(true);
        Swal.fire('Success', 'Reset Link sent to your mail', 'success');
      }
      else
      {
        Swal.fire('',response.data.message,'error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  return (
    <>
    <TopBar/>
    {/* {!resetToken && (
        <ResetPassword token={resetToken} onSubmit={handleResetPasswordSubmit} />
      ) : ( */}
        <ForgotPassword onSubmit={handleForgotPasswordSubmit} />
      {/* )} */}
    <Footer/>
    </>
  )
}

export default ForgotPasswordPage