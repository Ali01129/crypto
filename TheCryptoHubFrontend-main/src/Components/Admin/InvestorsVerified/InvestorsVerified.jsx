import React, { useState,useEffect } from "react";
import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";


// import "./UserAdmin.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AdminHeader from "../AdminHeader/AdminHeader";
import SideBarAdmin from "../SideBar/SideBar";
import UserDataAdmin from "../UserDataAdmin/UserDataAdmin";
import InvestorsVerifiedData from "../InvestorsVerifiedData/InvestorsVerifiedData";



const InvestorsVerified = () => {
  const [rightHeader, setRightHeader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [completeData,setCompleteData] = useState([]);
  const [driversData,setDriversData] = useState([]);

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
                 if (newData.length > 0 && !driversData.length) {
            setDriversData(newData);
            setCompleteData(newData);
          }
        } 
        } catch (error) {
          console.error("Error fetching Ambassadors data:", error);
        }
      };
      fetchAmbassadorsData();
    },[driversData]); // The empty dependency array ensures the effect runs once when the component mounts
  
    console.log("driversData",driversData)
  
const filteredDriversData = driversData.filter((driver) =>
driver.fullName.toLowerCase().includes(searchValue.toLowerCase())
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
            You Can See Detail About Verified Investors
          </div>

          <div className="topTextsVehiclAdmin">
            <div className="topInputBtnSearch">
              <input placeholder="Search Here" className="inputSearchVehic" value={searchValue}
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
            <InvestorsVerifiedData
            
            driverData={driversData}
            />
            {/* <UserDataAdmin
               driverData={tempArray}
            /> */}
         {/* <TableDateAdminVehicle
             driverData={tempArray}
         /> */}
         
         </div>
        </div>
      </div>
    
    </>
  );
};

export default InvestorsVerified;
