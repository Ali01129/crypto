import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ComboboxSortBy'
const Combobox = (props) => {
  const icotype = props.dataIs;
const widthIs=props.widthIs;
  const searchResultsRef = useRef(null);
  const searchInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false); // New state variable

  useEffect(() => {
    // Add event listener to check for clicks outside the search input and search results container
    const handleOutsideClick = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchResults([]); // Hide the search results
      }
    };

    document.addEventListener('click', handleOutsideClick);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsOptionSelected(false); // Reset isOptionSelected when the user types in the input

    // Filter the options based on the search term
    const filteredResults = icotype.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  const handleSelect = (value) => {
    setSearchTerm(value);
    setSearchResults([]);
    setIsOptionSelected(true); // Set isOptionSelected to true when an option is selected
    if (props.onSelect) {
      props.onSelect(value);
    }
  };

  const showAllOptions = () => {
    setSearchResults(icotype);
  };

  return (
    <div style={{ position: 'relative',margin:'0px 3px' }}>
      {/* Icon */}
      {props.valueis==='true' && (
        <div
          style={{
            position: 'absolute',
            left: '20px',
            paddingRight:'5px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: '1',
            color: 'grey',
            fontSize:'17px'
          }}
        >
          Sort by: 
        </div>
      )}

{props.valueis==='false' &&searchTerm === '' && (
        <div
          style={{
            position: 'absolute',
            left: '10px',
            paddingRight:'5px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: '1',
          }}
        >
          <i className={props.classIs} style={{ color: 'white' }} />
        </div>
      )}

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={showAllOptions}
        ref={searchInputRef}
        className={props.anchor === 'true' ? "input1  ":'input2' }
        style={{
          padding: '5px',
          border:'none',
          borderLeft: '3px solid #e7e6e6',
          outline: 'none',
          boxShadow: 'none',
          cursor: props.anchor === 'true' ? 'pointer' : 'auto',
          color:'grey',
          width: widthIs?'225px':'200px',
          height:'45px',
          backgroundColor: 'white',
          paddingLeft: searchResults.length === 0 && !isOptionSelected ? '70px' : '70px', // Adjust the padding based on the icon presence and option selection
        
      
        }}
        placeholder={props.placeholderIs}
      />

      {
        props.drop==='true' &&
        (
      <div
        style={{
          position: 'absolute',
          right: '8px',
          top: '40%',
          transform: 'translateY(-50%)',
          width: '19px',
          height: '19px',
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
        )
}
      {searchResults.length > 0 && (
        <div
          className="onlythisscroll"
          ref={searchResultsRef}
          style={{
            position: 'absolute',
            top: '100%',
            left:'80px',
              width:widthIs?'145px':'120px',
            zIndex:'10',
            borderRadius: '3px',
            marginTop: '5px',
            maxHeight: '170px',
            border: 'none',
            overflow: 'auto',
            outline: 'none',
          boxShadow: 'none',
            scrollbarWidth: 'thin',
            scrollbarColor: '#ccc transparent',
            color: 'grey',
            backgroundColor: 'white',
          }}
        >
          {searchResults.map((result) => (
            <div key={result} onClick={() => handleSelect(result)} className="hovermai">
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Combobox;
