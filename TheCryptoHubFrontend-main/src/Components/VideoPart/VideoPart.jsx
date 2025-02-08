import React from "react";
import imgBack from "./../../images/video.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./VideoPart.css";
import ReactPlayer from 'react-player'
import playButton from './../../images/playButton.png'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <ReactPlayer
       
       url={'https://www.youtube.com/watch?v=NUbS9qPwT5M'}
       />
        </Modal.Body>
        
      </Modal>
    );
  }
const VideoPart = () => {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <div className="mainContainerVideo" id="mainContainerVideo">
        <img src={imgBack} className="backImgVideo" />
        <div className="leftYellow"></div>

        <div className="topImageTextVid">
            <img  onClick={() => setModalShow(true)} src={playButton}className="playButton" />
            
            <div className="watchVidTxt">Our Podcast</div>
    <div className="articalIntTxt">An introduction to The Crypto Hub by our Founder.</div>
<div className="articalIntTxt">Watch this section for future interviews with Industry Specialist, Founders and Investors.</div>

        </div>
      </div>

  
   
 
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
     
      
    </>
  );
};

export default VideoPart;
