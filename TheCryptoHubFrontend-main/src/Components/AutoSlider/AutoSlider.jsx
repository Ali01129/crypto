import "./AutoSlider.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import sliderPic1 from "./../../images/slider5.svg";
import sliderPic2 from "./../../images/slider2.png";
import sliderPic3 from "./../../images/slider3.png";
import sliderPic4 from "./../../images/slider3.png";
import { getPartners } from "../../redux/CustomerReducer";
import sliderPic5 from "./../../images/slider5.svg";
import sliderPic6 from "./../../images/slider2.png";
import one from './one.png';
import two from './two.png';
import three from './three.png';
import four from './four.png';
import five from './five.png';
import six from './six.png';
import seven from './seven.png';
import eight from './eight.png';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import lineSliHd from "./../../images/lineSliHd.png";
import Slider from "react-slick";


import { SERVERURL } from "../../ServerUrl";
const AutoSlider = () => {
  // const dispatch=useDispatch();
  // const getPartnersData = useSelector(
  //   (state) => state?.CustomerReducer?.getPartnersData
  // );
//  let getPartnersData =[one,two,three,four,five,six,seven,eight];
  

const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3500,
    autoplaySpeed: 3500,
    //   cssEase: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1624,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1174,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 845,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // useEffect(()=>{


  //   dispatch(getPartners())
  // }

  // ,[])

  const [filtered,setFiltered]=useState([]);
  useEffect(() => {
    console.log("at least a tw gya");
    // Fetch data from your server using axios or any other library
    axios.get(`${SERVERURL}/api/v1/getPartners`)
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
      <div className="mainAutoSlider">
        <div>
          <Slider {...settings}>
          {filtered?.map((item)=>(
            <div className="topSliderImgAut">
              <img src={SERVERURL+"/uploads/"+item.image}
               className="sliderImgAuto" />
            </div>
          ))  }
            
          </Slider>
        </div>
      </div>
    </>
  );
};

export default AutoSlider;
