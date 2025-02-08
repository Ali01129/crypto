import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { deletePartner } from "../../../redux/CustomerReducer";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
import Swal from "sweetalert2";
//import { getUsers, verifyInvestor } from "../../../redux/CustomerReducer";
// import './UserDataAdmin.css'
//import { getInvestors } from "../../../redux/CustomerReducer";
import { RiDeleteBin6Line } from "react-icons/ri";

import axios from "axios"
import { SERVERURL } from "../../../ServerUrl";

import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";


export default function FoundersData(props) {
 
  const [deleteVeh, setDeleteVeh] = useState(0);
  const [filtered2, setFiltered2] = useState([]);
  const [Index, setIndex] = useState();
  const dispatch = useDispatch();
  const [alertIndex, setAlertIndex] = useState();


  const verifyClicked = async (index, id, row) => {
    console.log(index, id); //mongoid, array index
    console.log(row); //that particular object
  
    Swal.fire({
      title: '',
      text: 'Are you sure to verify ' + row.fullName + '?',
      icon: 'info', // Change 'alert' to 'info' for the icon
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Verify it!'
    }).then(async (result) => { // Add 'async' before (result)
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token'); 
          const headers = {
            'Authorization': `Bearer ${token}`, // Corrected header format
          };
          const response = await axios.post(`${SERVERURL}/api/v1/verifySpecialUser`,{id:index}, {
            headers: headers, // Include the headers object in the request configuration
          });
    
              if(response.data.success === true)
              {
               Swal.fire(
              '',
              'Verification Done!',
              'success'
            );

            setDeleteVeh(2);
            let zz = filtered2.filter((item) => item.fullName !== row.fullName);
            setFiltered2(zz);
          }
          else
          {
            if(response.data.success === false)
            {
              Swal.fire(
                '',
                response.data.message,
                'error'
              )
            }
          }
        } catch (error) {
          console.log("response 4", error.response)
          if (error.response.data.message) {
            console.error(error.response);
            Swal.fire({
              title: "",
              text: error.response.data.message,
              icon: 'error', // Change 'Error' to 'error' for the icon
              showCancelButton: true,
              cancelButtonColor: '#d33',
            })
          }
        }
      }
    });
  
    setAlertIndex(id); // Setting alert index
  };


  const updateFilteredData = () => {
    if (props.driverData) {
      const newFilteredData = props.driverData.filter(
        (item) =>
          item.verified === false &&
          item.verifieduser === true &&
          item.category === "founder"
      );
      setFiltered2(newFilteredData);
    }
  };

  useEffect(() => {
    // When props.driverData changes, update the filtered data
    updateFilteredData();
  }, [props.driverData]);


//search left
let yy=props.driverData;
console.log("yy:",yy);
const filtered = yy?.filter((item) => item.verified===false && item.verifieduser === true && item.category === "founder");

  console.log("filtered",filtered)

  return (
    <div>
<TableContainer component={Paper}>
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Location
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Twitter
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          LinkedIn
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Phone
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Verification
        </th>
      </tr>
    </thead>
    <tbody>
      {filtered2?.map((row, idx) => (
        <tr key={row?.fullName} className="border-b border-gray-200 transition-colors hover:bg-gray-100">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {row?.fullName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {row?.title}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {row?.email}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {row?.location}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <a href={row?.twitter} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Link here
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <a href={row?.linkedIn} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Link here
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {row?.phone}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span className="text-blue-500 cursor-pointer inline-block py-2 px-3 rounded-lg bg-blue-100 hover:bg-blue-200" onClick={() => verifyClicked(row._id, idx, row)}>
              Verify
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</TableContainer>

    </div>
  );
}
