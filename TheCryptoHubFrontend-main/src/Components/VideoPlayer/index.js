import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import playButtonIcon from '../../images/playbutton2.png'
import Slider from 'react-slick';
import { SERVERURL } from "../../ServerUrl";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import v1 from '../../assets/video/video2.mp4';
import one from '../../assets/images/thum.png';
import two from '../../assets/images/thum2.png';
import three from '../../assets/images/thum3.png';
import four from '../../assets/images/thum4.png';
import 'react-html5video/dist/styles.css';
import PlayPauseIcon from './PlayPauseIcon';
import './Style1.css';
const VideoPlayer = (props) => {
  
  let v22="https://www.youtube.com/watch?v=Ntuzm9QDhs8";
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Initially set to false
  const [isVideoPlaying2, setIsVideoPlaying2] = useState(false); // Initially set to false

  const handleTouchStart = (event) => {
    event.preventDefault();
    handlePlayPause();
  };


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      // Pause the video of the currently active slide
      setActiveSlideIndex(current);
      setIsVideoPlaying(false); // Pause video when changing slides
    },
  };
  const slides = []
  if(props.videoUrl!=="https://www.youtube.com"&&props.videoUrl!==""&&props.videoUrl!==null&&props.videoUrl!==undefined)
  {
    console.log("here here");
    console.log(props.videoUrl);
    slides.push({
      type: 'video',
      src: props.videoUrl
    });
  }
    if(props.pics)
      {
        if(props.pics.length){
        for (let i = 0; i < props.pics.length; i++) {
    
          const pic = props.pics[i];
      
            slides.push({
              type: 'image',
              src: SERVERURL + '/uploads/' + pic,
            });
        }
      }
      
      }  
  console.log("slide:",slides);
  const handleVideoClick = () => {
    setIsVideoPlaying2(prevState => !prevState);
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            {slide.type === 'video' ? (
               <div> 
  <ReactPlayer
                  url={slide.src}
                  width="99%"
                  height="340px"
                  controls={true}
                  
                />
  {/* {!isVideoPlaying2 && (
                  <div className="play-button-overlay" onClick={handlePlayPause}>
                    <img src={playButtonIcon} alt="Play" className="play-button-icon" />
                  </div>
                )} */}
              </div>
            ) : (
              <div>
                <img src={slide.src} alt={`Image ${index}`} />
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoPlayer;