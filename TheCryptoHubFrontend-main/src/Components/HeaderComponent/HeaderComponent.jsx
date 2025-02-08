import React, { useState, useEffect ,useRef} from "react";
import { BsArrowRight } from "react-icons/bs";
import "./HeaderComponent.css";
import Marquee from 'react-fast-marquee';
import { Modal, Button } from "react-bootstrap";
import { Player } from "video-react";
// import "video-react/styles/scss/video-react"; // or import scss
import "video-react/styles/scss/video-react.scss"; // import css

import "video-react/dist/video-react.css"; // import css
import "video-react/styles/scss/video-react.scss"; // import css
import alertVide from "./../../video/VIDEO - TCH  Meetup with Valhalla & Octopus - Istanbul.mp4";
import AOS from "aos";
import backSec from "./../../images/back2.png";
// import "video-react/styles/scss/video-react"; // or import scss

import "aos/dist/aos.css"; // You can also use <link> for styles
// import "node_modules/video-react/dist/video-react.css"; // import css

import { useTypewriter } from "react-simple-typewriter";
import Typewriter from "typewriter-effect";
import WhtISCryp from "../WhtISCryp/WhtISCryp";
import { Link } from "react-router-dom";
import CookiesMessage from "../../CookiesPrompt";
import ReactPlayer from "react-player";
import DOMPurify from 'dompurify';
import { SERVERURL } from '../../ServerUrl';
import axios from 'axios';
import backVid from '../../video/back.mp4';

// import CookiesPrompt from "../../CookiesPrompt";
// ..
AOS.init();

// background-image: url('./../../images/back2.png');

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

const HeaderComponent = () => {

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Handle autoplay errors gracefully
        console.warn('Autoplay failed, muted autoplay required');
      });
    }
  }, []);
  const [stakeholder, setStakeholder] = useState(2);

  const [myState, setMyState] = useState(0);
  const [banner, setBanner] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  useEffect(() => {
    axios.get(`${SERVERURL}/api/v1/getAnnouncement`)
    .then((response) => {
      // Check if there's an announcement or fallback message
      const bannerData = response.data.banner || response.data.message;
      setBanner(bannerData);          
    })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const founderClicked = () => {
    setStakeholder(1);
  };
  const founderClicked1 = () => {
    setStakeholder(2);
  };

  const [text] = useTypewriter({
    words: ["Hello", "From", "Typewriter", "Hook!"],
    loop: 0,
  });
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMyState(1);
    }, 8000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // setShowModal(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(false);
    }, 24000); // delay for 1 second (1000 milliseconds)
  }, []);

  return (
    <>
      <CookiesMessage />
      {/* <CookiesPrompt/> */}
      <div id="about" className="mainHeaderComponent">
      <video loop muted playsInline className="background-video" disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" ref={videoRef}>
        <source src={require('../../video/back.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
        <div className="innerHeaderCompBack">
          <div className={myState == 1 ? "topTyeWriter" : ""} id="applyHere3">
            <Typewriter
              options={
                {
                  // cursor: myState===1?"":"|"
                }
              }
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    '<span class="spanColored" >One Stop for <span class="spanColored" style="color:#392679">Cryptos </span>& <span class="spanColored" style="color:#392679">Web3</span></span>'
                  )
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(5)

                  .callFunction(() => {
                    console.log("All strings were deleted");
                  })
                  .start();
              }}
            />


            <div className="txtHeaderComp">
            We are a unique <span style={{color:"#392679",fontWeight:"bold" }}>marketing</span> & <span style={{color:"#392679" ,fontWeight:"bold"}}>fundraising</span> platform helping accelerate the growth of Blockchain, Crypto & Web3 projects by combining media, events and access to our community of Investors, Mentors & KOLs.
            </div>
          </div>

          <div className="topButtonFounderInves">
            <a href={screenWidth <= "450" ? "/user/signup" : "/user/signup"}>
              {" "}
              <div className="inestBtn">Apply as a Startup</div>
            </a>
            <a href={screenWidth <= "450" ? "/user/join/crypto" : "/user/join/crypto"}>
              {" "}
              <div className="founderBtn">Join the Community</div>
            </a>
          </div>
        </div>



        <div  className="blocks">
      <div className="blocksOuter">
        <div className="block firstBlock">
          <h2>FOUNDERS</h2>
          <p>
          Please apply for your project to be curated among our featured startups
          </p>
        </div>

        <div className="block secondBlock">
          <h2>INVESTORS</h2>
          <p>
          Join our select investors for exclusive early access to curated deal-flows
          </p>
        </div>

        <div className="block thirdBlock">
          <h2>COMMUNITY</h2>
          <p>
          Join to get exclusive access to alpha, events & being part of our ecosystem
          </p>
        </div>
      </div>
    </div>


    {banner && (
  <div className="newsTicker">
    <Marquee speed={78} ><div className="announcementText"><span
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(banner) }}
    />
    </div>
    </Marquee>
    
  </div>
)}
        <WhtISCryp />
      </div>

      <Modal show={showModal} className="topVideoModel">
        <Modal.Header className="headerMdlVid">
          {/* <Modal.Title>Video!</Modal.Title> */}
          <Button
            variant="secondary"
            onClick={handleClose}
            className="btnCloseModelVid"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <video loop="true" autoplay="autoplay" id="vid" muted>
            <source src={alertVide} type="video/mp4" />
            Your browser does not support the video tag.
          </video>{" "}
        </Modal.Body>
        {/* <Modal.Footer>
         
        </Modal.Footer> */}
      </Modal>
      {/* <ReactPlayer url={alertVide} /> */}
      {/* <Player
      playsInline
      poster="/assets/poster.png"
      src={alertVide}
    /> */}
    </>
  );
};

export default HeaderComponent;
