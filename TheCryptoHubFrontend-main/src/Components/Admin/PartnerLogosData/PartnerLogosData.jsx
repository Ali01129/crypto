import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import logos from "./../../../images/slider2.png";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { deletePartner } from "../../../redux/CustomerReducer";
// import Swal from "sweetalert2";
import { deletePartnerSlider } from "../../../redux/CustomerReducer";
import Swal from "sweetalert2";
import { getUsers, verifyAmbassador } from "../../../redux/CustomerReducer";
// import './UserDataAdmin.css'
import { getAmbassadors } from "../../../redux/CustomerReducer";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import EditAmbassadorDrawer from "../EditAmbassadorDrawer/EditAmbassadorDrawer";
import EditPartner from "../EditPartener/EditPartner";

export default function PartnerLogosData(props) {
  const [deleteVeh, setDeleteVeh] = useState(0);
  const [Index, setIndex] = useState();
  const [flag, setFlag] = useState();
  const dispatch = useDispatch();
  const [alertIndex, setAlertIndex] = useState();
  const ambassadorsData = useSelector(
    (state) => state?.CustomerReducer?.getAmbassadorsData
  );
  const getPartnersData = useSelector(
    (state) => state?.CustomerReducer?.getPartnersData
  );


  const vehicleData = useSelector(
    (state) => state?.AdminReducer?.allVehiclesData
  );

  console.log("vehicleData", vehicleData);
  // const vehicleData=[
  //     {
  //         catagory:"Saloon",
  //         company:"Toyata",
  //         passenger:"3",
  //         luggage:"5",
  //         price:"200",
  //         availability:true

  //     },
  //     {
  //         catagory:"Saloon",
  //         company:"Toyata",
  //         passenger:"3",
  //         luggage:"5",
  //         price:"200",
  //         availability:true

  //     },
  //     {
  //         catagory:"Saloon",
  //         company:"Toyata",
  //         passenger:"3",
  //         luggage:"5",
  //         price:"200",
  //         availability:true

  //     },
  //     {
  //         catagory:"Saloon",
  //         company:"Toyata",
  //         passenger:"3",
  //         luggage:"5",
  //         price:"200",
  //         availability:false

  //     },
  //     {
  //         catagory:"Saloon",

  //         company:"Toyata",
  //         passenger:"3",
  //         luggage:"5",
  //         price:"200",
  //         availability:true

  //     },

  // ]

  const deleteIconClicked = (index) => {
    setAlertIndex(index);

    setDeleteVeh(1);
  };

  const noClickedAlert = () => {
    setDeleteVeh(2);
  };

  useEffect(() => {
    dispatch(getAmbassadors());
  }, []);
  // useEffect(() => {

  // }, []);
  const yesDeleteClicked = async (data) => {
    let id = data._id;

    dispatch(deletePartnerSlider({ id, getPartnersData }));
    setDeleteVeh(2);
  };



  const filtered = ambassadorsData?.filter((item) => item.type === "founder");

  console.log("getPartnersData", getPartnersData);

  return (
    <div className="mainPartnerLogoData">
    { 
    
    getPartnersData?.map((item,index)=>(

    <div className="cardLogoAdmin">
        <div className="partnerLogoTxt">Partner Logo</div>
        <img src={item.image}  className="imgLogos"/>
        <div className="topDeleteEdit">
          <div className="delTxtPart" onClick={()=>deleteIconClicked(index)}>Delete</div>
          <div  className="editParBtn"><EditPartner
          id={item._id}
          
          /></div>
        </div>

        {deleteVeh === 1 && alertIndex === index && (
                  <div className="mainDeleteCardVehicle">
                    <div className="confirmTxtAlertVehDlt">
                      {" "}
                      You want to delete this Ambassador?
                    </div>
                    <div className="topConfirmBtnDeltVeh">
                      <div
                        className="noBtnAlertDltVeh"
                        onClick={noClickedAlert}
                      >
                        No
                      </div>
                      <div
                        className="yesBtnAlertDltVeh"
                        onClick={() => yesDeleteClicked(item)}
                      >
                        Yes
                      </div>
                    </div>
                  </div>
                )}
      </div>
    ))
      }
    </div>
  );
}
