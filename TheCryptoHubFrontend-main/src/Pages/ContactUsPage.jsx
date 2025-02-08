import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Swal from 'sweetalert2';
import { SERVERURL } from "../ServerUrl";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import HomeTopBar from "../Components/HomeTopBar/HomeTopBar";

const ContactUsPage = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${SERVERURL}/api/v1/contact`, values);
      if (response.data.success === true) {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Message could not Sent",
          text: response.data.message,
        });
      }
      setSubmitSuccess(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "An error occured.",
      });

    }
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  return (
    <>
      <Header />
<div className="contact">
      <div className="mainContainerSignup mainContainerLogin" style={{
    marginTop:'10vh',marginBottom:'10vh', height:'100vh',margin:'revert'
}}>
        <div className="cardSignup">
          <div className="cardSignupInner">
            <div className="topSignupTxt" style={{
    fontSize: '30px', // Larger font size
    textAlign:'center',
    marginBottom:'-5px',
    fontWeight: 'bolder', // Bold font
}}>
              Contact Us
            </div>

            <div className="tellAbtTxt" style={{
    textAlign:'center',
    fontSize: '17px', // Larger font size
}}>
              We would love to hear from you.
            </div>

            <Formik
              initialValues={{ name: '', email: '', message: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="topTxtInput">
                    <Field name="name" placeholder="Your Name" className="inputSignup" />
                    <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                  </div>
                  <div className="topTxtInput">
                    <Field name="email" type="email" placeholder="Your Email" className="inputSignup" />
                    <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                  </div>
                  <div className="topTxtInput">
                    <Field name="message" as="textarea" placeholder="Your Message" className="inputSignup" style={{ height: '120px' }}/>
                    <ErrorMessage name="message" component="div" style={{ color: "red" }} />
                  </div>
                  <div className="home-content--btn2">
                    <div className="hover-btn2" onClick={handleSubmit}></div>
                    <button type="submit" className="content-btn--inner2">
                      <p>Send Message</p>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        

      </div>
      <div className="infoContainer">
            <h2>TheCryptoHub Community</h2>
            <p>
            We are building the one-stop platform for vetted and curated early-stage projects, connecting them with key investors while fostering an inclusive ecosystem for the Web3 community. Our mission is to empower innovators and entrepreneurs by providing them with the resources, guidance, and network they need to succeed in the rapidly evolving blockchain landscape. We believe in the transformative power of decentralized technologies and strive to create an environment where groundbreaking ideas can thrive. By offering rigorous project vetting processes, mentorship opportunities, and access to a diverse pool of investors, we aim to bridge the gap between visionary projects and the support they need to reach their full potential. Join us as we revolutionize the future of finance and technology, ensuring that every participant in the CryptoHub ecosystem can contribute to and benefit from the growth of Web3.
            </p>
          </div>
          </div>
      <Footer />
    </>
  );
};

export default ContactUsPage;