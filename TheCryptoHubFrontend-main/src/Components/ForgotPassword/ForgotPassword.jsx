import React, { useState } from "react";

const ForgotPassword = ({ onSubmit }) => {
  const [valid, setValid] = useState();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setValid(2); // Update valid state to 2 to display the error message
      return;
    }

    setValid(1); // Update valid state to 1 if email is valid
    onSubmit(email);
  };

  return (
    <>
      <div className="mainContainerSignup mainContainerLogin">
        <div className="cardSignup">
          <div className="cardSignupInner">
            <div className="topSignupTxt">
              Enter your email here to reset your password.
            </div>
            <div className="topTxtInput">
              <div className="inputLbl">Email</div>
              <input 
                placeholder="ElonMusk@gmail.com" 
                className="inputSignup" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            {valid === 2 && <div style={{ color: "red" }}>Enter email</div>}
            <div className="home-content--btn2" onClick={handleSubmit}>
              <div className="hover-btn2"></div>
              <button className="content-btn--inner2">
                <p>Submit</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
