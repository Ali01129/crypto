import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SERVERURL } from "../../../ServerUrl";
import { useNavigate } from "react-router-dom";
import './LoginAdmin.css'
import { loginAdmin } from "../../../redux/CustomerReducer";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginAdmin = () => {
  const dispatch=useDispatch();
 const navigate=useNavigate()
//   const router=useRouter();
const[valid,setValid]=useState();

  const counter=useSelector((state)=>state?.counterReducer?.userData)

  console.log("counter",counter)

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const loginClicked = async () => {
   
    if(user.email&&user.password)
    {
      console.log("responresse   2")
      try {
        const response = await axios.post(`${SERVERURL}/api/v1/loginAdmin`, user);
        console.log(response);
        console.log("responresse   3",response.data.status)
                
            if(response.data.message==="Login Successful" && response.data.category =="admin")
            {
              localStorage.setItem('admin',response?.data?.User?.fullName);
localStorage.setItem('token', response?.data?.token);
localStorage.removeItem('loggedin');
              Swal.fire(
                response.data.message,
                    response.data.status,
                    'success'
                  )
                  navigate('/admin/users')
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
    setValid(true)
  }
  };
  return (
    <>
      <div className="mainContainerLogin">
        <div className="userLoginTxt">Admin Login</div>

        <div className="topInputFieldLogin">
          <div className="inputTxtLogin">Email</div>
          <input
            className="inputLogins"
            type="email"
            onChange={handleChange}
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="topInputFieldLogin">
          <div className="inputTxtLogin">Password</div>
          <input
            className="inputLogins"
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div><Link to="/user/forgot/password">Forgot password?</Link></div>

{valid&&<div style={{color:"red"}}>Check with your email or password</div>}

        <button className="loginBtn" onClick={() => loginClicked()}>
          Login
        </button>
      </div>
    </>
  );
};

export default LoginAdmin;
