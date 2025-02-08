import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import { loginCustomer } from "../../redux/CustomerReducer";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Cookies from "universal-cookie";
import { SERVERURL } from "../../ServerUrl";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Signup = () => {
  const[valid,setValid]=useState()
  const cookies = new Cookies();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const[user,setUser]=useState({
    
    email:"",
    password:"",
  


  })

  const handleChange=(e)=>{
    const{value,name}=e.target;
  
    setUser({...user,[name]:value})
  
  }


  const loginClicked=async()=>{
    console.log("responresse  1")
    if(user.email&&user.password)
    {
      console.log("responresse   2")
      try {
        const response = await axios.post(`${SERVERURL}/api/v1/login`, user);
        console.log(response);
        console.log("responresse   3",response.data.status)
                
            if(response.data.message==="Login Successful" && response.data.category!=="admin")
            {

              console.log("admin not case",response.data.category);
              localStorage.setItem('loggedin',true);
localStorage.setItem('token', response?.data?.token);
localStorage.removeItem('admin');


///////get user data
              Swal.fire(
                response.data.message,
                    response.data.status,
                    'success'
                  )
              navigate('/')
            }
            if(response.data.message==="Login Successful" && response.data.category==="admin")
            {
              console.log("admin case",response.data.category);
              localStorage.setItem('token', response?.data?.token);
              localStorage.setItem('admin',response?.data?.User?.fullName);
              localStorage.removeItem('loggedin');
              
              ///////get user data
                            Swal.fire(
                              response.data.message,
                                  response.data.status,
                                  'success'
                                )
                            navigate('/admin/users');
            }
      } catch (error) {
        console.log("responresse   4",error.response)
if(error.response.data.message)
{
  console.error(error.response);
  Swal.fire(
    error.response.data.message,
        error.response.data.message,
        'Error'
      )

}
    
      }
   
    }
    else{
      setValid(2)
    }
  }
 
  return (
    <>
      <div className="mainContainerSignup mainContainerLogin">
        <div className="cardSignup">
          <div className="cardSignupInner">
            <div className="topSignupTxt">
              Welcome to The Crypto Hub! We're happpy to have you.
            </div>

            <div className="tellAbtTxt">
            Login here.
            </div>

          

            <div className="topTxtInput">
              <div className="inputLbl">Email</div>
              <input placeholder="ElonMusk@gmail.com" className="inputSignup" 
                 onChange={(e)=>handleChange(e)}
                 name="email"
              
              />
            </div>
            <div className="topTxtInput">
              <div className="inputLbl">Password</div>
              <input placeholder="password" className="inputSignup" type="password"
              
              onChange={(e)=>handleChange(e)}
              name="password"
              />
            </div>
            {valid===2&&<div style={{color:"red"}}>Enter all fields</div>}

            <div><Link to="/user/forgot/password">Forgot password?</Link></div>

            <div className="home-content--btn2"
                         

            >
              <div className="hover-btn2"   onClick={loginClicked}></div>
              <button className="content-btn--inner2"
                onClick={loginClicked}
              >
                <p>Login</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
