import React from "react";
import arrow from './../../images/footerArrow.png'

import { AiOutlineWhatsApp } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im';
import logo from './../../images/logo-crypto 2.png'
import logo1 from './../../images/social1.png'
import logo2 from './../../images/social2.png'
import logo3 from './../../images/social3.png'
import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import logo4 from './../../images/social4.png'
import logo5 from './../../images/social5.png'
import './Footer.css'
import { Link } from "react-router-dom";
const Footer = () => {
  const navigate=useNavigate();
  const privacyClicked=()=>{
    window.scrollTo(0, 0)
    navigate("/user/privacy/policy")
  }
  return (
    <>
    <div  className="mainTopContainer">
      <div className="mainContainerFooter">
        <div className="topCol1Footer">
          <div><img src={logo}  className="logoFooterImg" /></div>
          <p style={{color:"white"}}>© The Crypto Hub. All Rights Reserved.</p>
        
          <div className="secondColFooter2">
          <div style={{display:"flex",alignItems:"flex-start"}}>
<div style={{display:"flex",alignItems:"center"}}>
                <div className="socially"><a href="https://www.instagram.com/thecryptohub_com/" target="_blank" > <div style={{width:"20px",height:"20px"}}><img src={logo1} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div>  </a></div>
                <div className="socially"><a href="https://www.youtube.com/@thecryptohub_com" target="_blank" >  <div style={{width:"20px",height:"20px"}}><img src={logo2} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div></a></div>
                  
              
                <div className="socially"><a href="https://www.linkedin.com/company/thecryptohubcom" target="_blank" > <div style={{width:"20px",height:"20px"}}> <img src={logo4} style={{width:"100%",height:"100%",objectFit:"contain"}} /></div></a></div>
                <div className="socially"><a href="https://twitter.com/thecryptohubcom" target="_blank" > <div style={{width:"20px",height:"20px"}}>  <img src={logo5} style={{width:"100%",height:"100%",objectFit:"contain"}} /></div></a></div>
   </div>
               </div>
</div>
</div>
        
        <div className="topRightFooter">
        <div className="secondColFooter">
          <div className="firstRowTxtHdr" >Legal</div>
          <div><Link to="/user/privacy/policy" ><div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>Privacy</div></Link></div>
          <div><Link to="/user/privacy/policy"> <div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>Terms of use</div></Link></div>
         
          


        </div>
        <div className="secondColFooter">
          <div className="firstRowTxtHdr">Quick Links</div>
          <div><Link to="/user/projects" className="linkIsthis" > <div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>View Projects</div></Link></div>
          {/* <div><Link to="/user/createProject" className="linkIsthis" > <div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px" }}>Upload Project</div></Link></div> */}

          <div><Link to="/user/blogs" className="linkIsthis"> <div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>View Blogs</div></Link></div>
          {/* <div><Link to="/user/createBlog" className="linkIsthis" > <div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>Upload Blog</div></Link></div> */}

          <div><Link to="/user/events" className="linkIsthis"><div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>View Events</div></Link></div>
          {/* <div><Link to="/user/createEvent" className="linkIsthis" > <div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>Upload Event</div></Link></div>
          */}
          


        </div>
        <div className="secondColFooter">
        <div  className="firstRowTxtHdr">Learn</div>
          <div> <HashLink to="/#about" className="linkIsthis"><div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>About</div></HashLink></div>
          <div> <HashLink to="/#applyHere" className="linkIsthis"><div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>Why Join</div></HashLink></div>
          <div><HashLink to="/#podcast" className="linkIsthis"><div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>Podcast</div></HashLink></div>           
          <div><Link to="/user/contact" className="linkIsthis"><div style={{color:"rgb(209 213 219)",fontSize: "0.95rem"
,marginBottom:"10px"}}>Contact Us</div></Link></div>


        </div>
        </div>


       
      </div>

      <div className="speratareFooter">

      </div>

      <div className="mainContainerFooter1">
        <div className="topCol1Footer5 ">
          {/* <img src={arrow}  className="logoFooterImg1" /> */}

        
        </div>
        <div className="topRightFooter5">
        <div className="secondColFooter1">
        
      
        </div>
        </div>


       
      </div>

      </div>
    </>
  );
};

export default Footer;
