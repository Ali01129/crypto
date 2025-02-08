import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVERURL } from "../../ServerUrl";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import "./Ambassadors.css";


const Podcasts = () => {
  const [filtered, setFiltered] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // Store the selected video link
  const isMobile = window.innerWidth <= 768; // Define your mobile breakpoint
  useEffect(() => {
    axios
      .get(`${SERVERURL}/api/v1/getPodcasts`)
      .then((response) => {
        const projectsData = response.data;
        setFiltered(projectsData);
        console.log("Fetched Podcasts Data:", projectsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openModal = (videoLink) => {
    setSelectedVideo(videoLink);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <div id="podcast" className="mainContainerAmb" style={{ marginTop: "0px" }}>
      <div className="topOurParLine" style={{marginTop:"50px"}}>
          <h1 className="whtCrypHeading">Our Podcast</h1>
          <div className="txtHeaderComp podcastDescription" style={{marginTop:"15px",maxWidth:"65.5vw",fontSize:"20px",color:"grey"}}>Join our Youtube channel where we bring you premier content from the best events, Founder and KOL interviews & Market reviews on the hottest Web3 topics.</div>
        </div>
        {filtered.length > 0 && (
        <div className="SmallerScreen" style={{ height:"100%", padding: "10px 10px", flexDirection: "column", alignItems:"flex-start",justifyContent:"space-around" }}>
                    <p style={{ fontWeight: "600",  color: "#333" ,alignItems:"flex-start",textAlign:"left",marginBottom:"10px "}}>
                      {filtered[0].title}
                    </p>
                    
                  </div>
        )}

        <div style={{display:"flex",flexDirection:"column"}}>

        <div className="PodcastContainer" >
          {/* Left Side - Thumbnail for First Video */}
        
          <div className="leftMainVideo" style={{overflow:'visible'}}>
            {filtered.length > 0 && (
              <>
              <div className="firstThumbnail" onClick={() => openModal(filtered[0].link)} style={{height:'86%'}}>
                <img
                  src={SERVERURL + "/uploads/" + filtered[0].thumbnail} // Using the thumbnail URL from the first video object
                  alt={filtered[0].title}
                  style={{ width: "100%",height:"100%",objectFit:"cover", cursor: "pointer",borderRadius:"5px" }} // Image fills the container and changes cursor
                />
              </div> 
               <div onClick={() => openModal(filtered[0].link)} className="firstVideoText" style={{ height:"100%", display: 'flex', flexDirection: "column", alignItems:"flex-start",alignSelf:'flex-start',justifyContent:'flex-start',width:"100%" }}>
               <p style={{ fontWeight: "600", fontSize: "1.4vw", color: "#333" ,alignItems:"flex-start",textAlign:"left",marginBottom:"-1px ", cursor: "pointer"}}>
                 {filtered[0].title}
               </p>
               <p style={{ fontSize: "1.2vw", color: "#777" }}>
                 Uploaded: {formatDate(filtered[0].createdAt)}
               </p>
             </div>
             </>
            )}
          </div>

          {/* Right Side - Thumbnails for Other Videos */}
          <div className="rightSideThumbnails">
            {filtered.length > 1 &&
              filtered.slice(1, 4).map((video, index) => (
                <div className="thumbnail" key={index} onClick={() => openModal(video.link)} style={{cursor:"pointer"}}>
                  <div style={{width:"70%",height:"90%",marginLeft:"8px"}}>
                  <img
                    src={SERVERURL + "/uploads/" + video.thumbnail} // Using the thumbnail URL from the video object
                    alt={video.title}
                    style={{ width: "100%",height:"100%", cursor: "pointer",objectFit:"cover",borderRadius:"5px" }} // Image fills the container and changes cursor
                  />
                  </div>
                  <div style={{ width: "80%",height:"100%", padding: "10px 10px", display: 'flex', flexDirection: "column", alignItems:"flex-start",justifyContent:"space-around" }}>
                    <p className="fontStyleTitle1" style={{ fontWeight: "600", color: "#333" ,alignItems:"flex-start",textAlign:"left",marginBottom:"5px "}}>
                      {video.title}
                    </p>
                    <p className="fontStyleUploaded" style={{  color: "#777" }}>
                      Uploaded: {formatDate(video.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          
          
        </div>

        <div className="row justify-content-center" style={{marginTop:"45px"}}>
            <div className="col" style={{marginBottom:'50px'}}>
              <div className="text-center" >
              <a href="https://www.youtube.com/@thecryptohub_com" target="_blank"  class=" mt-3 viewall1" style={{border:"2px solid grey"}}>
                   Subscribe to Channel</a>
              </div>
            </div>
            {/*end col*/}
          </div>
       
     
        

                  </div>

        {/* {filtered.length > 0 && (
        <div className="PodcastContainer">
        <div style={{ width: "100%", padding: "2px 1px 2px 0px", display: 'flex', flexDirection: "column" }}>
                  <p style={{ fontWeight: "600", fontSize: "20px", color: "#333",marginBottom:"0px " }}>
                    {filtered[0].title}
                  </p>
                  <p style={{ fontSize: "15px", color: "#777" }}>
                    Uploaded: {formatDate(filtered[0].createdAt)}
                  </p>
                </div>
                
</div>
)} */}
        {/* Modal for Video */}
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal} 
          contentLabel="Video Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dull background
              zIndex: '1000'
            },
            content: {
              
              top: isMobile ? '30%' : '20%', // Conditional height
              left: '20%',
              zIndex: '1001',
              background: 'transparent', // Make the background transparent
              border: 'none', // Remove border
              padding: 0, // Remove padding
              width: '59%',
              height: isMobile ? '50%' : '65%', // Conditional height
              maxWidth: '90%', // Limit width for mobile
              maxHeight: '90%', // Limit height for mobile
            },
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            
            {selectedVideo && (
              <ReactPlayer
                url={selectedVideo}
                width="100%"
                height="100%"
                controls
              />
            )}
          </div>
        </Modal>
        

      </div>
    </>
  );
};

export default Podcasts;
