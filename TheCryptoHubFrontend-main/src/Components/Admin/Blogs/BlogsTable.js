import React, { useState, useEffect } from "react";
import BlogsViewPage from './BlogsViewPage';
import BlogsEditPage from './BlogsEditPage';
import Swal from "sweetalert2";
import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";

const ProjectsTable = (props) => {
  const [filtered2, setFiltered2] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRow2, setSelectedRow2] = useState(null);
  const [alertIndex, setAlertIndex] = useState();
  const deleteClicked = async (index, id, row) => {
    console.log(index, id); //mongoid, array index
    console.log(row); //that particular object
    Swal.fire({
      title: '',
      text: 'Are you sure to Delete ' + row.title + '?',
      icon: 'warning', // Change 'alert' to 'info' for the icon
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then(async (result) => { // Add 'async' before (result)
      if (result.isConfirmed) {
        try {
          const formdata = new FormData();
          formdata.append('id', index); // Append 'id' instead of 'index'

          const token = localStorage.getItem('token'); 
          const headers = {
            'Authorization': `Bearer ${token}`, // Corrected header format
          };

          const response = await axios.post(`${SERVERURL}/api/v1/deleteBlog`, formdata, {
            headers: headers, // Include the headers object in the request configuration
          });
          if (response.data.success === true) {
            // Update the state or perform any action on successful verification
            Swal.fire(
              '',
              'Deleted Successfully!',
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
            Swal.fire({
              title: "",
              text: "An Error Occured.",
              icon: 'error'
            })
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Written By</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Read Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
{
filtered2 && (
  <tbody>
  {filtered2.map((item, index) => (
    <tr key={index} className="border-b border-gray-200 transition-colors hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><div className="pictureee">
    <img
      src={SERVERURL + '/uploads/' + item.user.image}
      alt="AuthorPic"
      className="w-10 h-10 rounded-full"
    />
  </div></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.readTime}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdAt}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex nowrap justify-center spacee">
        <button className="text-blue-500 hover:cursor-pointer inline-block py-2 px-3 rounded-lg bg-blue-100 hover:bg-blue-200" onClick={() => handleViewClick(index)}>
          View
        </button>
        <button className="text-green-500 hover:cursor-pointer inline-block py-2 px-3 rounded-lg bg-green-100 hover:bg-green-200" onClick={() => handleEditClick(index)}>
          Edit
        </button>
        <button className="text-red-500 hover:cursor-pointer inline-block py-2 px-3 rounded-lg bg-red-100 hover:bg-red-200" onClick={() => deleteClicked(item._id, index, item)}>
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>


)
 

}
      </table>
    
      {selectedRow && (
      <BlogsViewPage 
      selectedRow={selectedRow} 
      onCloseDialog={handleCloseDialog} 
    />
      )}

{selectedRow2 && (
      <BlogsEditPage 
      selectedRow={selectedRow2} 
      onCloseDialog={handleCloseEditDialog}
    
    />
      )}

    
    
        </div>
  );
};

export default ProjectsTable;
