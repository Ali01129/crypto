import React, { useState } from "react";
import "./Signup.css";
import uploader from "./../../images/uploader.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { SERVERURL } from "../../ServerUrl";

const Signup = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState([]);
  const [user, setUser] = useState({
    fullName: "",
    title: "",
    location: "",
    twitter: "",
    linkedIn: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [imgPreview, setImgPreview] = useState(null);
  const [continue1, setContinue] = useState(true);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      setUser({ ...user, image: selected });
      setImage(selected);
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setValid((prevValid) => [
        ...prevValid,
        "Profile image must be in PNG, JPEG, or JPG format",
      ]);
    }
  };

  const continueClicked = () => {
    const missingFields = [];
    if (!user.fullName) missingFields.push("Full Name");
    if (!user.title) missingFields.push("Title");
    if (!user.location) missingFields.push("Location");
    if (!user.twitter) missingFields.push("Twitter");
    if (!user.linkedIn) missingFields.push("LinkedIn");
    if (!user.image) missingFields.push("Profile Image");

    if (missingFields.length > 0) {
      setValid(missingFields);
    } else {
      setValid([]);
      setContinue(false);
    }
  };

  const signupClick = async () => {
    const missingFields = [];
    if (!user.email) missingFields.push("Email");
    if (!user.password) missingFields.push("Password");
    if (!user.confirmPassword) missingFields.push("Confirm Password");

    if (missingFields.length > 0) {
      setValid(missingFields);
      return;
    }

    if (
      user.password.length >= 8 &&
      /\d/.test(user.password) &&
      /[a-zA-Z]/.test(user.password)
    ) {
      if (user.password === user.confirmPassword) {
        setValid([]); // Clear validation messages before making the API call

        try {
          const form = new FormData();
          form.append("fullName", user.fullName);
          form.append("title", user.title);
          form.append("twitter", user.twitter);
          form.append("linkedIn", user.linkedIn);
          form.append("email", user.email);
          form.append("password", user.password);
          form.append("location", user.location);
          form.append("image", user.image);

          const response = await axios.post(`${SERVERURL}/api/v1/registerUser`, form);

          Swal.fire("", response.data.message, "success");

          if (
            response.data.message === "Again, Code sent to your mail." ||
            response.data.message === "Code Sent to your mail."
          ) {
            localStorage.setItem("token", response?.data?.token);
            navigate(`/user/verify?email=${encodeURIComponent(user.email)}`);
          }
        } catch (error) {
          console.error("Error during signup:", error);
          if (error.response && error.response.data && error.response.data.message) {
            Swal.fire("Error", error.response.data.message, "error");
          }
        }
      } else {
        setValid(["Passwords do not match"]);
      }
    } else {
      setValid([
        "Password must be at least 8 characters long and contain both numbers and alphabets",
      ]);
    }
  };

  return (
    <>
      <div className="mainContainerSignup">
        <div className="cardSignup">
          <div className="cardSignupInner">
            <div className="topSignupTxt">
              Welcome to The Crypto Hub! We're happy to have you.
            </div>

            <div className="tellAbtTxt">Tell us a little bit about yourself.</div>

            {continue1 ? (
              <>
                <div className="topProfInLabl">
                  <div>PROFILE PICTURE*</div>
                  <div className="topProfilePic">
                    <div
                      className="profileImg"
                      style={{
                        background: imgPreview
                          ? `url("${imgPreview}") no-repeat center/cover`
                          : "",
                      }}
                    >
                      {imgPreview ? "" : <img src={uploader} />}
                    </div>

                    <input
                      type="file"
                      id="file"
                      accept="image/png , image/jpeg, image/webp"
                      className="inputfile"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="file" className="chooseImageTxt">
                      Upload Image
                    </label>
                  </div>
                </div>
                {valid.includes("Profile Image") && (
                  <div style={{ color: "red" }}>Upload a Profile Image</div>
                )}

                <div className="topTxtInput">
                  <div className="inputLbl">Full Name*</div>
                  <input
                    placeholder="Elon Musk"
                    className="inputSignup"
                    onChange={handleChange}
                    name="fullName"
                  />
                  {valid.includes("Full Name") && (
                    <div style={{ color: "red" }}>Enter your Full Name</div>
                  )}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">TITLE*</div>
                  <input
                    placeholder="CEO @ Tesla"
                    className="inputSignup"
                    onChange={handleChange}
                    name="title"
                  />
                  {valid.includes("Title") && (
                    <div style={{ color: "red" }}>Enter your Title*</div>
                  )}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">LOCATION*</div>
                  <input
                    placeholder="San Francisco"
                    className="inputSignup"
                    onChange={handleChange}
                    name="location"
                  />
                  {valid.includes("Location") && (
                    <div style={{ color: "red" }}>Enter your Location</div>
                  )}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">TWITTER*</div>
                  <input
                    placeholder="http://www.twitter.com/elonmusk"
                    className="inputSignup"
                    onChange={handleChange}
                    name="twitter"
                  />
                  {valid.includes("Twitter") && (
                    <div style={{ color: "red" }}>Enter your Twitter</div>
                  )}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">LINKEDIN*</div>
                  <input
                    placeholder="http://www.linkedin.com/in/elonmusk"
                    className="inputSignup"
                    onChange={handleChange}
                    name="linkedIn"
                  />
                  {valid.includes("LinkedIn") && (
                    <div style={{ color: "red" }}>Enter your LinkedIn</div>
                  )}
                </div>
                <div className="home-content--btn2" onClick={continueClicked}>
                  <div className="hover-btn2"></div>
                  <button className="content-btn--inner2">
                    <p>Continue</p>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="topTxtInput">
                  <div className="inputLbl">Email*</div>
                  <input
                    placeholder="Elon Musk@gmail.com"
                    type="email"
                    className="inputSignup"
                    onChange={handleChange}
                    name="email"
                  />
                  {valid.includes("Email") && (
                    <div style={{ color: "red" }}>Enter your Email</div>
                  )}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">Password*</div>
                  <input
                    placeholder="Password"
                    className="inputSignup"
                    type="password"
                    onChange={handleChange}
                    name="password"
                  />
                  {valid.includes("Password") && (
                    <div style={{ color: "red" }}>Enter your Password</div>
                  )}
                  {valid.includes(
                    "Password must be at least 8 characters long and contain both numbers and alphabets"
                  ) && (
                    <div style={{ color: "red" }}>
                      Your password does not meet the requirements
                    </div>
                  )}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">Confirm Password*</div>
                  <input
                    placeholder="Password"
                    className="inputSignup"
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                  />
                  {valid.includes("Confirm Password") && (
                    <div style={{ color: "red" }}>Confirm your Password</div>
                  )}
                  {valid.includes("Passwords do not match") && (
                    <div style={{ color: "red" }}>Passwords do not match</div>
                  )}
                </div>
                <div className="password-conditions">
                  Password must be at least 8 characters long and contain both
                  numbers and alphabets.
                </div>

                <div className="home-content--btn2">
                  <div className="hover-btn2" onClick={signupClick}></div>
                  <button className="content-btn--inner2" onClick={signupClick}>
                    <p>Signup</p>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
