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
import PartnerLogosData from "../PartnerLogosData/PartnerLogosData";
import AddPartnerDrawer from "../AddPartnerDrawer/AddPartnerDrawer";


import { getPartners } from "../../../redux/CustomerReducer";
const PartnerLogos = () => {
  const [rightHeader, setRightHeader] = useState(false);

  const driversData = useSelector(
    (state) => state?.AdminReducer?.getPartnersData
  );
  const getPartnersData = useSelector(
    (state) => state?.AdminReducer?.getPartnersData
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
dispatch(getPartners())

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
            You can add and edit detail about Partners here..
          </div>

          <div className="topTextsVehiclAdmin">
            <div className="topInputBtnSearch">
              <input placeholder="Search User" className="inputSearchVehic" />
              <button className="btnSearchVehicle">Search</button>
            </div>

            <div  className="topAddVehicleDrawer">
              <AddPartnerDrawer
              />
             
            
            
            </div>
          </div>
         <div className="">
            <PartnerLogosData
            
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

export default PartnerLogos;
