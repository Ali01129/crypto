import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";
import Cookies from "universal-cookie";
import { FaLuggageCart } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import { RiUserStarFill } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { HiCurrencyPound } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import CommingSoonPage from "../../../Pages/CommingSoonPage";
const SideBarAdmin = (props) => {
  const navigate=useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const cookies = new Cookies();
  const menuItem = [
  {
    path:"/admin/ProjectRequests",
    name:"Project Requests",
    icon:<RiUserStarFill />
},
{
  path:"/admin/BlogRequests",
  name:"Blog Requests",
  icon:<RiUserStarFill />
},
{
  path:"/admin/EventRequests",
  name:"Event Requests",
  icon:<RiUserStarFill />
},
{
  path: "/admin/AddProject",
  name: "Add Project",
  icon: <RiUserStarFill />,
},
{
  path: "/admin/AddBlog",
  name: "Add Blog",
  icon: <RiUserStarFill />,
},
{
  path: "/admin/AddEvent",
  name: "Add Event",
  icon: <RiUserStarFill />,
},
   {
    path: "/admin/AddPartner",
    name: "Add Partner",
    icon: <RiUserStarFill />,
  },
  {
    path: "/admin/AddPodcast",
    name: "Add Podcast",
    icon: <RiUserStarFill />,
  },
  {
    path: "/admin/AddAnnouncement",
    name: "Add Announcement",
    icon: <RiUserStarFill />,
  },
    {
      path: "/admin/users",
      name: "Users",
      icon: <ImUsers />,
    },
    {
      path: "/admin/ambassadors",
      name: "Ambassadors Requests",
      icon: <RiUserStarFill />,
    },
    {
      path: "/admin/amb/verified",
      name: "Verified Ambassadors",
      icon: <RiUserStarFill />,
    },
    {
      path: "/admin/investors",
      name: "Investors Requests",
      icon: <RiUserStarFill />,
    },
    {
      path: "/admin/investors/verified",
      name: "Verified Investors",
      icon: <RiUserStarFill />,
    }, 
    {
      path: "/admin/founders",
      name: "Founders Requests",
      icon: <RiUserStarFill />,
    },
    {
      path: "/admin/founders/verified",
      name: "Verified Founders",
      icon: <RiUserStarFill />,
    },
    {
      path: "/admin/ManagePartners",
      name: "Manage Partners",
      icon: <RiUserStarFill />,
    },
    {
      path: "/admin/ManagePodcasts",
      name: "Manage Podcasts",
      icon: <RiUserStarFill />,
    },

    {
      path: "/admin/ManageProjects",
      name: "Manage Projects",
      icon: <RiUserStarFill />,
    },
    {
      path: "/admin/ManageEvents",
      name: "Manage Events",
      icon: <RiUserStarFill />,
    },
    {
      path: "/admin/ManageBlogs",
      name: "Manage Blogs",
      icon: <RiUserStarFill />,
    }
    
  ];

  const sideIconClicked = () => {
    setIsOpen(!isOpen);
    props.setRightHeader(!props.rightHeader);
  };

  const logoutClicked = (name) => {

    if(name==="Logout")
    {
      localStorage.removeItem('admin');
      localStorage.removeItem('loggedin');
      localStorage.removeItem('token');
    }
    }
  
    const homeClicked = () => {
      navigate('/')
    };
  
    

  return (
    <>
      <div className="containerSideBar">
        <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              <img style={{ cursor:'pointer' }} src="data:image/png;base64,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" onClick={homeClicked} />


            </h1>
            {isOpen === false && <div className="divToLevel"></div>}
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={sideIconClicked} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <div>
              <NavLink
                to={item.path}
                key={index}
                className="link"
                onClick={() => logoutClicked(item.name)}
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
            </div>
          ))}
            <div>
                                  
                                
                                </div>
        </div>
      </div>

      <div className="offCanvasMobile">
        {[false].map((expand) => (
          <Navbar
            key={expand}
            bg="light"
            placement="end"
            expand={expand}
            className="mb-3"
          >
            <Container fluid>
              {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                className="offCanvasAdminSidebar"
              >




                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src="data:image/png;base64,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" />
                  </Offcanvas.Title>
                </Offcanvas.Header>





                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <div className="containerSideBarOffCan">
                      <div
                        style={{ width:"403px" }}
                        className="sidebar"
                      >
                       
                        {menuItem.map((item, index) => (
                          <div>
                            <NavLink
                              to={item.path}
                              key={index}
                              className="link"
                              activeclassName="active"
                            >
                              <div className="icon">{item.icon}</div>
                              <div
                                style={{ display: isOpen ? "block" : "none" }}
                                className="link_text"
                              >
                                {item.name}
                              </div>
                            </NavLink>
                          </div>
                        ))}
                               
                      </div>
             
                    </div>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    </>
  );
};

export default SideBarAdmin;
