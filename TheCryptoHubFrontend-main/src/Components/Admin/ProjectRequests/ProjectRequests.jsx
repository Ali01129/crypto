import React, { useState, useEffect } from "react";
import ProjectsViewPage from './ProjectsViewPage';
import Swal from "sweetalert2";
import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";

const ProjectRequests = (props) => {
  const [filtered2, setFiltered2] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRow2, setSelectedRow2] = useState(null);
  const [alertIndex, setAlertIndex] = useState();
  const handleAcceptClicked = async (index, id, row) => {
    console.log(index, id); //mongoid, array index
    console.log(row); //that particular object
    Swal.fire({
      title: '',
      text: 'Are you sure to Accept ' + row.title + '?',
      icon: 'warning', // Change 'alert' to 'info' for the icon
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Accept it!'
    }).then(async (result) => { // Add 'async' before (result)
      if (result.isConfirmed) {
        try {
          const formdata = new FormData();
          formdata.append('id', index); // Append 'id' instead of 'index'

          const token = localStorage.getItem('token'); 
          const headers = {
            'Authorization': `Bearer ${token}`, // Corrected header format
          };

          const response = await axios.post(`${SERVERURL}/api/v1/acceptProject`, formdata, {
            headers: headers, // Include the headers object in the request configuration
          });
          if (response.data.success === true) {
            // Update the state or perform any action on successful verification
            Swal.fire(
              '',
              response.data.message,
              'success'
            );

            let zz = filtered2.filter((item) => item.title !== row.title);
            setFiltered2(zz);
          }
          else
          {
            Swal.fire(
              '',
              response.data.message,
              'error'
            );
          }
        } catch (error) {
          Swal.fire(
            '',
            "An error occured",
            'error'
          );
        }
      }
    });
    setAlertIndex(id); // Setting alert index
  };

  const handleRejectClicked = async (index, id, row) => {
    console.log(index, id); //mongoid, array index
    console.log(row); //that particular object
    Swal.fire({
      title: '',
      text: 'Are you sure to Reject ' + row.title + '?',
      icon: 'warning', // Change 'alert' to 'info' for the icon
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reject it!'
    }).then(async (result) => { // Add 'async' before (result)
      if (result.isConfirmed) {
        try {
          const formdata = new FormData();
          formdata.append('id', index); // Append 'id' instead of 'index'

          const token = localStorage.getItem('token'); 
          const headers = {
            'Authorization': `Bearer ${token}`, // Corrected header format
          };

          const response = await axios.post(`${SERVERURL}/api/v1/rejectProject`, formdata, {
            headers: headers, // Include the headers object in the request configuration
          });
          if (response.data.success === true) {
            // Update the state or perform any action on successful verification
            Swal.fire(
              '',
              response.data.message,
              'success'
            );

            let zz = filtered2.filter((item) => item.title !== row.title);
            setFiltered2(zz);
          }
          else
          {
            Swal.fire(
              '',
              response.data.message,
              'error'
            );
          }
        } catch (error) {
          if (error.response.data.message) {
            console.error(error.response);
            Swal.fire(
              '',
              "An error occured",
              'error'
            );
          }
        }
      }
    });
    setAlertIndex(id); // Setting alert index
  };

  const updateFilteredData = () => {
    if (props.driverData) { 
      setFiltered2(props.driverData);
    }
  };
  useEffect(() => {
    updateFilteredData();
  }, [props.driverData]);  

  const handleViewClick = (index) => {
    setSelectedRow(filtered2[index]);
  };
  const handleEditClick = (index) => {
    setSelectedRow2(filtered2[index]);
  };
  const handleCloseDialog = () => {
    setSelectedRow(null);
  };
  const handleCloseEditDialog = () => {
    setSelectedRow2(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chain</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
{
filtered2 && (
  <tbody>
  {filtered2.map((item, index) => (
    <tr key={index} className="border-b border-gray-200 transition-colors hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.user}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.chain}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.deadline}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex nowrap justify-center spacee">
        <button className="text-blue-500 hover:cursor-pointer inline-block py-2 px-3 rounded-lg bg-blue-100 hover:bg-blue-200" onClick={() => handleViewClick(index)}>
          View
        </button>
        <button className="text-green-500 hover:cursor-pointer inline-block py-2 px-3 rounded-lg bg-green-100 hover:bg-green-200" onClick={() => handleAcceptClicked(item._id, index, item)}>
          Accept
        </button>
        <button className="text-red-500 hover:cursor-pointer inline-block py-2 px-3 rounded-lg bg-red-100 hover:bg-red-200" onClick={() => handleRejectClicked(item._id, index, item)}>
          Reject
        </button>
      </td>
    </tr>
  ))}
</tbody>


)
 

}
      </table>
    
      {selectedRow && (
      <ProjectsViewPage 
      selectedRow={selectedRow} 
      onCloseDialog={handleCloseDialog} 
    />
      )}    
        </div>
  );
};

export default ProjectRequests;
