import React, { useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";
import Swal from "sweetalert2";

export default function ProjectEditPage({ selectedRow, onCloseDialog }) {
  const [formData, setFormData] = useState(selectedRow);
  const navigate=useNavigate()

  const [alertIndex, setAlertIndex] = useState();
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

  const handleChangeTeamMemberAttribute = (index, attributeName, attributeValue) => {
    let updatedTeamMembers = [...formData.teamMembers];
    let updatedMember = { ...updatedTeamMembers[index] };
   
    
    updatedMember[attributeName] = attributeValue;
    updatedTeamMembers[index] = updatedMember;
    setFormData({
      ...formData,
      teamMembers: updatedTeamMembers,
    });
   
  };
console.log("selected row:",selectedRow);
  const handleChangePartnerAttribute = (index, attributeName, attributeValue) => {
    let updatedTeamMembers = [...formData.partners];
    let updatedMember = { ...updatedTeamMembers[index] };
    console.log("index is",index);

    
    updatedMember[attributeName] = attributeValue;
    updatedTeamMembers[index] = updatedMember;
    
    setFormData({
      ...formData,
      partners: updatedTeamMembers,
    });
  
  };

  const handleDeletePartnerAttribute = (index, attributeName) => {
    
        const updatedPartners = [...formData.partners];
        const updatedPartner = { ...updatedPartners[index] };
        updatedPartner[attributeName] = null; // Set the attribute to null
      
        // Update the partners array with the modified partner object
        updatedPartners[index] = updatedPartner;
        setFormData({
          ...formData,
          partners: updatedPartners,
        });
    
};



const handleDeletePartner = (index) => {
  let updatedDocs = formData.partners.filter((_, i) => i !== index);
  
  // Update the state with the updated array
  setFormData({
      ...formData,
      partners: updatedDocs,
  });
 
};  


const handleDeleteTeamMember = (index) => {
  let updatedDocs = formData.teamMembers.filter((_, i) => i !== index);
  
  // Update the state with the updated array
  setFormData({
      ...formData,
      teamMembers: updatedDocs,
  });
  
};  

const handleDeleteDoc = (index) => {
    let updatedDocs = formData.docs.filter((_, i) => i !== index);
    
    setFormData({
        ...formData,
        docs: updatedDocs,
    });
};  

  const handleChange = (e) => {
    
    let { name, type, checked, value } = e.target;

    // For checkboxes, we need to use the `checked` value instead of `value`
    value = type === "checkbox" ? checked : value;
  
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
  const response = await axios.post(`${SERVERURL}/api/v1/editProject`, formData, {
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
  text: 'An Error Occurred while Editing this Project.',
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
            <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-2">Edit Project Details of {selectedRow.title}</h1>
            <p className="mt-1 max-w-2xl text-base leading-6 text-gray-500">Edit or Delete Attributes Here</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Basic Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formData.privatee !== null && <p><strong>Private:</strong> <input type="checkbox" className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" name="privatee" checked={formData.privatee} value={formData.privatee} onChange={handleChange} /></p>}
                {formData.funded !== null && <p><strong>Funded:</strong> <input type="checkbox" className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" name="funded" checked={formData.funded} value={formData.funded} onChange={handleChange} /></p>}    
                {formData.chain !== null && <p><strong>Chain:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="chain" value={formData.chain} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("chain")}>Delete</button></p>}
                  {formData.category !== null && <p><strong>Category:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="category" value={formData.category} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("category")}>Delete</button></p>}
                  {formData.deadline !== null && <p><strong>Deadline:</strong> <input type="text" name="deadline" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={formData.deadline} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("deadline")}>Delete</button></p>}
                  {formData.location !== null && <p><strong>Location:</strong> <input type="text" name="location" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={formData.location} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("location")}>Delete</button></p>}
                </div>
              </div>
              {/* Financial Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Financial Info</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formData.investorAmount !== null && <p><strong>Investor Amount:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name="investorAmount" value={formData.investorAmount} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out"onClick={() => handleDeleteAttribute("investorAmount")}>Delete</button></p>}
                  {formData.raisedMoney !== null && <p><strong>Raised Money:</strong> <input type="text" name="raisedMoney" value={formData.raisedMoney} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("raisedMoney")}>Delete</button></p>}
                  {formData.minimumInvestment !== null && <p><strong>Minimum Investment:</strong> <input type="text" name="minimumInvestment" value={formData.minimumInvestment} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("minimumInvestment")}>Delete</button></p>}
                  {formData.valuationCap !== null && <p><strong>Valuation Cap:</strong> <input type="text" name="valuationCap" value={formData.valuationCap} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("valuationCap")}>Delete</button></p>}
                </div>
              </div>
              {/* Funding Details */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Funding Details</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formData.maximumInvestment !== null &&<p><strong>Max Investment:</strong> <input className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' type="text" name="maximumInvestment" value={formData.maximumInvestment} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("maximumInvestment")}>Delete</button></p>}
                  {formData.fundingGoal !== null && <p><strong>Funding Goal:</strong> <input type="text" name="fundingGoal" value={formData.fundingGoal} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("fundingGoal")}>Delete</button></p>}
                  {formData.tgeDate !== null && <p><strong>TGE Date:</strong> <input type="text" name="tgeDate" value={formData.tgeDate} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("tgeDate")}>Delete</button></p>}
                  {formData.allocation !== null && <p><strong>Allocation:</strong> <input type="text" name="allocation" value={formData.allocation} onChange={handleChange} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("allocation")}>Delete</button></p>}
                </div>
              </div>
              {/* Marketing and Communication */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Marketing and Communication</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formData.youtubeLink !== null &&<p><strong>Youtube Link:</strong> <input type="text" name="youtubeLink" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={formData.youtubeLink} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("youtubeLink")}>Delete</button></p>}
                  {formData.linkedinLink !== null && <p><strong>LinkedIn Link:</strong> <input type="text" name="linkedinLink" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={formData.linkedinLink} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("linkedinLink")}>Delete</button></p>}
                  {formData.twitterLink !== null && <p><strong>Twitter Link:</strong> <input type="text" name="twitterLink" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={formData.twitterLink} onChange={handleChange} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteAttribute("twitterLink")}>Delete</button></p>}
                  
                </div>
              </div>
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Highlight</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.highlights !== null ? formData.highlights : ""} 
          onChange={(value) => setFormData({...formData, highlights: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("highlights")}
        >
          Reset
        </button>
      </div>
                  
                </div>
              </div>



              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">USP</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.usp !== null ? formData.usp : "" } 
          onChange={(value) => setFormData({...formData, usp: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("usp")}
        >
          Reset
        </button>
      </div>
                  
                </div>
              </div>




              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Utility</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
               
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.utility !== null ? formData.utility : ""}
          onChange={(value) => setFormData({...formData, utility: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("utility")}
        >
          Reset
        </button>
      </div>
  
                  
                </div>
              </div>





              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Technology</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.technology !== null ? formData.technology : ""} 
          onChange={(value) => setFormData({...formData, technology: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("technology")}
        >
          Reset
        </button>
      </div>
                  
                </div>
              </div>




              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Road Map</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.roadMap !== null ? formData.roadMap : ""} 
          onChange={(value) => setFormData({...formData, roadMap: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("roadMap")}
        >
          Reset
        </button>
      </div>
                  
                </div>
              </div>





              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Revenue Stream</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.revenueStream !== null ? formData.revenueStream : ""} 
          onChange={(value) => setFormData({...formData, revenueStream: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("revenueStream")}
        >
          Reset
        </button>
      </div>
                  
                </div>
              </div>




              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Tokenomics</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.tokenomic !== null ? formData.tokenomic : ""} 
          onChange={(value) => setFormData({...formData, tokenomic: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("tokenomic")}
        >
          Reset
        </button>
      </div>
                  
                </div>
              </div>


              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Marketing Strategy</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            
      <div>
        <ReactQuill 
          theme="snow" 
          value={formData.marketingStrategy !== null ? formData.marketingStrategy : ""} 
          onChange={(value) => setFormData({...formData, marketingStrategy: value})} 
          className="rich-text-editor"
        />
        <button 
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" 
          onClick={() => handleDeleteAttribute("marketingStrategy")}
        >
          Reset
        </button>
      </div>
                
                </div>
              </div>




              {/* Partners */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Partners</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formData.partners.map((partner, index) => (
                    partner !== null && (
                    <div key={index} className="border-t border-gray-200 pt-4">
                      {partner.name !== null && <p><strong>Name:</strong> <input className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' type="text" name={`partner-name-${index}`} onChange={(e) =>  handleChangePartnerAttribute(index,"name",e.target.value)} value={partner.name}  /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out"onClick={() => handleDeletePartnerAttribute(index,'name')}>Delete</button></p>}
                      {partner.title !== null && <p><strong>Title:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name={`partner-title-${index}`} onChange={(e) =>  handleChangePartnerAttribute(index,"title",e.target.value)} value={partner.title}  /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeletePartnerAttribute(index,'title')}>Delete</button></p>}
                      {partner.description !== null && <p><strong>Description:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name={`partner-description-${index}`} onChange={(e) =>  handleChangePartnerAttribute(index,"description",e.target.value)} value={partner.description}  /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeletePartnerAttribute(index,'description')}>Delete</button></p>}
                      {partner.linkedinLink !== null && <p><strong>LinkedIn Link:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name={`partner-linkedin-${index}`} onChange={(e) =>  handleChangePartnerAttribute(index,"linkedinLink",e.target.value)} value={partner.linkedinLink}  /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeletePartnerAttribute(index,'linkedinLink')}>Delete</button></p>}
                      <button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeletePartner(index)}>Delete Partner</button>
                      </div>
                    
                      )
                  ))}
                </div>
              </div>
              {/* Team Members */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formData.teamMembers.map((member, index) => (
                    member !== null && (
  
                  <div key={index} className="border-t border-gray-200 pt-4">
                      {member.name !== null && <p><strong>Name:</strong> <input type="text" className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' name={`member-name-${index}`} value={member.name} onChange={(e) =>  handleChangeTeamMemberAttribute(index,"name",e.target.value)} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteTeamMemberAttribute(index,'name')} >Delete</button></p>}
                      {member.title !== null && <p><strong>Title:</strong> <input type="text" name={`member-title-${index}`} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={member.title} onChange={(e) =>  handleChangeTeamMemberAttribute(index,"title",e.target.value)} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteTeamMemberAttribute(index,'title')}>Delete</button></p>}
                      {member.description !== null && <p><strong>Description:</strong> <input type="text" name={`member-description-${index}`} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={member.description} onChange={(e) =>  handleChangeTeamMemberAttribute(index,"description",e.target.value)} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteTeamMemberAttribute(index,'description')}>Delete</button></p>}
                      {member.linkedinLink !== null && <p><strong>LinkedIn Link:</strong> <input type="text" name={`member-linkedin-${index}`} className='input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' value={member.linkedinLink} onChange={(e) =>  handleChangeTeamMemberAttribute(index,"linkedinLink",e.target.value)} /><button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteTeamMemberAttribute(index,'linkedinLink')}>Delete</button></p>}
                      <button className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out" onClick={() => handleDeleteTeamMember(index)}>Delete Team Member</button>
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
