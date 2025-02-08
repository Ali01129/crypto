import React from "react";
import { Link } from "react-router-dom";
import "./Platform.css";
import { BsArrowRight } from "react-icons/bs";

const Platform = () => {
  return (
    <>
      <div className="mainPlatform">
        <div className="cardPlatform">
          <div className="cardPlatformInner">
            <div className="platFormHeader">Platform</div>
            <Link to="/user/signup">
              {" "}
              <div className="btnPlatCard">
                Apply
                <BsArrowRight className="rightArrowBtn" />
              </div>
            </Link>
          </div>
        </div>
        <div className="cardPlatform1">
          <div className="cardPlatformInner">
            <div className="platFormHeader">Community</div>
            <Link to="/user/signup">
              <div className="btnPlatCard">
                Join
                <BsArrowRight className="rightArrowBtn" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Platform;
