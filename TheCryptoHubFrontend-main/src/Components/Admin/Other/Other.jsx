import React, { useState,useEffect } from "react";


// import "./UserAdmin.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AdminHeader from "../AdminHeader/AdminHeader";
import SideBarAdmin from "../SideBar/SideBar";
import UserDataAdmin from "../UserDataAdmin/UserDataAdmin";
import AmbassadorsVerifiedData from "../AmbassadorVerifiedData/AmbassadorVerifiedData";
import InvestorsData from "../InvestorsDataOld/InvestorsData";
import OthersData from "../OthersData/OthersData";



const Others = () => {
  const [rightHeader, setRightHeader] = useState(false);

  const driversData = useSelector(
    (state) => state?.AdminReducer?.getAllDriversData
  );

  const dispatch=useDispatch();

  let tempArray=[];
 const filterDrivers= driversData?.map((item)=>{
    if(item.assigned===false)
    {
      if(item != undefined)
      {
        tempArray.push(item);
        return item
      }
    

     

    }

   

  })

console.log("filterDrivers",filterDrivers,driversData,tempArray)


  console.log("driversData",driversData)
  useEffect(() => {


  }, []);


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
            You can see and edit detail about Ambassadors..
          </div>

          <div className="topTextsVehiclAdmin">
            <div className="topInputBtnSearch">
              <input placeholder="Search User" className="inputSearchVehic" />
              <button className="btnSearchVehicle">Search</button>
            </div>

            {/* <div  className="topAddVehicleDrawer">
              <AddVehicleDrawer
              driverData={tempArray}
              />
             
            
            
            </div> */}
          </div>
         <div className="topTableAdminVehicles">
            <OthersData
            
            driverData={tempArray}
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

export default Others;
