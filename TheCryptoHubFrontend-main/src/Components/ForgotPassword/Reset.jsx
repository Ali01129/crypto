import React, { useState } from "react";

const Reset = ({ token, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setValid(false);
      setErrorMessage("Please fill out both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setValid(false);
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Password validation: At least 8 characters, containing numbers and alphabets
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setValid(false);
      setErrorMessage("Password must be at least 8 characters long and contain both numbers and alphabets.");
      return;
    }

    setValid(true);
    onSubmit(token, password);
  };

  return (
    <>
      <div className="mainContainerSignup mainContainerLogin">
        {token ? (
          <div className="cardSignup">
            <div className="cardSignupInner">
              <div className="topSignupTxt">Reset Your Password</div>
              <div className="topTxtInput">
                <div className="inputLbl">New Password</div>
                <input 
                  type="password"
                  placeholder="********" 
                  className="inputSignup" 
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  value={password}
                />
              </div>
              <div className="topTxtInput">
                <div className="inputLbl">Confirm New Password</div>
                <input 
                  type="password"
                  placeholder="********" 
                  className="inputSignup" 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirmPassword"
                  value={confirmPassword}
                />
              </div>
              {!valid && <div style={{ color: "red" }}>{errorMessage}</div>}
              <div className="home-content--btn2" onClick={handleSubmit}>
                <div className="hover-btn2"></div>
                <button className="content-btn--inner2">
                  <p>Submit</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Token is Expired</p>
        )}
      </div>
    </>
  );
};

export default Reset;
