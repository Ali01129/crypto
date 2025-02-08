import React, { useState } from "react";
import uploader from "./../../images/uploader.png";
import axios from "axios";
import { SERVERURL } from "../../ServerUrl";
import "./AmbassadorForm.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { registerAmbassador } from "../../redux/CustomerReducer";
import { useDispatch } from "react-redux";

const AmbassadorForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valid, setValid] = useState(null);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    fullName: "",
    title: "",
    location: "",
    twitter: "",
    linkedIn: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword
    image: "",
    phone: "",
    category: ""
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field
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
      setErrors({ ...errors, image: "Invalid image type. Only PNG, JPEG, and JPG are allowed." });
    }
  };

  const continueClicked = () => {
    let newErrors = {};
    if (!user.fullName) newErrors.fullName = "Full Name is required";
    if (!user.title) newErrors.title = "Title is required";
    if (!user.location) newErrors.location = "Location is required";
    if (!user.twitter) newErrors.twitter = "Twitter is required";
    if (!user.linkedIn) newErrors.linkedIn = "LinkedIn is required";
    if (!user.image) newErrors.image = "Profile image is required";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setContinue(false);
    } else {
      setValid(1);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/; // Assuming a simple numeric check for 10 to 15 digits
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };  

  const signupClick = async () => {
    let newErrors = {};
    if (!user.email) newErrors.email = "Email is required";
    if (!validateEmail(user.email)) newErrors.email = "Invalid email format";
    if (!user.phone) newErrors.phone = "Phone number is required";
    if (!validatePhone(user.phone)) newErrors.phone = "Invalid phone number format";
    if (!user.password) newErrors.password = "Password is required";
    if (!validatePassword(user.password)) newErrors.password = "Password must be at least 8 characters long and contain at least one letter and one number";
    if (user.password !== user.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!user.category) newErrors.category = "Category is required";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const form = new FormData();
      form.append("fullName", user.fullName);
      form.append("title", user.title);
      form.append("twitter", user.twitter);
      form.append("linkedIn", user.linkedIn);
      form.append("email", user.email);
      form.append("password", user.password);
      form.append("location", user.location);
      form.append("image", user.image);
      form.append("phone", user.phone);
      form.append("category", user.category);

      try {
        const response = await axios.post(`${SERVERURL}/api/v1/registerSpecial`, form);

        if (response.status === 200) {
          if (response.data.message === "Code Sent to your mail.") {
            Swal.fire({
              icon: "success",
              title: "Prove Yourself!",
              text: "Code Sent to your mail.",
            });
            navigate(`/user/verify?email=${encodeURIComponent(user.email)}`);
          } else if (response.data.message === "Your Request Sent to Admin. You will be notified by mail when approved!") {
            Swal.fire({
              icon: "success",
              title: "Request Sent! Keep checking.",
              text: "Your Request Sent to Admin. You will be notified by mail when approved!",
            });
            navigate("/");
          }
        } else if (response.status === 201) {
          Swal.fire({
            icon: "error",
            title: "Request Failed",
            text: response.data.message,
          });
        } else if (response.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Request Failed",
            text: "Something went wrong",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Request Failed",
          text: "An error occurred while registering. Please try again later.",
        });
        console.error("Error registering ambassador:", error);
      }
    } else {
      setValid(2);
    }
  };

  const radioHandle = (category) => {
    setUser({
      ...user,
      category: category,
    });
    setErrors({ ...errors, category: "" }); // Clear error for category
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
                      accept="image/png, image/jpeg, image/webp"
                      className="inputfile"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="file" className="chooseImageTxt">
                      Upload Image
                    </label>
                  </div>
                </div>
                {errors.image && <div style={{ color: "red" }}>{errors.image}</div>}

                <div className="topTxtInput">
                  <div className="inputLbl">Full Name*</div>
                  <input
                    placeholder="Elon Musk"
                    className="inputSignup"
                    onChange={handleChange}
                    name="fullName"
                  />
                  {errors.fullName && <div style={{ color: "red" }}>{errors.fullName}</div>}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">TITLE*</div>
                  <input
                    placeholder="CEO @ Tesla"
                    className="inputSignup"
                    onChange={handleChange}
                    name="title"
                  />
                  {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">LOCATION*</div>
                  <input
                    placeholder="San Francisco"
                    className="inputSignup"
                    onChange={handleChange}
                    name="location"
                  />
                  {errors.location && <div style={{ color: "red" }}>{errors.location}</div>}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">TWITTER*</div>
                  <input
                    placeholder="http://www.twitter.com/elonmusk"
                    className="inputSignup"
                    onChange={handleChange}
                    name="twitter"
                  />
                  {errors.twitter && <div style={{ color: "red" }}>{errors.twitter}</div>}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">LINKEDIN*</div>
                  <input
                    placeholder="http://www.linkedin.com/in/elonmusk"
                    className="inputSignup"
                    onChange={handleChange}
                    name="linkedIn"
                  />
                  {errors.linkedIn && <div style={{ color: "red" }}>{errors.linkedIn}</div>}
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
                    placeholder="elon.musk@gmail.com"
                    type="email"
                    className="inputSignup"
                    onChange={handleChange}
                    name="email"
                  />
                  {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">Are you a (an):*</div>
                  <div className="topRadioButton">
                    <input
                      type="radio"
                      name="example"
                      onChange={() => radioHandle("investor")}
                    />
                    <div>Investor</div>
                  </div>
                  <div className="topRadioButton">
                    <input
                      type="radio"
                      name="example"
                      onChange={() => radioHandle("founder")}
                    />
                    <div>Founder</div>
                  </div>
                  <div className="topRadioButton">
                    <input
                      type="radio"
                      name="example"
                      onChange={() => radioHandle("ambassador")}
                    />
                    <div>Ambassador</div>
                  </div>
                  {errors.category && <div style={{ color: "red" }}>{errors.category}</div>}
                </div>

                <div className="topTxtInput">
                  <div className="inputLbl">Phone Number*</div>
                  <input
                    placeholder="Phone"
                    type="text"
                    className="inputSignup"
                    value={user.phone}
                    onChange={handleChange}
                    name="phone"
                  />
                  {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
                </div>

                <div className="topTxtInput">
                  <div className="inputLbl">Password*</div>
                  <input
                    placeholder="********"
                    className="inputSignup"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    name="password"
                  />
                  {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                </div>
                <div className="topTxtInput">
                  <div className="inputLbl">Confirm Password*</div>
                  <input
                    placeholder="********"
                    className="inputSignup"
                    type="password"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && <div style={{ color: "red" }}>{errors.confirmPassword}</div>}
                </div>

                <div className="home-content--btn2">
                  <div className="hover-btn2"></div>
                  <button className="content-btn--inner2" onClick={signupClick}>
                    <p>Join as an {user.category}</p>
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

export default AmbassadorForm;
