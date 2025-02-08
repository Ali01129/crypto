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



const AddPodcast = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // State for thumbnail
  const [rightHeader, setRightHeader] = useState(false);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]); // Get the selected file
  };
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    } else if (title.length > 50) {
      errors.title = "Title must be less than 50 characters";
    }

    if (!link) {
      errors.link = "Link is required";
    }
    
    if (!thumbnail) {
      errors.thumbnail = "Thumbnail Image is required"; 
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
      form.append("title", title);
      form.append("link", link);
      form.append("thumbnail", thumbnail);
      const token = localStorage.getItem('token'); 
      const headers = {
        'Authorization': `Bearer ${token}`, // Corrected header format
      };
      const response = await axios.post(`${SERVERURL}/api/v1/AddPodcast`, form, {
        headers: headers, // Include the headers object in the request configuration
      });

          if(response.data.success === true)
          {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Podcast Added Successfully.",
            }).then(() => {
              window.location.reload(); // Reload after the alert is closed
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
        text: "Podcast Not Added.",
      });
      console.error("Error adding podcast:", error);
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
        <h2 className="topTextEditAdmVehic">Upload New Podcast</h2>
        <div className="mb-4">
          <label className="topTextEditAdmVehic2" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title of Podcast"
            className=" input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        {errors.title && <p className="error">⚠ {errors.title}</p>}
        <div className="mb-6">

        <label className="topTextEditAdmVehic2" htmlFor="link">
          Youtube Video Link:
          </label>
          <input
            id="link"
            type="text"
            placeholder="Link of Podcast"
            className=" input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
            value={link}
            onChange={handleLinkChange}
          />
        </div>
        {errors.link && <p className="error">⚠ {errors.link}</p>}        <div className="flex items-center justify-between">
          
        <div className="mb-4">
              <label className="topTextEditAdmVehic2" htmlFor="thumbnail">
                Thumbnail Image: 
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*" // Accept only image files
                className="input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                onChange={handleThumbnailChange}
              />
            </div>
            {errors.thumbnail && <p className="error">⚠ {errors.thumbnail}</p>}

          
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

export default AddPodcast;

