import React, { useState } from 'react';
import Flag from 'react-world-flags';
import { useNavigate } from "react-router-dom";
import './card.css';

function Card({ id, name, month, year, toDate, fromDate, location, countryCode, description, shortDescription, website, image, sendRight, time, hashtags, media }) {

  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const expandedStyles = {
    maxHeight: '620px',
    transition: 'max-height 1.5s ease-in-out',
    overflow: 'hidden'
  };

  const collapsedStyles = {
    maxHeight: '150px',
    transition: 'max-height 1.5s ease-in-out',
    overflow: 'hidden'
  };
  const countryMappings = {
    UK: 'GB',               // United Kingdom
    UAE: 'AE',              // United Arab Emirates
    USA: 'US',              // United States of America
    Russia: 'RU',           // Russian Federation
    'South Korea': 'KR',    // Republic of Korea
    'North Korea': 'KP',    // Democratic People's Republic of Korea
    Iran: 'IR',             // Islamic Republic of Iran
    Syria: 'SY',            // Syrian Arab Republic
    Vatican: 'VA',          // Holy See (Vatican City State)
    Vietnam: 'VN',          // Socialist Republic of Vietnam
    'Hong Kong': 'HK',      // Hong Kong Special Administrative Region of China
    Taiwan: 'TW',           // Republic of China (Taiwan)
    Palestine: 'PS',        // State of Palestine
    Netherlands: 'NL',      // Kingdom of the Netherlands
    Bolivia: 'BO',          // Plurinational State of Bolivia
    Venezuela: 'VE',        // Bolivarian Republic of Venezuela
    'Ivory Coast': 'CI',    // Côte d'Ivoire
    Tanzania: 'TZ',         // United Republic of Tanzania
    Laos: 'LA'             // Lao People's Democratic Republic
  }

  const getCountryCode = (countryName) => {
    // Check if the countryName exists in the mappings
    return countryMappings[countryName] || countryName; // 'ZZ' can be a default code for unknown countries
};
  const modifiedCountryCode = getCountryCode(countryCode);
  console.log(modifiedCountryCode);
  return (
    <div 
      className={`card-main-click-container`} 
      style={isExpanded ? expandedStyles : collapsedStyles} 
      onClick={handleCardClick}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className='inner-card-main-container'>
          <span className='month-text'>{month}</span>
          <span style={{ fontSize: 18, fontWeight: 'bold' }}>{`${fromDate}-${toDate}`}</span>
          <span className='month-text'>{year}</span>
        </div>
        <div className="container-before-flag-location">
          <h5 style={{ margin: 0 }}>{name}</h5>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Flag className='flag-of-country-inside' code={modifiedCountryCode} />
            <p style={{ margin: 0 }}>{location}</p>
          </div>
          {isExpanded && (
            <div style={{ margin: 0 }}>
              <p>{shortDescription}</p>
              <button
                className='expansion-read-more-button-hidden'
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/user/eventDetails/${id}`,
                    {
                      state: {
                        name: name, month: month, year: year,
                        to: toDate, from: fromDate, location: location,
                        description: description, website: website,
                        image: image, sendRight: sendRight, time: time,
                        hashtags: hashtags, shortDescription: shortDescription ,media: media
                      }
                    });
                }}
              >
                Read More
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='horizontal-line-at-the-end'></div>
    </div>
  );
}

export default Card;
