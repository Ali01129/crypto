import React, { useState } from 'react'
import './VerificationCode.css'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import axios from 'axios';
import { SERVERURL } from "../../ServerUrl";
import { useLocation,useNavigate } from 'react-router-dom';
const VerificationCodeNew = () => {
    const[code,setCode]=useState();
    const[verify,setVerify]=useState();
    const location = useLocation();
    const { email } = location.state;

    const searchParams = new URLSearchParams(location.search);
    const navigate=useNavigate();

const dispatch=useDispatch();

const submitCodeClicked=async()=>{
  try {  
  if(code)
    {

      const response = await axios.post(`${SERVERURL}/api/v1/verifyEmail`, { email, code });

      if (response.status === 200) {
        
        //token
        Swal.fire('Success',"Authorized Successfully!", 'success');
        navigate('/user/new/password');
      } else {
        Swal.fire('Error', 'Invalid Code', 'error');
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

export default VerificationCodeNew