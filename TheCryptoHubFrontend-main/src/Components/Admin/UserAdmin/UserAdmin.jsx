import React, { useState,useEffect } from "react";

import { deleteUser } from "../../../redux/CustomerReducer";
import "./UserAdmin.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUsers } from "../../../redux/CustomerReducer";
import AdminHeader from "../AdminHeader/AdminHeader";
import SideBarAdmin from "../SideBar/SideBar";
import UserDataAdmin from "../UserDataAdmin/UserDataAdmin";

import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";
import Swal from "sweetalert2";


const UserAdmin = () => {
  const [rightHeader, setRightHeader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [driversData,setDriversData] = useState([]);
  const [completeData,setCompleteData] = useState([]);
  useEffect(() => {
    // Define an async function to fetch Ambassadors data
    const fetchAmbassadorsData = async () => {
      try {
        
        const token = localStorage.getItem('token'); 
        const headers = {
          'Authorization': `Bearer ${token}`, // Corrected header format
        };
        // Make an Axios GET request to fetch Ambassadors data from the server
        const response = await axios.get(`${SERVERURL}/api/v1/getUsers`, {
          headers: headers, // Include the headers object in the request configuration
        });
        // Assuming the response contains an array of Ambassadors
        const newData = response.data;

        if(response.data)
        {
        // Update the state variable with the received data, but only if it's empty
        if (newData.length > 0 && !driversData.length) {
          setDriversData(newData);
          setCompleteData(newData);
        }
      }
      else
      {
        Swal.fire(
          '',
          response.data.error,
          'error'
        )
      }
    
      } catch (error) {
        console.error("Error fetching Ambassadors data:", error);
      }
    };
    fetchAmbassadorsData();
  },[driversData]); // The empty dependency array ensures the effect runs once when the component mounts
const filteredDriversData = driversData.filter((driver) =>
driver.fullName.toLowerCase().includes(searchValue.toLowerCase())
);
const handleSearch = () => {
 
  if (searchValue === "") {
    // If the search value is empty, set the driversData state to the original data
    setDriversData(completeData);
  } else {
    // If the search value is not empty, filter the driversData based on the searchValue
    const filteredData = driversData.filter((driver) =>
      driver.fullName &&
      driver.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setDriversData(filteredData);
  }
};

  return (
    <>
      {/* <AdminHeader rightHeader={rightHeader} /> */}
      
<AdminHeader rightHeader={rightHeader}/>
      <div className="topSideVehicles">
        <SideBarAdmin
        setRightHeader={setRightHeader}
        rightHeader={rightHeader}
        />
        
        <div className="vehicleAdminMain">
          <div className="topTextEditAdmVehic">
            You Can See Detail About Users
          </div>

          <div className="topTextsVehiclAdmin">
            <div className="topInputBtnSearch">
              <input placeholder="Search User" className="inputSearchVehic" value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}/>
              <button className="btnSearchVehicle" onClick={handleSearch}>Search</button>
            </div>

            {/* <div  className="topAddVehicleDrawer">
              <AddVehicleDrawer
              driverData={tempArray}
              />
             
            
            
            </div> */}
          </div>
         <div className="topTableAdminVehicles">
            <UserDataAdmin
               driverData={driversData}
            />
         {/* <TableDateAdminVehicle
             driverData={tempArray}
         /> */}
         
         </div>
        </div>
      </div>
    
    </>
  );
};

export default UserAdmin;
