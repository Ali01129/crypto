import React from 'react';
import { useNavigate } from 'react-router-dom';
import './filter.css';
import { SERVERURL } from '../../ServerUrl';

function RightSide({ sendRight = [] }) {  // Default value for sendRight
  const navigate = useNavigate();

  const handleNavigation = (event) => {
      navigate(`/user/eventDetails/${event.id}`,
        {
          state: {
            name: event.name, 
            month: event.month, 
            year: event.year,
            to: event.toDate, 
            from: event.fromDate, 
            location: event.location,
            description: event.description, 
            website: event.website,
            image: event.image, 
            sendRight: sendRight, 
            time: event.time,
            hashtags: event.hashtags, 
            media: event.media
          }
        });
    };

  return (
    <div className="right-side-container">
      <div className="top-picks-container">
        <span className="top-picks-text">Featured Events</span>
      </div>
      {sendRight.length ? (
        sendRight.map((event, index) => (
          <div
            key={index}
            className="top-picks-image-container"
            onClick={() => handleNavigation(event)}
          >
            <img src={SERVERURL+'/uploads/'+event.image} className="top-picks-image" alt={`Top Picks ${index + 1}`} />
          </div>
        ))
      ) : (
        <p>No events available.</p> // Fallback in case there are no events
      )}
    </div>
  );
}

export default RightSide;
