import React, { useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include styles for Quill editor

export default function ProjectEditPage({ selectedRow, onCloseDialog }) {
  const [formData, setFormData] = useState(selectedRow);
  const navigate=useNavigate()

  const [alertIndex, setAlertIndex] = useState();
  const handleChangeHashtagAttribute = (index, attributeValue) => {
    let updatedTeamMembers = [...formData.hashtags];
    let updatedMember = { ...updatedTeamMembers[index] };
   
    
    updatedMember = attributeValue;
    updatedTeamMembers[index] = updatedMember;
   
    setFormData({
      ...formData,
      hashtags: updatedTeamMembers,
    });
   
  };

 
const handleDeletePartner = (index) => {
  let updatedDocs = formData.hashtags.filter((_, i) => i !== index);
  
  // Update the state with the updated array
  setFormData({
      ...formData,
      hashtags: updatedDocs,
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
  const token = localStorage.getItem('token'); 
  const headers = {
    'Authorization': `Bearer ${token}`, // Corrected header format
  };
  const response = await axios.post(`${SERVERURL}/api/v1/editEvent`, formData, {
    headers: headers, // Include the headers object in the request configuration
  });
  const newData = response.data;
  console.log("response is ",newData);
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
  text: 'An Error Occurred while Editing this Event.',
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
            <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-2">Edit Event Details of {selectedRow.title}</h1>
            <p className="mt-1 max-w-2xl text-base leading-6 text-gray-500">Edit or Delete Attributes Here</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Basic Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formData.type !== null && <p><strong>Category:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="type" value={formData.type} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("type")}>Delete</button></p>}
                {formData.shortDescription !== null && <p><strong>Short Description:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="shortDescription" value={formData.shortDescription} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("shortDescription")}>Delete</button></p>}                
                {formData.location !== null && <p><strong>Location:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="location" value={formData.location} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("location")}>Delete</button></p>}
                {formData.countryCode !== null && <p><strong>Country Code:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="countryCode" value={formData.countryCode} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("countryCode")}>Delete</button></p>}
                  
                  
                </div>
              </div>
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Content</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.description !== null ? formData.description : ""} 
          onChange={(value) => setFormData({...formData, description: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("description")}
        >
          Reset
        </button>
      </div>
    
                  
                </div>
              </div>


              {/* Financial Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Date & Time</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formData.startDate !== null && <p><strong>Start Date:</strong> <input type="date" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="startDate" value={formData.startDate} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out"onClick={() => handleDeleteAttribute("startDate")}>Delete</button></p>}
                  {formData.endDate !== null && <p><strong>End Date:</strong> <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("endDate")}>Delete</button></p>}
                  {formData.startTime !== null && <p><strong>Start Time:</strong> <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("startTime")}>Delete</button></p>}
                  {formData.endTime !== null && <p><strong>End Time:</strong> <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("endTime")}>Delete</button></p>}
                </div>
              </div>
              {/* Marketing and Communication */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Marketing and Communication</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formData.websiteLink !== null &&<p><strong>Website Link:</strong> <input type="text" name="websiteLink" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={formData.websiteLink} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("websiteLink")}>Delete</button></p>}
                  {formData.linkedinLink !== null && <p><strong>LinkedIn Link:</strong> <input type="text" name="linkedinLink" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={formData.linkedinLink} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("linkedinLink")}>Delete</button></p>}
                  {formData.twitterLink !== null && <p><strong>Twitter Link:</strong> <input type="text" name="twitterLink" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={formData.twitterLink} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("twitterLink")}>Delete</button></p>}
                  {formData.instagramLink !== null && <p><strong>Instagram Link:</strong> <input type="text" name="instagramLink" value={formData.instagramLink} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("instagramLink")}>Delete</button></p>}
                </div>
              </div>
              {/* Hashtags */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Hashtags</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formData.hashtags.map((partner, index) => (
                    partner !== null && (
                    <div key={index} className="border-t border-gray-200 pt-4">
                      {partner !== null && <p><strong>Hashtag-{index}:</strong> <input className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' type="text" name={`hashtag-${index}`} onChange={(e) =>  handleChangeHashtagAttribute(index,e.target.value)} value={partner}  /></p>}
                      <button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeletePartner(index)}>Delete Hashtag</button>
                      </div>
                    
                      )
                  ))}
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
