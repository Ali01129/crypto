import React, { useState , useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from "../Components/Header/Header";
import RightSide from '../Components/Events/rightSide';
import Footer from "../Components/Footer/Footer";
import '../Components/Events/eventDetails.css';
import { SERVERURL } from '../ServerUrl';

import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';
function EventDetails() {

  const location = useLocation();
  const { state } = location;
  console.log(state);

  return (
    <div>
      <Header />
        <div className='eventDetails-first-div'>
            <div className='third-component-right'>
                <span className='First-date-heading'>Date:</span>
                <span style={{fontSize:15,color:'#333'}}>{state.month} {state.from} {state.year} - {state.month} {state.to} {state.year}</span>
                <span style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Time:</span>
                <span style={{fontSize:15,color:'#333'}}>{state.time}</span>
                {/* <span style={{fontSize:20,fontWeight:'bold',marginTop:20}}>LocalTime:</span>
                <span style={{ fontSize: 15, color: '#333' }}>
                Timezone: International Date Line West<br />
                Date: {state.month} {state.from} {state.year}<br />
                Time: {state.time}
                </span> */}
                <span style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Location:</span>
                <span style={{fontSize:15,color:'#333'}}>{state.location}</span>
                <span style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Website:</span>
                <a href={state.website}  className="text-blue-500 break-words" target="_blank" rel="noopener noreferrer">{state.website ? state.website : 'https://www.thecryptohub.com'}</a>

            </div>
            <div className='second-component-middle'>
                <h3 className='main-heading-event-details'>{state.name}</h3>
                <div className='hashtags-event-details-top'>
                    {state.hashtags.map((hashtag) => (
                        <span className='hashtags-event-details-inner-text'>{hashtag}</span>
                    ))}
                  </div>
                  <div className='Icons-social-media-event-details'>
                    <a className='social-media-icon-top-of-photo' href={state.media.instagram ? state.media.instagram : 'https://www.instagram.com'} target="_blank" rel="noopener noreferrer">
                      <FaInstagram size={26} />
                    </a>
                    <a className='social-media-icon-top-of-photo' href={state.media.twitter ? state.media.twitter : 'https://www.twitter.com'} target="_blank" rel="noopener noreferrer">
                      <FaTwitter size={26} />
                    </a>
                    <a className='social-media-icon-top-of-photo' href={state.media.linkedin ? state.media.linkedin : 'https://www.linkedin.com'} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin size={26} />
                    </a>
                  </div>
                <img className='image-middle-event-details' src={SERVERURL+'/uploads/'+state.image}/>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.description) }}></div>
            </div>
            <div className='first-component-right'>
              <RightSide sendRight={state.sendRight}/>
            </div>
        </div>
        <div style={{marginTop:60}}>
          <Footer />
        </div>
    </div>
  )
}

export default EventDetails