import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import backVideo from '../../video/back.mp4';
import axios from "axios";
import { SERVERURL } from "../../ServerUrl";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import "./Ambassadors.css";


const HomeBlogs = () => {
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate();
  const [auctionData, setAuctionData] = useState([]); // State to hold events from API
  const [searchedData, setSearchedData] = useState([]); // State for filtered data
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  // Helper function to get month name from date
  function getMonthName(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[new Date(date).getMonth()];
  }

  // Format the readTime for display
  function formatTime(time) {
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  // Format description text to limit length
  function formatDescription(description) {
    return description && description.length > 300 ? description.slice(0, 300) + '...' : description;
  }

  useEffect(() => {
    // Fetch data from your server using axios
    axios.get(`${SERVERURL}/api/v1/getBlogs`)
      .then((response) => {
        const blogsData = response.data;
        const transformedBlogs = blogsData.map((blog) => ({
          id: blog._id,
          authorName: blog.user.fullName,
          postedDate: `${new Date(blog.createdAt).getDate()} ${getMonthName(blog.createdAt)}`,
          readTime: blog.readTime,
          authorProfilePic: blog.user.image,
          title: blog.title,
          description: blog.description,
          shortDescription: blog.shortDescription,
          category: blog.type,
          image: blog.coverImage,
          ytVideo: blog.ytVideo,
          references: blog.references || []
        }));
        console.log(transformedBlogs);
        setAuctionData(transformedBlogs);
        setSearchedData(transformedBlogs); // Set searched data initially to all blogs
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div id="blogs" className="mainContainerAmb blogsBottom" style={{ marginTop: "10px" ,backgroundColor:"#F3F3F3",paddingBottom:"60px"}}>
      <div className="topOurParLine" style={{marginTop:"50px"}}>
          <h1 className="whtCrypHeading">Blog & News</h1>
          <div className="txtHeaderComp podcastDescription" style={{marginTop:"15px",fontSize:"20px",color:"grey"}}>The latest news & articles curated for our community members</div>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
        {auctionData.length > 0 && (
        <div className="SmallerScreen" style={{ height:"100%", padding: "10px 10px", flexDirection: "column", alignItems:"flex-start",justifyContent:"space-around" }}>
                    <p  
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/user/blogDetail/${auctionData[0]?.id}`, {
                        state: {
                          description: auctionData[0].description,
                          title: auctionData[0].title,
                          shortDescription: auctionData[0].shortDescription,
                          image: auctionData[0].image,
                          ytVideo: auctionData[0].ytVideo,
                          readTime: auctionData[0].readTime,
                          authorName: auctionData[0].authorName,
                          authorProfilePic: auctionData[0].authorProfilePic,
                          postedDate: auctionData[0].postedDate,
                          category: auctionData[0].category,
                          references: auctionData[0].references
                        }
                      });
                    }}
                    style={{ cursor:"pointer",    fontWeight: "600", color: "#333" ,alignItems:"flex-start",textAlign:"left",marginBottom:"10px"}}>
                      {auctionData[0].title}
                    </p>
                  </div>
        )}

        <div className="PodcastContainer" >
          {/* Left Side - Thumbnail for First Video */}
        
          <div className="leftMainVideo"style={{background:"white" , backgroundColor:"white"}} >
            {auctionData.length > 0 && (
              <>
              <div className="firstThumbnail" style={{height:'86%'}} onClick={(e) => {
                e.preventDefault();
                navigate(`/user/blogDetail/${auctionData[0]?.id}`, {
                  state: {
                    description: auctionData[0].description,
                    title: auctionData[0].title,
                    shortDescription: auctionData[0].shortDescription,
                    image: auctionData[0].image,
                    ytVideo: auctionData[0].ytVideo,
                    readTime: auctionData[0].readTime,
                    authorName: auctionData[0].authorName,
                    authorProfilePic: auctionData[0].authorProfilePic,
                    postedDate: auctionData[0].postedDate,
                    category: auctionData[0].category,
                    references: auctionData[0].references
                  }
                });
              }}>
                <img
                  src={SERVERURL + "/uploads/" + auctionData[0].image} // Using the thumbnail URL from the first video object
                  alt={auctionData[0].title}
                  style={{ width: "100%",height:"100%",background:"transparent", objectFit:"cover", cursor: "pointer",borderRadius:"5px" }} // Image fills the container and changes cursor
                />
              </div>
                      <div className="firstVideoText" style={{ height:"100%", display: 'flex', flexDirection: "column", alignItems:"flex-start",alignSelf:'flex-start',justifyContent:'flex-start' }}>
                      <p  
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/user/blogDetail/${auctionData[0]?.id}`, {
                          state: {
                            description: auctionData[0].description,
                            title: auctionData[0].title,
                            shortDescription: auctionData[0].shortDescription,
                            image: auctionData[0].image,
                            ytVideo: auctionData[0].ytVideo,
                            readTime: auctionData[0].readTime,
                            authorName: auctionData[0].authorName,
                            authorProfilePic: auctionData[0].authorProfilePic,
                            postedDate: auctionData[0].postedDate,
                            category: auctionData[0].category,
                            references: auctionData[0].references
                          }
                        });
                      }}
                      style={{ cursor:"pointer",    fontWeight: "600", fontSize: "1.4vw", color: "#333" ,alignItems:"flex-start",textAlign:"left",marginBottom:"-1px "}}>
                        {auctionData[0].title}
                      </p>
                      <p style={{ fontSize: "1.1vw", color: "#777" }}>
                      {auctionData[0].readTime} read • {formatDate(auctionData[0].postedDate)}
                      </p>
                    </div>
                    </>
            )}
          </div>

          {/* Right Side - Thumbnails for Other Videos */}
          <div className="rightSideThumbnails">
            {auctionData.length > 1 &&
              auctionData.slice(1, 4).map((video, index) => (
                <div className="thumbnail" style={{cursor:"pointer",background:"white"}}
                key={index} onClick={(e) => {
                  e.preventDefault();
                  navigate(`/user/blogDetail/${video?.id}`, {
                    state: {
                      description: video.description,
                      title: video.title,
                      shortDescription: video.shortDescription,
                      image: video.image,
                      ytVideo: video.ytVideo,
                      readTime: video.readTime,
                      authorName: video.authorName,
                      authorProfilePic: video.authorProfilePic,
                      postedDate: video.postedDate,
                      category: video.category,
                      references: video.references
                    }
                  });
                }}>
                  <div style={{width:"70%",height:"90%",marginLeft:"8px"}}>
                  <img
                    src={SERVERURL + "/uploads/" + video.image} // Using the thumbnail URL from the video object
                    alt={video.title}
                    style={{ width: "100%",height:"100%", cursor: "pointer",objectFit:"cover",borderRadius:"5px" }} // Image fills the container and changes cursor
                  />
                  </div>
                  <div className="justifyTexts" style={{ width: "80%",height:"100%", padding: "10px 10px", display: 'flex', flexDirection: "column", alignItems:"flex-start" ,justifyContent:"space-around" }}>
                    <p className="fontStyleTitle"
                    style={{ fontWeight: "600", color: "#333" ,alignItems:"flex-start",textAlign:"left",marginBottom:"5px "}}>
                      {video.title}
                    </p>
                    <p className="fontStyleShort"
                    style={{ fontWeight: "400", color: "#333" ,alignItems:"flex-start",textAlign:"left",marginBottom:"5px "}}>
                      {video.shortDescription}
                    </p>
                    <p className="fontStyleRead" style={{  color: "#777" }}>
                    {video.readTime} read • {formatDate(video.postedDate)}
                    </p>




                  </div>
                </div>
              ))}
          </div>
          
          
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
      </div>
    </>
  );
};

export default HomeBlogs;
