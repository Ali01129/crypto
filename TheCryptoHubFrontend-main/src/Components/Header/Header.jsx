import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./Header.css";
import Nav from "react-bootstrap/Nav";
import Cookies from "universal-cookie";
import Tippy from "@tippyjs/react";
import { HashLink } from "react-router-hash-link";

import { BsArrowRight } from "react-icons/bs";
import { FaBars } from 'react-icons/fa';
import "tippy.js/dist/tippy.css"; // optional

import { FaRegEdit } from "react-icons/fa";
import Navbar from "react-bootstrap/Navbar";

import logo from "./../../images/logo-crypto 2.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link,useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const cookies = new Cookies();
const Header = () => {
  const navigate=useNavigate();
  const [token, setToken]=useState(localStorage.getItem('loggedin'));
  const [navbarColor, setNavbarColor] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbarColor(true);
    } else {
      setNavbarColor(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const logoutClicked = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("token");

    setToken(null);
    // cookies.remove('_id', { path: '/' })
    
    navigate("/user/login");
  };


  const handleToggle = () =>{
    setExpanded(!expanded);

    console.log("Clicked")
  };

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
          if (decodedToken.exp < currentTime) {
            // Token is expired
            localStorage.removeItem("token"); // Remove the expired token
            localStorage.removeItem("loggedin");
            setToken(null); // Update the state to reflect the token removal
            navigate("/user/login"); // Redirect to login page or show a message to the user
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    const tokenCheckInterval = setInterval(checkTokenExpiry, 60000); // Check token expiry every minute

    // Clean up interval on component unmount
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, []);
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        onToggle={handleToggle}
        expanded={expanded}
      >
        <Container fluid className={navbarColor ? "navbar active" : "navbar"} >
          <Navbar.Brand href="/" className="navbarBrand">
            <img src={logo} className="logoImg"  />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{ color: "white" }}
          >
            <FaBars className="threeLine" />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
          <Nav
              className=" my-2 my-lg-0 firstNav"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              
           
                <Nav.Link>
                <Tippy
                  content={
                    <span className="mainContentTippy">
                      
                     {/* {screenWidth<="450"? 
                    
                      <Navbar.Toggle>
                      <HashLink
                        to={screenWidth <= "450" ? "#applyHere3" : "#applyHere"}
                      >
                        <span> About</span>
                      </HashLink>

                      </Navbar.Toggle>
                      :
                       <HashLink
                       to={screenWidth <= "450" ? "#applyHere3" : "#applyHere"}
                     >
                       <span> About</span>
                     </HashLink>
                      } */}
                       {/* <Navbar.Toggle></Navbar.Toggle> */}
                      
                       <HashLink to="/#podcast"
                       className="myown"
                        onClick={handleToggle}
                      >
                        <span> Podcast</span>
                      </HashLink>

                      <HashLink to="/#blogs"
                      className="myown"
                        onClick={handleToggle}
                        
                      >
                        <span > Blog</span>
                      </HashLink>
                      <HashLink to="/#newsletter"
                      className="myown"
                      
                      onClick={handleToggle}
                      >
                        <span>  NewsLetter</span>
                      </HashLink>
                    </span>
                  }
                  interactive={true}
                  placement="bottom"
                >
                  <button className="btnTippies"> Media</button>
                </Tippy>
              </Nav.Link>
              <Nav.Link>
                <Tippy
                  content={
                    <span className="mainContentTippy">
                      

                      
                      <HashLink to="/#projects"
                      className="myown"
                        onClick={handleToggle}
                      >
                        <span> View</span>
                      </HashLink>
                      <HashLink to="/user/join/crypto"
                        onClick={handleToggle}
                        className="myown"
                      >
                        <span> Apply</span>
                      </HashLink>

                    </span>
                  }
                  interactive={true}
                  placement="bottom"
                >
                  <button className="btnTippies"> Projects</button>
                </Tippy>
              </Nav.Link>
              <Nav.Link as="div">
                <Tippy
                  content={
                    <span className="mainContentTippy">
              
              <a href="https://linktr.ee/thecryptohubcom" target="_blank" className="myown" onClick={handleToggle}>
                        <span> Linktree</span>
                      </a>
                                      
<a href="https://x.com/thecryptohubcom?mx=2" target="_blank" className="myown" onClick={handleToggle}
                        >
                        <span> X/Twitter</span>
                      </a>
                      <a href="https://www.instagram.com/thecryptohub_com/" target="_blank" className="myown" onClick={handleToggle}
>
                        <span> Instagram</span>
                      </a>
                      <a href="https://api.whatsapp.com/send?phone=29" target="_blank" className="myown" onClick={handleToggle}>

                        <span> Whatsapp</span>
                      </a>


                      <a href="https://t.me/thecryptohub_com" target="_blank" className="myown" onClick={handleToggle}>


                      
                        <span> Telegram</span>
                      </a>
                      
                    </span>
                  }
                  interactive={true}
                  placement="bottom"
                >
                  <button className="btnTippies"> Community</button>
                </Tippy>
              </Nav.Link>

              <Nav.Link>
                <Tippy
                  content={
                    <span className="mainContentTippy">
                      

                      <HashLink to="/user/events"
                      className="myown"
                        onClick={handleToggle}
                      >
                        <span> Calendar</span>
                      </HashLink>

                      <HashLink to="/user/past/events"
                      className="myown"
                        onClick={handleToggle}
                      >
                        <span> Past Events</span>
                      </HashLink>
                      <HashLink to="/user/events"
                      className="myown"
                        onClick={handleToggle}
                      >
                        <span> Upcoming Events</span>
                      </HashLink>

                    </span>
                  }
                  interactive={true}
                  placement="bottom"
                >
                  <button className="btnTippies"> Events</button>
                </Tippy>
              </Nav.Link>

                {/* <Nav.Link onClick={handleToggle}>
                  <HashLink to="/#projects">Projects</HashLink>
                </Nav.Link>
                <Nav.Link >
                  <HashLink to="/user/blogs" >Blogs</HashLink>
                </Nav.Link>
                <Nav.Link >
                  <HashLink to="/user/events" >Events</HashLink>
                </Nav.Link> */}



              



              {/* <Nav.Link>              
                <Tippy
                  content={
                    <span className="mainContentTippy">
                      
                     
                    
                       {/* <Navbar.Toggle></Navbar.Toggle>
                      <HashLink to="/user/createEvent"
                        onClick={handleToggle}
                      >
                        <span> Add Event</span>
                      </HashLink>

                      <HashLink to="/user/eventListing"
                        onClick={handleToggle}
                      >
                        <span> View List</span>
                      </HashLink>
                    </span>
                  }
                  interactive={true}
                  placement="bottom"
                >
                  <button className="btnTippies"> Events</button>
                </Tippy>
              </Nav.Link>
              <Nav.Link>
                <Tippy
                  content={
                    <span className="mainContentTippy">
                      
                     
                     
                       {/* <Navbar.Toggle></Navbar.Toggle>
                      <HashLink to="/user/createBlog"
                        onClick={handleToggle}
                      >
                        <span> Add Blog</span>
                      </HashLink>

                      <HashLink to="/user/blogs"
                        onClick={handleToggle}
                      >
                        <span> View List</span>
                      </HashLink>
                    </span>
                  }
                  interactive={true}
                  placement="bottom"
                >
                  <button className="btnTippies"> Blogs</button>
                </Tippy>
              </Nav.Link>
              <Nav.Link>
                <Tippy
                  content={
                    <span className="mainContentTippy">
                      
                      <Link to="/user/createProject">
                        {" "}
                        <span>Add Project</span>
                      </Link>
                      <Link to="/user/projects">
                        {" "}
                        <span>View List</span>
                      </Link>

                    </span>
                  }
                  interactive={true}
                  placement="bottom"
                >
                  <button className="btnTippies"> Projects </button>
                </Tippy>
              </Nav.Link> */}
            </Nav>
            
          <Nav
              className=" my-2 my-lg-0 topLogoNav"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="smallblacklogo">
                <img src={logo} className="logoImg logoImgHide" />
              </Nav.Link>
            </Nav>
            
            <Nav
              className=" my-2 my-lg-0 topLogSign"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="loginNavApply2">
                <Link style={{display:"flex",alignItems:"center",justifyContent:"center"}} to="/user/join/crypto"> Apply <BsArrowRight className="rightArrowApply" /></Link>
                
              </Nav.Link>

              {!token  && (
                <Nav.Link className="loginNavApply1">
                  <Link to="/user/login">Login</Link>
                </Nav.Link>
              )}


              {!token  && (
                <Nav.Link className="loginNavApply123">
                  <Link to="/user/signup">Register</Link>
                </Nav.Link>
              )}

              {token && (
                <Nav.Link className="loginNavApply2" onClick={logoutClicked}>
                   <Link >Logout</Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;