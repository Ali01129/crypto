import React from "react";
import "./Stakeholder.css";
import { BsArrowRight } from "react-icons/bs";
const Stakeholder = () => {
  return (
    <>
      <div className="mainContainerStakeHolder"
      id="mainContainerStakeHolder"
      >
        <div className="cardStkHldr">
          <div className="cardStkHeading"> Founders</div>
          <div className="cardMainTxtStk">
            Access vetted investment opportunities in startups, real estate,
            video games, and crypto.
          </div>
          <input placeholder="Email" className="emailInputStk" />
          <div className="home-content--btn1">
            <div className="hover-btn1"></div>
            <button className="content-btn--inner1">
              <p>Submit Your Projects!</p>
            </button>
          </div>
          {/* <button className="btnSubmitStk">Submit Your Projects
          
          <BsArrowRight className="rightArrowBtn"/>
          </button> */}
        </div>
        <div className="cardStkHldr">
          <div className="cardStkHeading"> Investors</div>
          <div className="cardMainTxtStk">
            Invest in the future you believe in.
          </div>
          <input placeholder="Email" className="emailInputStk" />
          <div className="home-content--btn1">
            <div className="hover-btn1"></div>
            <button className="content-btn--inner1">
              <p>Register Your Interests!</p>
            </button>
          </div>
          {/* <button className="btnSubmitStk">Register Your Interests
          <BsArrowRight className="rightArrowBtn"/>
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Stakeholder;
