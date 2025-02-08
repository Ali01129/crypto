import React, { useState } from 'react'
import './VerificationCode.css'
import { verifyCode } from '../../redux/CustomerReducer';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import axios from 'axios';
import { SERVERURL } from "../../ServerUrl";
import { useLocation,useNavigate } from 'react-router-dom';
const VerificationCode = () => {
    const[code,setCode]=useState();
    const[verify,setVerify]=useState();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const propsToPass = {
      email: searchParams.get('email'),
    };  
    console.log("email is :"+propsToPass.email)
    let email=propsToPass.email;
    const navigate=useNavigate();

const dispatch=useDispatch();

const submitCodeClicked=async()=>{
  try {  
  if(code)
    {

      const response = await axios.post(`${SERVERURL}/api/v1/verifyEmail`, { email, code });

      if (response.status === 200) {
        
        //token
        Swal.fire('Success',response.data.message, 'success');
        navigate('/user/login');
      } else {
        Swal.fire('Error', 'Invalid email or code', 'error');
      }
    }}
     catch (error) {
      console.error('Error:', error);
      // Show error message to the user 
      Swal.fire('Error', 'An error occurred', 'error'); 
}
  }


  return (
    <>
     <div className='mainVerifyCode'>
     <div className="verificationMain">
        <div className='verifyTxt'>Verify Your Email</div>
              <div className="inputLbl">Enter Code</div>
              <input placeholder="Enter your code here" className="inputSignup inputSignupCode" 
              
              onChange={(e)=>setCode(e.target.value)}
              name="fullName"
              />
            {verify&&  <p style={{color:"red"}}>Please enter code</p>}
            </div>
      <div className="verificationMain">
             <div className='codeBtn'
             
             onClick={submitCodeClicked}
             >Submit Code</div>
            </div>

     </div>


    </>
  )
}

export default VerificationCode