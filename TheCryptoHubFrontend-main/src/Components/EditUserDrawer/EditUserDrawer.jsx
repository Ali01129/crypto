import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./EditUserDrawer.css";
import ReactFileReader from "react-file-reader";
import { UpdateUser } from "../../redux/CustomerReducer";
import Swal from "sweetalert2";

// import { addBlog } from "@/slices/counterSlice";
// import { updateMetaTag } from "@/slices/counterSlice";
import { useSelector } from "react-redux";

import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { useDispatch } from "react-redux";

const EditUserDrawer = (props) => {
  const userData = useSelector(
    (state) => state?.CustomerReducer?.userDataAdmins
  );

  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    title: props?.userData?.title,
    fullName: props?.userData?.fullName,
    email: props.userData.email,
    location: props.userData.location,
    twitter: props.userData.twitter,
    linkedIn: props.userData.linkedIn,
    image: props.userData.image,
  });

  console.log(" props.userData.image", props.userData.image)

  const options = [
    { value: "Title", label: "Title" },
    { value: "Description", label: "Description" },
  ];

  const options1 = [
    { value: "Post Viewer Boeing", label: "Post Viewer Boeing" },
    { value: "Picture View Boeing", label: "Picture View Boeing" },
    { value: "Reel Viewer Boeing", label: "Reel Viewer Boeing" },
    { value: "Story Viewer Boeing", label: "Story Viewer Boeing" },
    { value: "Video Viewer Boeing", label: "Video Viewer Boeing" },
    { value: "Blog", label: "Blog" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const imageHandle = (e) => {
    const selected1 = e.target.files[0];

    setImage(selected1)
    
  };

  console.log("tagDataEdit", user);

  const updateBtnClicked = () => {
    let id = props.id;
    const form = new FormData();
    form.append("fullName", user.fullName);
    form.append("title", user.title);
    form.append("twitter", user.twitter);
    form.append("linkedIn", user.linkedIn);
    form.append("email", user.email);
    form.append("password", user.password);
    form.append("location", user.location);
    console.log("user.image",user.image)
    if (!image) {
      form.append("image", user.image);
    } else {
      form.append("photo", image);
    }

    dispatch(UpdateUser({ form, id, userData }));
  };

//   const handleFiles = (files) => {
//     setImage(files?.base64[0]);
//     console.log("files?.base64", files?.base64[0], image);
//   };

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
              className="btnAddVehicle btnAddVehicleTag"
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
                  Update User
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="mainAddVehicleDrawerFields">
                  {/* <div>
                        {image&&<img src={image} style={{width:"100px" ,height:"100px",borderRadius:"50%"}}/>}
                        {!image&&<img src={user.image} style={{width:"100px" ,height:"100px",borderRadius:"50%"}}/>}
                    </div>
                    <ReactFileReader fileTypes={[".jpg",".png"]} base64={true} 
                multipleFiles={true} handleFiles={handleFiles}>
  <button className='btn'>Upload Image</button>
</ReactFileReader> */}

                  <div className="topCatagoryField">
                    <div className="catagoryTxtAddVeh">Image :</div>
                    <input
                      placeholder="Please Enter Description"
                      className="inputFieldAddVeh"
                      type="file"
                      onChange={imageHandle}
                      rows={3}

                      //   value={vehicle?.title}
                    />
                  </div>

                  <div className="topCatagoryField">
                    <div className="catagoryTxtAddVeh">Email :</div>
                    <input
                      placeholder="Please Enter Description"
                      className="inputFieldAddVeh"
                      name="email"
                      value={user.email}
                      rows={3}
                      //   value={vehicle?.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="topCatagoryField">
                    <div className="catagoryTxtAddVeh">fullName :</div>
                    <input
                      placeholder="Please Enter Description"
                      className="inputFieldAddVeh"
                      name="fullName"
                      value={user.fullName}
                      rows={3}
                      //   value={vehicle?.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="topCatagoryField">
                    <div className="catagoryTxtAddVeh">Title :</div>
                    <input
                      placeholder="Please Enter Description"
                      className="inputFieldAddVeh"
                      name="title"
                      value={user.title}
                      rows={3}
                      //   value={vehicle?.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="topCatagoryField">
                    <div className="catagoryTxtAddVeh">Location :</div>
                    <input
                      placeholder="Please Enter Description"
                      className="inputFieldAddVeh"
                      name="location"
                      value={user.location}
                      rows={3}
                      //   value={vehicle?.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="topCatagoryField">
                    <div className="catagoryTxtAddVeh">Twitter :</div>
                    <input
                      placeholder="Please Enter Description"
                      className="inputFieldAddVeh"
                      name="twitter"
                      value={user.twitter}
                      rows={3}
                      //   value={vehicle?.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="topCatagoryField">
                    <div className="catagoryTxtAddVeh">LinkedIn :</div>
                    <input
                      placeholder="Please Enter Description"
                      className="inputFieldAddVeh"
                      name="linkedIn"
                      value={user.linkedIn}
                      rows={3}
                      //   value={vehicle?.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="topCatagoryField topCatagoryFieldCheck">
                    <Navbar.Toggle
                      aria-controls={`offcanvasNavbar-expand-${expand}`}
                    >
                      <span className="cnclBtn">Cancel</span>
                    </Navbar.Toggle>

                    <Navbar.Toggle
                      aria-controls={`offcanvasNavbar-expand-${expand}`}
                    >
                      <span className="addBtn" onClick={updateBtnClicked}>
                        Update
                      </span>
                    </Navbar.Toggle>
                  </div>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default EditUserDrawer;
