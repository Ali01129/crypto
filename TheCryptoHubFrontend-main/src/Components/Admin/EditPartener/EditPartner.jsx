import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ReactFileReader from "react-file-reader";
import { updatePartner } from "../../../redux/CustomerReducer";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateAmbassador } from "../../../redux/CustomerReducer";
import { addPartner } from "../../../redux/CustomerReducer";

const EditPartner = (props) => {
 
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

let id =props.id;
    data.append("photo",Image)
    const ambassadorData=[]
    dispatch(updatePartner({data,id,getPartnersData}))
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
              Update 
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="addVehicleDrawer"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Update 
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
                >Update</div>
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

export default EditPartner;
