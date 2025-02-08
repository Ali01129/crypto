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



const AddPartner = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [rightHeader, setRightHeader] = useState(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const errors = {};
  
    if (!name.trim()) {
      errors.name = "Name is required";
    }
  
    if (!image) {
      errors.image = "Image is required";
    }
  
    setErrors(errors);
  
    return Object.keys(errors).length === 0;
  };
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    setImage(selected);

    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      // Handle error if the file type is not allowed
    }
  };

  const uploadOnServer = async () => {
    if (!validateForm()) {
      return;
    }
    try {

      const form = new FormData();
      form.append("fullName", name);
      form.append("file", image);
      const token = localStorage.getItem('token'); 
      const headers = {
        'Authorization': `Bearer ${token}`, // Corrected header format
      };
      const response = await axios.post(`${SERVERURL}/api/v1/AddPartner`, form, {
        headers: headers, // Include the headers object in the request configuration
      });

          if(response.data.success === true)
          {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Partner Added Successfully.",
            });
            setName("");
            setImage(null);
            setImgPreview(null);
            if (imageInputRef.current) {
              imageInputRef.current.value = null;
            }
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
        text: "Partner Not Added.",
      });
      console.error("Error registering partner:", error);
    }
  };
const imageInputRef = useRef(null);
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
        <h2 className="topTextEditAdmVehic">Upload New Partner</h2>
        <div className="mb-4">
          <label className="topTextEditAdmVehic2" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name of Partner"
            className=" input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
            value={name}
            onChange={handleNameChange}
          />
        </div>
        {errors.name && <p className="error">⚠ {errors.name}</p>}
        <div className="mb-6">
          <label className="topTextEditAdmVehic2" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            type="file"
            ref={imageInputRef}
            accept="image/png , image/jpeg, image/webp"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleImageChange}
          />
        </div>
        {errors.image && <p className="error">⚠ {errors.image}</p>}
        {imgPreview && (
          <img src={imgPreview} alt="Preview" className="mb-4 max-w-xs rounded-lg" />
        )}
        <div className="flex items-center justify-between">
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

export default AddPartner;

