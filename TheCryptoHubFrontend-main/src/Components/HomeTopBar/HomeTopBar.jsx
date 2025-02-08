import React from "react";
import { useState } from "react";
import "./HomeTopBar.css";
const HomeTopBar = () => {
  const [cross, setCross] = useState(true);

  const clickedCross = () => {
    setCross(false);
  };

  return (
    <>
      {cross && (
        <div className="mainHomTopBar">
          <div className="crossTopBar" onClick={clickedCross}>
            x
          </div>

          <div className="txtmainHomeTp">
            <span className="spTopBar"> EVENT ALERT: </span>We are thrilled to announce Future Blockchain Summit taking place on 13-16 October in Dubai.
            <a href="https://www.futureblockchainsummit.com/" target="_blank">
              {" "}
              <span className="spTopBarEnd">Please register and join us!</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeTopBar;
