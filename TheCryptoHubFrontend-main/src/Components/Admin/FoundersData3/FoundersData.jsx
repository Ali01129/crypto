import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { deletePartner } from "../../../redux/CustomerReducer";
// import Swal from "sweetalert2";
import Swal from "sweetalert2";
import { getUsers, verifyAmbassador } from "../../../redux/CustomerReducer";
// import './UserDataAdmin.css'
import { getAmbassadors } from "../../../redux/CustomerReducer";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import EditAmbassadorDrawer from "../EditAmbassadorDrawer/EditAmbassadorDrawer";

import axios from "axios"
import { SERVERURL } from "../../../ServerUrl";
export default function FoundersData(props) {
  

  const [deleteVeh, setDeleteVeh] = useState(0);
  const [filtered2, setFiltered2] = useState([]);
  const [Index, setIndex] = useState();
  const [flag, setFlag] = useState();
  const [alertIndex, setAlertIndex] = useState();
  const dispatch = useDispatch();

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

  const deleteIconClicked = (index) => {
    setAlertIndex(index);

    setDeleteVeh(1);
  };

  const noClickedAlert = () => {
    setDeleteVeh(2);
  };

  useEffect(() => {
dispatch(getAmbassadors())
   
  }, []);
  // useEffect(() => {
 
    
  // }, []);
  const yesDeleteClicked = async (data) => {
    let id = data._id;

    dispatch(deletePartner({id,ambassadorsData}))
    setDeleteVeh(2);
  };


  const verifyClicked=async(id,i)=>{
    setIndex(i)
   

   const response=await dispatch(verifyAmbassador(id))
   setFlag(response?.payload?.data?.success)
   Swal.fire(
    response?.payload?.data?.success?'Successfully Verified':'Failed',
    response?.payload?.data?.message,
    response?.payload?.data?.success?'success':'error'
  )
   console.log("responseAmbassador",response)
  }

  const filtered = ambassadorsData?.filter((item) => item.type === "founder");

  console.log("filtered",filtered)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">location</TableCell>
              <TableCell align="right">twitter</TableCell>
              <TableCell align="right">linkedIn</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">More Detail</TableCell>
              <TableCell align="right">Delete</TableCell>
    
              <TableCell align="right">Edit</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {filtered2?.map((row, index) => (
              <TableRow
                key={row?.fullName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.fullName}
                </TableCell>
                <TableCell align="right">{row?.title}</TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.location}</TableCell>
                <TableCell align="right">{row?.twitter}</TableCell>
                <TableCell align="right">{row?.linkedIn}</TableCell>
              
                <TableCell align="right">{row?.phone}</TableCell>
                <TableCell align="right">{row?.detail}</TableCell>
              
                <TableCell align="right">
                  <RiDeleteBin6Line
                    onClick={() => deleteIconClicked(index)}
                    className="deleteVehicleIcon"
                  />


                </TableCell>
                <TableCell align="right" className="editColDataVeh">
                  <EditAmbassadorDrawer
                    userData={row}
                    id={row._id}
                  />
                  {/* <FiEdit2/> */}
                {/* <EditUserDrawer
                userData={row}
                id={row._id}
                /> */}
                  {/* <EditVehicleDrawer 
                driverData={props?.driverData}
                  data={row}/> */}
                </TableCell>

                {deleteVeh === 1 && alertIndex === index && (
                  <div className="mainDeleteCardVehicle">
                    <div className="confirmTxtAlertVehDlt">
                      {" "}
                      You want to delete Founder?
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
                        onClick={() => yesDeleteClicked(row)}
                      >
                        Yes
                      </div>
                    </div>
                  </div>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
