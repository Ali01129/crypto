import React, { useState,useRef,useEffect } from "react";

import "./AmbassadorsAdmin.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AdminHeader from "../AdminHeader/AdminHeader";
import SideBarAdmin from "../SideBar/SideBar";
import UserDataAdmin from "../UserDataAdmin/UserDataAdmin";
//import InvestorsData from "../InvestorsData/InvestorsData";
import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const AddBanner = () => {
  const [banner, setBanner] = useState("");
  const [rightHeader, setRightHeader] = useState(false);
  const handleBannerChange = (content) => {
    setBanner(content); // ReactQuill passes content as a string with HTML formatting
  };  
  const [errors, setErrors] = useState({});
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };
  const validateForm = () => {
    const errors = {};
    const strippedBanner = stripHtml(banner); // Strip HTML tags for validation

    if (!strippedBanner.trim()) {
      errors.banner = "Banner detail is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadOnServer = async () => {
    if (!validateForm()) {
      return;
    }
    try {

      const form = new FormData();
      form.append("banner", banner);
      const token = localStorage.getItem('token'); 
      const headers = {
        'Authorization': `Bearer ${token}`, // Corrected header format
      };
      const response = await axios.post(`${SERVERURL}/api/v1/AddAnnouncement`, form, {
        headers: headers, // Include the headers object in the request configuration
      });

          if(response.data.success === true)
          {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Banner Announcement Added Successfully.",
            });
            
          }
          else {
            Swal.fire({
              icon: "error",
              title: response.data.message,
             text: "",
            });
          }
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Banner Announcement Not Added.",
      });
    }
  };
  return ( 
    <>   
<AdminHeader rightHeader={rightHeader}/>
      <div className="topSideVehicles">
        <SideBarAdmin
        setRightHeader={setRightHeader}
        rightHeader={rightHeader}
        />

    <div className="flex justify-center items-center h-full formisss" style={{margin:"auto",alignSelf:"center",marginTop:"150px"}}>
      <div className="bg-white shadow rounded px-8 pt-4 pb-8 mb-4 w-full max-w-lg">
        <h2 className="topTextEditAdmVehic">Upload/Replace Banner Announcement</h2>
        <div className="mb-4">
          <label className="topTextEditAdmVehic2" htmlFor="title">
            Announcement:
          </label>
          <ReactQuill
            value={banner}
            onChange={handleBannerChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />        
          </div>
        {errors.banner && <p className="error">⚠ {errors.banner}</p>}
        <div className="mb-6">

          <button
            className="hover:bg-blue-700 btnSearchVehicle hh focus:outline-none focus:shadow-outline"
            type="button"
            onClick={uploadOnServer}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
    </div>
    </>

  );
};

export default AddBanner;

