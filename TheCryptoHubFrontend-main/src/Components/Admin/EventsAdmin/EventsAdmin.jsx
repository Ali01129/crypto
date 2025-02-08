import React, { useState,useEffect } from "react";
import { deleteUser } from "../../../redux/CustomerReducer";
import "./UserAdmin.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUsers } from "../../../redux/CustomerReducer";
import AdminHeader from "../AdminHeader/AdminHeader";
import SideBarAdmin from "../SideBar/SideBar";
import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";
import EventsTabe from "../Events/EventsTable";

const EventsAdmin = () => {
  const [rightHeader, setRightHeader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [driversData,setDriversData] = useState([]);
  const [completeData,setCompleteData] = useState([]);

//  const dispatch=useDispatch();

//  const [tempArray, settempArray] = useState(driversData);


  useEffect(() => {
    // Define an async function to fetch Ambassadors data
    const fetchAmbassadorsData = async () => {
      
      try {

        // Make an Axios GET request to fetch Ambassadors data from the server
        const response = await axios.get(`${SERVERURL}/api/v1/getEvents`);
        // Assuming the response contains an array of Ambassadors
        const newData = response.data;

        // Update the state variable with the received data, but only if it's empty
        if (newData.length > 0 && !driversData.length) {
          setDriversData(newData);
          setCompleteData(newData);
        }
    
      } catch (error) {
        console.error("Error fetching Ambassadors data:", error);
      }
    };

    // Call the fetchAmbassadorsData function when the component mounts
    fetchAmbassadorsData();
  },[driversData]); // The empty dependency array ensures the effect runs once when the component mounts





// console.log("filterDrivers",filterDrivers,driversData,tempArray)


  console.log("driversData",driversData)




const filteredDriversData = driversData.filter((driver) =>
driver.title.toLowerCase().includes(searchValue.toLowerCase())
);

const handleSearch = () => {
  // Call this function when the search button is pressed
  // It will filter the data based on the searchValue and update the state
 if(searchValue==="")
 {
  setDriversData(completeData);  
 }
 else
{
  setDriversData(filteredDriversData);
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
            You Can View Edit & Delete Verified Events
          </div>

          <div className="topTextsVehiclAdmin">
            <div className="topInputBtnSearch">
              <input placeholder="Search Here" className="inputSearchVehic" value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}/>
              <button className="btnSearchVehicle" onClick={handleSearch}>Search</button>
            </div>

          </div>
         <div className="topTableAdminVehicles">
            <EventsTabe
              driverData={driversData}
            />
         
         </div>
        </div>

{/* <div className="vehicleAdminMain">
<div className="topTextEditAdmVehiccomingsoon comingsoon">Comin Soon</div>
</div> */}
 


      </div>
    
    </>
  );
};

export default EventsAdmin;
