import React from "react";
import "./WhtISCryp.css";
import curveImg from "./../../images/curve.png";
import whtCrypImg from "./../../images/whtCrypImg.png";
import whtCrypImg2 from "./../../images/whtCrypImg11.png";
import whtCrypImg3 from "./../../images/whtCrypImg22.png";
import whtCrypImg4 from "./../../images/whtCrypImg33.png";

import separatorRight from "./../../images/separatorRight.png";
import imgHeading from "./../../images/headingWhtCrypto.png";
import imgHeading1 from "./../../images/whtCrypImg1.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const WhtISCryp = () => {

  const navigate=useNavigate();
  const registerFoundClicked=()=>{
    
navigate('/user/join/crypto')
window.scrollTo(0, 0);

  }
  return (
    <>
    <div className="outerrIs">
      <div className="mainContainerWhtIsCryp" id="applyHere">
      <h1 className="whtCrypHeading" style={{color:"black"}}>Why Join TheCryptoHub?</h1>
      <div className="txtHeaderComp container container2222 container3333 " style={{marginTop:"-55px",fontSize:"20px", paddingBottom:"50px",color:"grey"}}> Our Web3 focussed services for Founders, Investors & the Community!</div>
     
      <div className="BoxesOuter">
        <div className="box box1">
          <img src={whtCrypImg} alt="Advisory" className="boxLogo" style={{marginBottom:"5px"}}/>
          <h2>Advisory</h2>
          <p>
          Our advisory services focus on the growth & market readiness for early stage projects from ideation to Token launch, Exchange Listings & Market Making. Over the years we have helped projects in their tokenomics, business planning & go to market strategies.
          </p>
        </div>

        <div className="box box2">
          <img src={whtCrypImg2} alt="Marketing" className="boxLogo" style={{marginBottom:"5px"}}/>
          <h2>Marketing</h2>
          <p>
          We understand the nuances and the challenges that Web3 projects face in this constantly evolving & nascent space. Our customised marketing approach focusses on growth & brand building with our internal expertise and through our partners including leading media & KOLs.
          </p>
        </div>

        <div className="box box3">
          <img src={whtCrypImg3} alt="Events" className="boxLogo" style={{marginBottom:"5px"}}/>
          <h2>Events</h2>
          <p>
          We understand the power of engagement and community building and have been partnering with the top Crypto & Web3 events worldwide and creating curated events, meetups & demo days bringing together founders, investors & our community. 
          </p>
        </div>

        <div className="box box4">
          <img src={whtCrypImg4} alt="Media" className="boxLogo" style={{marginBottom:"5px"}} />
          <h2>Media</h2>
          <p>
          A robust media strategy is the lifeline of brand building & community engagement, and we are creating a premier media channel with a Podcast, Blog & Newsletter with news & stories of founders, KOLs and the markets to share with our growing global community of Crypto & Web3 enthusiasts.
          </p>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default WhtISCryp;
