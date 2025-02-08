import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loading2 from '../../src/images/load.gif';
import { SERVERURL } from '../ServerUrl';
import Card from '../Components/Events/card';
import '../Components/Events/filter.css';
import Header from "../Components/Header/Header";
import RightSide from '../Components/Events/rightSide';
import Footer from "../Components/Footer/Footer";
import '../Components/Events/eventListing.css';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PastEventListing() {
  const [loading, setLoading] = useState(true); // State for loading status

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [country, setCountry] = useState('All countries');
  const [type, setType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoEvents, setCryptoEvents] = useState([]); // State to hold events from API
  function formatTime(time) {
    // Example: convert 24-hour format to 12-hour format
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  // Helper function to get month name from date
  function getMonthName(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[new Date(date).getMonth()];
  }

  // Helper function to format the description
  function formatDescription(description) {
    return description && description.length > 300 ? description.slice(0, 300) + "..." : description;
  }
  useEffect(() => {
    console.log("at least a tw gya");
    // Fetch data from your server using axios or any other library
    axios.get(`${SERVERURL}/api/v1/getPastEvents`)
      .then((response) => {
        // Assuming your API response contains an array of projects
        let eventsData = response.data;
        console.log("past_events",eventsData);

        const transformedEvents = eventsData.map((event) => {
          return {
            id: event._id, // Ensure each event has an ID
            name: event.title,
            month: getMonthName(event.startDate), // Assuming event.startDate contains the date
            year: new Date(event.startDate).getFullYear(),
            toDate: new Date(event.endDate).getDate(),
            fromDate: new Date(event.startDate).getDate(),
            time: `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`,
            countryCode: event.countryCode,
            location: event.location,
            description: event.description,
            shortDescription: event.shortDescription,
            website: event.websiteLink,
            type: event.type,
            image: event.coverImage,
            hashtags: event.hashtags || [],
            media: {
              instagram: event.instagramLink,
              twitter: event.twitterLink,
              linkedin: event.linkedinLink
            }
          };
        });
  
        setCryptoEvents(transformedEvents);
        console.log("at least a tw gya",cryptoEvents);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const sendRight = cryptoEvents.slice(0, 2);
      
  const filteredEvents = cryptoEvents.filter((event) => {
    // Filter by date(to and from)
    const eventDate = new Date(`${event.month} ${event.fromDate}, ${event.year}`);
    if (dateFrom && eventDate < dateFrom) return false;
    if (dateTo && eventDate > dateTo) return false;

    // Filter by country
    if (country !== 'All countries' && event.location.indexOf(country) === -1) return false;

    // Filter by type
    if (type !== 'All' && event.type !== type) return false;

    // Filter by search
    if (searchQuery && !event.name.toLowerCase().includes(searchQuery.toLowerCase()) && !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });
    
    
  return (
    <div>
      <Header />

      {loading && (
            <div className="loading">
              <img className="gif" src={loading2} alt="Loading..." />
            </div>
          )}

          {/* Display projects table when loading state is false */}
          {!loading && (
      <div className="before-filter-container">
      <div className="left-before-filter-container">
        <div className="just-for-the-filter">
          <div className="filters-container">
            <div className="filter-item">
              <label>Date from:</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={dateFrom}
                  onChange={(date) => setDateFrom(date)}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="mm/dd/yyyy"
                  className="date-input-from"
                />
                <FaCalendarAlt
                  onClick={() => document.querySelector('.date-input-from').focus()}
                  className="calendar-icon"
                />
              </div>
            </div>

            <div className="filter-item">
              <label>Date to:</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={dateTo}
                  onChange={(date) => setDateTo(date)}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="mm/dd/yyyy"
                  className="date-input-to"
                />
                <FaCalendarAlt
                  onClick={() => document.querySelector('.date-input-to').focus()}
                  className="calendar-icon"
                />
              </div>
            </div>

            <div className="filter-item">
              <label>Location:</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className="dropdown-input">
                <option value="All countries">All countries</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
                <option value="Brazil">Brazil</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>


            <div className="filter-item">
              <label>Type:</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="dropdown-input">
                <option value="All">All</option>
                <option value="AI">AI</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="DEFI">DEFI</option>
                <option value="Metaverse">Metaverse</option>
                <option value="NFTs">NFTs</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
          </div>
        </div>
        <h2 className="main-tagline-eventlisting">
          Past Bitcoin and Blockchain Conferences
        </h2>
        {(!filteredEvents || filteredEvents.length === 0) ? (
<div className="no-data-message">
  
</div>
) : (filteredEvents.map((event, index) => (
          <Card
            key={index}
            id={event.id}
            name={event.name}
            month={event.month}
            year={event.year}
            toDate={event.toDate}
            fromDate={event.fromDate}
            location={event.location}
            countryCode={event.countryCode}
            description={event.description}
            shortDescription={event.shortDescription}
            website={event.website}
            image={event.image}
            sendRight={sendRight}
            time={event.time}
            hashtags={event.hashtags}
            media={event.media}
          />
        ))
      )}
      </div>
      <div className="right-side-before-footer-container">
        <div className="filter-item">
          <label>&nbsp;</label>
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              placeholder="Search events"
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        </div>
        <RightSide sendRight={sendRight}/>
      </div>
    </div>
          )}


      
      <div style={{marginTop:60}}>
        <Footer />
      </div>
    </div>
  );
}

export default PastEventListing;