import React, { useState, useEffect, useRef } from "react";
import "./WhyCrypto.css";
import line from "./../../images/lineWhyCr.png";
import line2 from "./../../images/whyCrypt2.png";
import line3 from "./../../images/whyCrypt3.png";
import line4 from "./../../images/whyCrypt4.png";
import { useWindowScroll } from "react-use";

import whyCrypt from "./../../images/whyCrypt.png";
const WhyCrypto = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [scrolled, setScrolled] = useState(0);

  const { x, y } = useWindowScroll();

  useEffect(() => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrolled((y / height) * 100);
      }, [y, scrolled]);


  // const myDiv = document.getElementById('my-div');

  // Get the height of the div element
  // const height = myDiv?.offsetHeight;

  // Log the height to the console
  // console.log(`The height of the div is px.`,height);

  const giveClass = (con) => {
    if (con >= 65 && con <= 75 && screenWidth >= 1590) {
      return "topLeftWhyCrFix";
    } 
    else if(con >= 65 && con <= 82 && screenWidth > 1490 && screenWidth< 1590){
           return "topLeftWhyCrFix";
    }
    else if(con >= 65 && con <= 82 && screenWidth > 991 && screenWidth < 1490){
           return "topLeftWhyCrFix";
    }
    // else if(con >= 55.16 && con <= 76.34 && screenWidth > 1290 && screenWidth< 1390){
    //        return "topLeftWhyCrFix";
    // }
    // else if(con >= 52.23&& con <= 71.34 && screenWidth > 1190 && screenWidth< 1290){
    //        return "topLeftWhyCrFix";
    // }
    // else if(con >= 49.3& con <= 66.34 && screenWidth > 1090 && screenWidth< 1190){
    //        return "topLeftWhyCrFix";
    // }
    // else if(con >= 46.3& con <= 61.34 && screenWidth > 991 && screenWidth< 1090){
    //        return "topLeftWhyCrFix";
    // }
    else{
      return "topLeftWhyCr";
    }

    // if (con >= 61.42 && con <= 89 && screenWidth > 1490) {
    //   return "topLeftWhyCrFix";
    // } else {
    //   return "topLeftWhyCr";
    // }


  };

  return (
    <>
      <div className="mainContainerWhyCrypto" id="mainContainerWhyCrypto">
        <div className="topLeftWhyCrTop">
          <div className={giveClass(scrolled)}>
            {/* className={'topLeftWhyCr'}> */}
            <div className="whyJoinCrHd">Why Join The Crypto Hub?</div>

            <div className="topBottomLineImgWhy">
              <img src={line} />
            </div>
          </div>
        </div>
        <div className="cardWhyCrypTop">
          <div className="cardWhyCryp">
            <img src={whyCrypt} />
            <div className="domainExprTxt">Platform</div>
            <div className="txtWhyCrPara">
            We are building a one-stop platform focussed on founders & investors and the broader Crypto & Web3 community with all the essential tools & resources for marketing & engagement that you need to thrive in the Web3 ecosystem by having access to the right information at the right time!

            </div>
          </div>
          <div className="cardWhyCryp">
            <img src={line2} />
            <div className="domainExprTxt">Events</div>
            <div className="txtWhyCrPara">
            Our online platform is complemented with IRL engagement with specially curated demo-days, start-up pitch sessions and conferences where we focus on providing  value to the community members of our ecosystem.

            </div>
          </div>
          <div className="cardWhyCryp">
            <img src={line3} />
            <div className="domainExprTxt">Investors</div>
            <div className="txtWhyCrPara">
            As an investor, you to join our select group of Web3 angels & VCs to get access to premium early-stage deal-flows and be an essential part of our ecosystem. In the future, our core investors will be invited to join our DAO for additional investor opportunities. 

            </div>
          </div>

          <div className="cardWhyCryp">
            <img src={line4} />
            <div className="domainExprTxt">Founders</div>
            <div className="txtWhyCrPara">
            Short-listed founders get an opportunity to have their start-ups curated as our featured projects and get access to various resources, including monthly meet-ups, pitching sessions, funding from investors and our native DAO in the future.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyCrypto;
