import React from "react";
import "./FAQ.css";
import Accordion from "react-bootstrap/Accordion";
import lineFaq from './../../images/lineFaq.png'
import accordianRight from "./../../images/accordianRight.png";
const FAQ = () => {
  return (
    <>
      <div className="mainFaq" id="mainFaq">
        <div className="mainAccordian">
        <div className="topSliderBox container" >
        
        <div className="topOurParLine" style={{marginTop:"-50px",marginBottom:"45px"}}>
          <h1 className="whtCrypHeading">Frequently Asked Questions</h1>
          <div className="txtHeaderComp container container2222" style={{marginTop:"15px",fontSize:"20px",color:"grey"}}>Feel free to go through our FAQs and get in touch if there are any unanswered questions to help you join our community of Founders, Investors & KOLs</div>
        </div>

                  </div>
          <Accordion className="container"  defaultActiveKey="0">
          <Accordion.Item eventKey="0">
              <Accordion.Header className="headerTxtAcc" style={{fontWeight:"bolder"}}>
              Are there any paid subscriptions to join The Crypto Hub? 
              </Accordion.Header>
              <Accordion.Body className="bosyAccordTxt">
              Currently there are no paid subscriptions and you can enjoy all benefits free of cost. As and when there be any premium features, all registered members will be informed accordingly.

              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header className="headerTxtAcc">
              How do I join The Crypto Hub?
              </Accordion.Header>
              <Accordion.Body className="bosyAccordTxt">
              The best way to join TCH is by registering on our website, subscribing to our socials and community groups on Whatsapp & Telegram.
              </Accordion.Body>
            </Accordion.Item>
                        <Accordion.Item eventKey="2">
              <Accordion.Header className="headerTxtAcc">
              How can I be interviewed for the podcast?
              </Accordion.Header>
              <Accordion.Body className="bosyAccordTxt">
              Usually we invite selected speakers to join our investor, founder & KOL interviews. You may contact us if you want to participate in our interviews or podcasts. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className="headerTxtAcc">
              How can I be an investor with The Crypto Hub?
              </Accordion.Header>
              <Accordion.Body className="bosyAccordTxt">
              Please register as an investor by filling in the investor form and we will get in touch with you to understand your investment requirements to find the best deal-flows for you.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header className="headerTxtAcc">
              How can I join TCH cohorts as a founder? 
              </Accordion.Header>
              <Accordion.Body className="bosyAccordTxt">
              Please apply by using the form to send details of your start-up and we will contact you for the next steps to access our suite of services for founders and a chance to list your project on our platform.
              </Accordion.Body>
            </Accordion.Item>


            <Accordion.Item eventKey="5">
              <Accordion.Header className="headerTxtAcc">
              Who can be a TCH Ambassador, Mentor or KOL?
              </Accordion.Header>
              <Accordion.Body className="bosyAccordTxt">
              If you are an industry expert in the Blockchain & Web3 space and have an interest in being part of our ecosystem and grow together, we would love to hear from you. Just submit your details online. 
              </Accordion.Body>
            </Accordion.Item>


            <Accordion.Item eventKey="6">
              <Accordion.Header className="headerTxtAcc">
              Do you also invest in Web3 start-ups? 
              </Accordion.Header>
              <Accordion.Body className="bosyAccordTxt">
              We are currently focussing on connecting selected start-ups with investors and we will also be investing in some of the projects in the future.
              </Accordion.Body>
            </Accordion.Item>



          </Accordion>
        </div>

    
      </div>
    </>
  );
};

export default FAQ;