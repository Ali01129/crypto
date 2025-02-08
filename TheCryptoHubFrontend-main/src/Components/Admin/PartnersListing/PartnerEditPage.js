import React, { useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";
import Swal from "sweetalert2";

export default function PartnerEditPage({ selectedRow, onCloseDialog }) {
  const [formData, setFormData] = useState(selectedRow);
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the uploaded file
  };

  const handleDeleteTeamMemberAttribute = (index, attributeName) => {
    const updatedTeamMembers = [...formData.teamMembers];
    const updatedMember = { ...updatedTeamMembers[index] };
    updatedMember[attributeName] = null; // Set the attribute to null
    updatedTeamMembers[index] = updatedMember;
    setFormData({
      ...formData,
      teamMembers: updatedTeamMembers,
    });
  };

  const handleChangeDocAttribute = (index, attributeName, attributeValue) => {
    let updatedTeamMembers = [...formData.docs];
    let updatedMember = { ...updatedTeamMembers[index] };

    updatedMember[attributeName] = attributeValue;
    updatedTeamMembers[index] = updatedMember;

    setFormData({
      ...formData,
      docs: updatedTeamMembers,
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleDeleteAttribute = (attribute) => {
    setFormData({
      ...formData,
      [attribute]: null,
    });
  };

  const handleSave = async () => {
    try {
      // Append the file to the formData
      const formDataWithFile = new FormData();
      formDataWithFile.append('image', file); // Append the file to formData
      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);//appending 
      }

      console.log(formDataWithFile);

      const token = localStorage.getItem('token'); 
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Corrected header format
      };
      const response = await axios.post(`${SERVERURL}/api/v1/editPartner`, formDataWithFile, {
        headers: headers, // Include the headers object in the request configuration
      });
      const newData = response.data;
      console.log("response is ", newData);
      if (newData.success === true) {
        Swal.fire({
          text: newData.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            onCloseDialog();
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          text: newData.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        text: 'An Error Occurred while Editing this Partner.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75 z99">
      <div className="absolute top-1/2 z100 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg max-w-4xl scrolll">
        <button className="absolute top-4 right-4 p-2 rounded-md bg-gray-50 text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={onCloseDialog}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div>
          <div className="px-2 sm:px-0">
            <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-2">Edit Partner Details of {selectedRow.fullName}</h1>
            <p className="mt-1 max-w-2xl text-base leading-6 text-gray-500">Edit or Delete Attributes Here</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Basic Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formData.fullName !== null && <p><strong>FullName:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="fullName" value={formData.fullName} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("fullName")}>Delete</button></p>}
                  {formData.image !== null && (
  <div className="flex flex-col items-center justify-center w-full">
    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      {file ? ( // Check if file exists
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">File Chosen</span>
          </p>

<p className="text-xs text-gray-500 dark:text-gray-400">{file.name}</p> 
      </div>) : (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click Here to Change Picture</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPEG or JPG</p>
        </div>
      )}
      <input id="dropzone-file" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG" type="file" className="hidden" onChange={handleFileChange} />
    </label>
  </div>
)}
                </div>
              </div>
            </dl>
          </div>
          <div className="px-4 py-6 sm:px-0 sm:py-4 sm:text-right">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 ease-in-out mr-4"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out"
              onClick={onCloseDialog}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
