import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./AddPartner.css";

import ReactFileReader from "react-file-reader";
// import { UpdateUser } from "../../redux/CustomerReducer";

import Swal from "sweetalert2";

// import { addBlog } from "@/slices/counterSlice";
// import { updateMetaTag } from "@/slices/counterSlice";
import { useSelector } from "react-redux";

import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateAmbassador } from "../../../redux/CustomerReducer";

import { addPartner } from "../../../redux/CustomerReducer";

const AddPartnerDrawer = (props) => {
 
  const dispatch=useDispatch();
  const getPartnersData = useSelector(
    (state) => state?.CustomerReducer?.getPartnersData
  );

  const[Image,setImage]=useState();

const imageChange=(e)=>{

  setImage(e.target.files[0])
  
}
  const addClicked=()=>{
    const data=new FormData();

    data.append("photo",Image)
    const ambassadorData=[]
    dispatch(addPartner({data,getPartnersData}))
  }

console.log("Image",Image)
  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          className="mb-3 addBlogDrawerAd"
        >
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="addPartner"
            >
              Add 
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="addVehicleDrawer"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Add Partner
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="mainAddVehicleDrawerFields">
              

                  <div className="topCatagoryField">
                    <div className="catagoryTxtAddVeh">Image :</div>
                    <input
                      placeholder="Please Enter Description"
                      className="inputFieldAddVeh"
                      type="file"
                      rows={3}
                      onChange={imageChange}

                    />
                  </div>
<Navbar.Toggle>
                <div className="btnPartner"
                
                onClick={addClicked}
                >Add Partner</div>
</Navbar.Toggle>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default AddPartnerDrawer;
