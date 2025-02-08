import React, { useState, useEffect } from 'react';
import loading2 from '../../../src/images/load.gif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVERURL } from '../../ServerUrl';

import './Blogs.css';

const Blogs = () => {
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

  const handleClick = (event) => {
    const buttonValue = event.target.value;
    if (selectedButton === buttonValue) {
      setSelectedButton(null); // Deselect button
      setSearchedData(auctionData); // Show all data
    } else {
      setSelectedButton(buttonValue);
      const filteredData = auctionData.filter((item) => item.category === buttonValue);
      setSearchedData(filteredData); // Filter by category
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className='revise'>
        <div className="new45 new12 wrapisss">
          <div className="leftwala">
            <p className="fontheading2 leftpadiss">Daily articles that level you up</p>
            <p className="fontpara leftpadiss">
              Join the world's most popular crypto community with daily alpha, news, & analysis, all free.
            </p>
          </div>
          <div className="rightaligned" style={{ marginTop: '30px' }}>
            <div className="toppp">
              {['AI', 'DeFi', 'Metaverse', 'NFTs', 'Infrastructure', 'Gaming'].map((category) => (
                <button
                  key={category}
                  className={`filterrr ${selectedButton === category ? 'clicked' : ''}`}
                  value={category}
                  onClick={handleClick}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {loading && (
            <div className="loading">
              <img className="gif" src={loading2} alt="Loading..." />
            </div>
          )}

          {/* Display projects table when loading state is false */}
          {!loading && (
      <section className="new1234">
      <div style={{minWidth:"100%"}}>
        <div className="row row-cols-lg-2 g-4">
        {(!searchedData || searchedData.length === 0) ? (
<div className="no-data-message">
</div>
) : (searchedData?.map((data, index) => (
            <div className="wowow col" key={index} >
              <div className="card nft-items nft-primary nft-auction upperrounded shadow1 overflow-hidden biggerwidth hoveris heightisss"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/user/blogDetail/${data?.id}`, {
                    state: {
                      description: data.description,
                      title: data.title,
                      shortDescription: data.shortDescription,
                      image: data.image,
                      ytVideo: data.ytVideo,
                      readTime: data.readTime,
                      authorName: data.authorName,
                      authorProfilePic: data.authorProfilePic,
                      postedDate: data.postedDate,
                      category: data.category,
                      references: data.references
                    }
                  });
                }}>
                <div className='blogOuter'>
                  <div className='blogLeft'>
                    <div className='blogLeft1'>
                      Written by <span className='writenby'> {data.authorName} </span>
                      <span className='timeissss'>• {data.postedDate} • {data.readTime}</span>
                    </div>
                    <div className='blogLeft2'>{data.title}</div>
                    <div className='blogLeft3'>{data.shortDescription}</div>
                    <div className='blogLeft4'>
                      <div className="keywordz">{data.category}</div>
                    </div>
                  </div>
                  <div className='blogRight'><img src={SERVERURL + '/uploads/' + data.image} alt="" className='blogimg' /></div>
                </div>
              </div>
            </div>
          
        ))
      )}
        </div>
      </div>
    </section>
          )}
    </>
  );
}

export default Blogs;
