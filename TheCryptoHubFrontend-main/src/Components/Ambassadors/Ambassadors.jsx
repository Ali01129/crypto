import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Ambassadors.css";
import sliderPic from "./../../images/sliderPic.png";
import sliderPic2 from "./../../images/sliderPic2.png";
import axios from "axios"
import sliderPic3 from "./../../images/sliderPic3.png";
import sliderPic4 from "./../../images/sliderPic4.png";
import linkedin from "./../../images/twitter.png";
import twitter from "./../../images/linkedin.png";
import { useSelector } from "react-redux";
import { getAmbassadors } from "../../redux/CustomerReducer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import sepAmb from "./../../images/sepAmb.png";
import Slider from "react-slick";


import { SERVERURL } from "../../ServerUrl";
const Ambassadors = () => {

  const[user,setUser]=useState();
  const settings = {

    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "27px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
          centerMode: false,
       
        }
      },

    ]
  };
  const [filtered,setFiltered]=useState([]);

useEffect(() => {
  // Fetch data from your server using axios or any other library
  axios.get(`${SERVERURL}/api/v1/getAmbassadors`)
    .then((response) => {
      // Assuming your API response contains an array of projects
      let projectsData = response.data;
setFiltered(projectsData);
//        setSearchedData(projectsData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);
return (
    <>
      <div className="mainContainerAmb" id="mentors" style={{backgroundColor:"#F3F3F3",marginBottom:"0px"}}>
      <div className="topOurParLine" style={{marginTop:"60px"}}>
          <h1 className="whtCrypHeading">Mentors & Ambassadors</h1>
          <div className="txtHeaderComp container container2222 container22224" style={{marginTop:"15px",fontSize:"18px", marginBottom:"-100px",color:"grey"}}>Join our esteemed mentors & ambassadors to be part of the growth of our ecosystem. Let’s grow and build Web3 together!</div>
        </div>

        <div className="mainSlidersTop">    
    <Slider {...settings}>  
      {filtered?.map((item)=>(
      <div className="sliderCard" style={{backgroundColor:"transparent"}}>
            
              <img  className="sliderImgM"  src={SERVERURL+"/uploads/"+item.image} />
              <div className="topBottomTxtSliderPr">
          <div className="topIconsAmb">
            <a href={item.linkedIn} target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href={item.twitter} target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" />
            </a>
          </div>
          <div className="sliderDec">{item.title}</div>
          <div className="headingSlider">{item.fullName}</div>
        </div>
          </div>
      ))   
        }
        </Slider>
        </div>        

        <div className="row justify-content-center" style={{marginTop:"-10px"}}>
            <div className="col" style={{marginBottom:'60px'}}>
              <div className="text-center" >
              <a href="/user/join/crypto" class=" mt-3 viewall1" style={{border:"2px solid grey"}}>
                   Join our Mentors </a>
              </div>
            </div>
            {/*end col*/}
          </div>

      </div>
    </>
  );
};

export default Ambassadors;
