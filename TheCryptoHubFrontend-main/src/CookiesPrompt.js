
import React, { useState, useEffect } from 'react';

function CookiesMessage() {
  const [showMessage, setShowMessage] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(true);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookiesRejected = localStorage.getItem('cookiesRejected');
    
    if (cookiesRejected === 'true') {
      setShowMessage(false);
    } else if (cookiesAccepted === 'true') {
      setShowMessage(false);
      setShowCheckbox(false);
    } else {
      setShowMessage(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', true);
    setShowMessage(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookiesRejected', true);
    setShowMessage(false);
    setShowCheckbox(false);
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      localStorage.setItem('cookiesRejected', true);
      setShowCheckbox(false);
    }
  };

  return showMessage ? (
    <div className="mainDeleteCardVehicle mainDeleteCardVehicle1" style={{display:'none'}}>
    <div className="confirmTxtAlertVehDlt confirmTxtAlertVehDlt1">
      {" "}
      <p>
        This website uses cookies to improve your experience. By clicking
        "Accept", you consent to the use of all cookies.{" "}
      </p>
      {showCheckbox && (
      <label className='lableTxt'>
        <input type="checkbox" onChange={handleCheckboxChange} /> Do not show this message again
      </label>
    )}
    </div>
    <div className="topConfirmBtnDeltVeh">
      <div className="noBtnAlertDltVeh noBtnAlertDltVeh1"
      style={{background:"red"}}
      onClick={handleReject}
      >Reject</div>
      <div
        className="noBtnAlertDltVeh noBtnAlertDltVeh1"
        onClick={() => handleAccept()}
      >
        Accept
      </div>
    </div>
  </div>
) : null;
}



export default CookiesMessage;
