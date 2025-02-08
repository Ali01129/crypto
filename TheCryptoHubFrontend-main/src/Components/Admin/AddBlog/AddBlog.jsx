import React, { useState,useEffect, useRef } from "react";

import "./AmbassadorsAdmin.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AdminHeader from "../AdminHeader/AdminHeader";
import SideBarAdmin from "../SideBar/SideBar";
import UserDataAdmin from "../UserDataAdmin/UserDataAdmin";
//import InvestorsData from "../InvestorsData/InvestorsData";
import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";
import Swal from "sweetalert2";

const AddProject = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  console.log("idr tk tw aya");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoChoice, setVideoChoice] = useState("upload"); // Default to "upload
  const [videoFile, setVideoFile] = useState(null);
  const [videoRequired, setVideoRequired] = useState("no"); // Radio button value
  
  const [privatee, setPrivatee] = useState("");
  const [chain, setChain] = useState("");
  const [category, setCategory] = useState("");
  const [sortbyy, setSortByy] = useState("");
  const [tge, setTge] = useState("");
  const [special, setSpecial] = useState(false);
  const [stage, setStage] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [investoramount, setInvestorAmount] = useState("");
  const [raisedmoney, setRaisedMoney] = useState("");
  const [mininvestment, setMinInvestment] = useState("");
  const [valuationcap, setValuationCap] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [image, setImage] = useState(null);
  const [maxInvestment, setMaxInvestment] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [tgeDate, setTgeDate] = useState("");
  const [allocation, setAllocation] = useState("");
  const [browsecLink, setBrowsecLink] = useState("");
  const [redditLink, setRedditLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [numPictures, setNumPictures] = useState(0); // Number of pictures to upload
  const [pictures, setPictures] = useState([]); // Array to store picture files
  const [discountedValuationCap, setDiscountedValuationCap] = useState("");
  const [deadline, setDeadline] = useState("");
  const [discount, setDiscount] = useState("");
  const [securityType, setSecurityType] = useState("");
  const [nomineeLead, setNomineeLead] = useState("");
  
  const [numHighlightsStatements, setNumHighlightsStatements] = useState(0);
  const [numUspStatements, setNumUspStatements] = useState(0);
  const [numUtilityStatements, setNumUtilityStatements] = useState(0);
  const [numRoadMapStatements, setNumRoadMapStatements] = useState(0);
  const [numRevenueStreamStatements, setNumRevenueStreamStatements] = useState(0);
  const [numTechnologyStatements, setNumTechnologyStatements] = useState(0);
  const [numMarketingStrategyStatements, setNumMarketingStrategyStatements] = useState(0);
  const [numTokenomicStatements, setNumTokenomicStatements] = useState(0);


  

  const [highlightsStatements, setHighlightsStatements] = useState([]);
  const [uspStatements, setUspStatements] = useState([]);
  const [utilityStatements, setUtilityStatements] = useState([]);
  const [roadMapStatements, setRoadMapStatements] = useState([]);
  const [revenueStreamStatements, setRevenueStreamStatements] = useState([]);
  const [technologyStatements, setTechnologyStatements] = useState([]);
  const [marketingStrategyStatements, setMarketingStrategyStatements] = useState([]);
  const [tokenomicStatements, setTokenomicStatements] = useState([]);
  
  const [numPartners, setNumPartners] = useState(0);
  const [partners, setPartners] = useState([]);

  const [numTeamMembers, setNumTeamMembers] = useState(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const [numDocs, setNumDocs] = useState(0); 
  const [docs, setDocs] = useState([]);
  const [rightHeader, setRightHeader] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [driversData,setDriversData] = useState([]);
  // Number of pictures to upload
   // Array to store picture files

//  const dispatch=useDispatch();

//  const [tempArray, settempArray] = useState(driversData);

const handleNumPartnersChange = (e) => {
  const num = parseInt(e.target.value, 10);
  setNumPartners(num);
}

const handlePartnerInputChange = (index, field, value) => {
  const updatedPartners = [...partners];
  if (!updatedPartners[index]) {
    updatedPartners[index] = {};
  }
  updatedPartners[index][field] = value;
  setPartners(updatedPartners);
}
const handleNumDocChange = (e) => {
  const num = parseInt(e.target.value, 10);
  setNumDocs(num);
}

const handleDocInputChange = (index, field, value) => {
  const updateddocs = [...docs];
  if (!updateddocs[index]) {
    updateddocs[index] = {};
  }
  updateddocs[index][field] = value;
  setDocs(updateddocs);
}

const handleNumTeamMembersChange = (e) => {
  const num = parseInt(e.target.value, 10);
  setNumTeamMembers(num);
}

const handleTeamMemberInputChange = (index, field, value) => {
  const updatedPartners = [...teamMembers];
  if (!updatedPartners[index]) {
    updatedPartners[index] = {};///////these are team members indeed, not partners
  }
  updatedPartners[index][field] = value;
  setTeamMembers(updatedPartners);
}


const renderPartnerInputs = () => {
  const partnerInputFields = [];

  for (let i = 0; i < numPartners; i++) {
    partnerInputFields.push(
      <div key={i}>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Partner {i + 1} Name:</label>
          <input
            type="text"
            className="inputSearchVehic"
            placeholder={`Name of Partner ${i + 1}`}
            value={(partners[i] && partners[i].name) || ""}
            onChange={(e) => handlePartnerInputChange(i, "name", e.target.value)}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Partner {i + 1} Title:</label>
          <input
            type="text"
            className="inputSearchVehic"
            placeholder={`Title of Partner ${i + 1}`}
            value={(partners[i] && partners[i].title) || ""}
            onChange={(e) => handlePartnerInputChange(i, "title", e.target.value)}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Partner {i + 1} Description:</label>
          <textarea
          className="topTextEditAdmVehic2"
            
            value={(partners[i] && partners[i].description) || ""}
            onChange={(e) => handlePartnerInputChange(i, "description", e.target.value)}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Partner {i + 1} Profile Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, (file) => handlePartnerInputChange(i, "profilePhoto", file))}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Partner {i + 1} LinkedIn Link:</label>
          <input
            type="text"
            className="inputSearchVehic"
            placeholder={`LinkedIn Link of Partner ${i + 1}`}
            value={(partners[i] && partners[i].linkedinLink) || ""}
            onChange={(e) => handlePartnerInputChange(i, "linkedinLink", e.target.value)}
          />
        </div>
      </div>
    );
  }

  return partnerInputFields;
}


const renderDocInputs = () => {
  const docsInputFields = [];

  for (let i = 0; i < numDocs; i++) {
    docsInputFields.push(
      <div key={i}>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Doc{i + 1} Name:</label>
          <input
            type="text"
            className="inputSearchVehic"
            placeholder={`Name of Document ${i + 1}`}
            value={(docs[i] && docs[i].docName) || ""}
            onChange={(e) => handleDocInputChange(i, "docName", e.target.value)}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Document {i + 1} File:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, (file) => handleDocInputChange(i, "docFile", file))}
          />
        </div>
      </div>
    );
  }

  return docsInputFields;
}


const handleVideoChoice = (choice) => {
  setVideoChoice(choice);
};
const renderTeamMemberInputs = () => {
  const TeamMemberInputFields = [];

  for (let i = 0; i < numTeamMembers; i++) {
    TeamMemberInputFields.push(
      <div key={i}>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Team Member {i + 1} Name:</label>
          <input
            type="text"
            className="inputSearchVehic"
            placeholder={`Name of Team Member ${i + 1}`}
            value={(teamMembers[i] && teamMembers[i].name) || ""}
            onChange={(e) => handleTeamMemberInputChange(i, "name", e.target.value)}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Team Member {i + 1} Title:</label>
          <input
            type="text"
            className="inputSearchVehic"
            placeholder={`Title of Team Member ${i + 1}`}
            value={(teamMembers[i] && teamMembers[i].title) || ""}
            onChange={(e) => handleTeamMemberInputChange(i, "title", e.target.value)}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Team Member {i + 1} Description:</label>
          <textarea
          className="topTextEditAdmVehic2"
            value={(teamMembers[i] && teamMembers[i].description) || ""}
            onChange={(e) => handleTeamMemberInputChange(i, "description", e.target.value)}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Team Member {i + 1} Profile Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, (file) => handleTeamMemberInputChange(i, "profilePhoto", file))}
          />
        </div>
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Team Member {i + 1} LinkedIn Link:</label>
          <input
            type="text"
            className="inputSearchVehic"
            placeholder={`LinkedIn Link of Team Member ${i + 1}`}
            value={(teamMembers[i] && teamMembers[i].linkedinLink) || ""}
            onChange={(e) => handleTeamMemberInputChange(i, "linkedinLink", e.target.value)}
          />
        </div>
      </div>
    );
  }

  return TeamMemberInputFields;
}


const handleDescriptionChange = (e) => {
  const value = e.target.value;
  if (value.length <= 110) {
    setDescription(value);
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: 'Description cannot be more than 110 characters',
    }));
  }
};

const handleNumStatementsChange = (section, e) => {
  const num = parseInt(e.target.value, 10);
  if (section === "highlights") setNumHighlightsStatements(num);
  else if (section === "utility") setNumUtilityStatements(num);
  else if (section === "roadMap") setNumRoadMapStatements(num);
  else if (section === "revenueStream") setNumRevenueStreamStatements(num);
  else if (section === "technology") setNumTechnologyStatements(num);
  else if (section === "tokenomic") setNumTokenomicStatements(num);
  else if (section === "usp") setNumUspStatements(num);
  else if (section === "marketingStrategy") setNumMarketingStrategyStatements(num);

};

const handleStatementInputChange = (section, index, e) => {
  const updatedStatements = section === "highlights" ? [...highlightsStatements] :
    section === "utility" ? [...utilityStatements] :
    section === "marketingStrategy" ? [...marketingStrategyStatements] :
    section === "usp" ? [...uspStatements] :
    section === "revenueStream" ? [...revenueStreamStatements] :
    section === "tokenomic" ? [...tokenomicStatements] :
    section === "technology" ? [...technologyStatements] :
    section === "roadMap" ? [...roadMapStatements] :  [];

  updatedStatements[index] = e.target.value;

  if (section === "highlights") setHighlightsStatements(updatedStatements);
  else if (section === "utility") setUtilityStatements(updatedStatements);
   else if (section === "marketingStrategy") setMarketingStrategyStatements(updatedStatements);
  else if (section === "usp") setUspStatements(updatedStatements);
  else if (section === "revenueStream") setRevenueStreamStatements(updatedStatements);
  else if (section === "tokenomic") setTokenomicStatements(updatedStatements);
  else if (section === "technology") setTechnologyStatements(updatedStatements);
  else if (section === "roadMap") setRoadMapStatements(updatedStatements);
};


  // Function to generate statement input fields based on the number
  const renderStatementInputs = (section, numStatements) => {
    const statementInputFields = [];
    const sectionStatements = section === "highlights" ? highlightsStatements :
      section === "utility" ? utilityStatements :
      section === "revenueStream" ? revenueStreamStatements :
      section === "usp" ? uspStatements :
      section === "tokenomic" ? tokenomicStatements :
      section === "technology" ? technologyStatements :
      section === "marketingStrategy" ? marketingStrategyStatements :
      section === "roadMap" ? roadMapStatements : [];

    for (let i = 0; i < numStatements; i++) {
      statementInputFields.push(
        <div key={i}>
          <input
          className="inputSearchVehic stat"
            type="text"
            placeholder={`Statement ${i + 1} for ${section}`}
            value={sectionStatements[i] || ""}
            onChange={(e) => handleStatementInputChange(section, i, e)}
          />
        </div>
      );
    }

    return statementInputFields;
  };

  const [errors, setErrors] = useState({});
    const uploadOnServer = async (e) => {
      e.preventDefault();

      const newErrors = {};
let counterr=0;
    if (!title) {
      newErrors.title = "Please Enter Value";
      counterr++;
    }
      
    if (!chain || chain === "Select") {
      newErrors.chain = "Please Select Value";
      counterr++;
    }
     
    if (!privatee || privatee === "Select") {
      newErrors.private = "Please Select Value";
      counterr++;
    }

    if (!category || category === "Select") {
      newErrors.category = "Please Select Value";
      counterr++;
    }
    if (!sortbyy || sortbyy === "Select") {
      newErrors.sortbyy = "Please Select Value";
      counterr++;
    }
    if (!tge) {
      newErrors.tge = "Please Enter Value";
      counterr++;
    }
    if(!stage || stage === "Select")
    {
      newErrors.stage = "Please Select Value";
      counterr++;
    }
    if(!location)
    {
      newErrors.location = "Please Enter Value";
      counterr++;
    }
    if(!investoramount)
    {
      newErrors.investoramount = "Please Enter Value";
      counterr++;
    }
    if(!raisedmoney)
    {
      newErrors.raisedmoney = "Please Enter Value";
      counterr++;
    }
    if(!mininvestment)
    {
      newErrors.mininvestment = "Please Enter Value";
      counterr++;
    }
    if(!valuationcap)
    {
      newErrors.valuationcap = "Please Enter Value";
      counterr++;
    }
    if(!description)
    {
      newErrors.description = "Please Enter Value";
      counterr++;
    }
    if(!logo)
    {
      newErrors.logo = "Please Enter Value";
      counterr++;
    }
    if(!image)
    {
      newErrors.image = "Please Enter Value";
      counterr++;
    }
    if(!maxInvestment)
    {
      newErrors.maxInvestment = "Please Enter Value";
      counterr++;
    }
    if(!fundingGoal)
    {
      newErrors.fundingGoal = "Please Enter Value";
      counterr++;
    }
    if(!tgeDate)
    {
      newErrors.tgeDate = "Please Enter Value";
      counterr++;
    }
    if(!allocation)
    {
      newErrors.allocation = "Please Enter Value";
      counterr++;
    }
    if(!browsecLink)
    {
      newErrors.browsecLink = "Please Enter Value";
      counterr++;
    }
    if(!redditLink)
    {
      newErrors.redditLink = "Please Enter Value";
      counterr++;
    }
    if(!twitterLink)
    {
      newErrors.twitterLink = "Please Enter Value";
      counterr++;
    }
    if(!deadline)
    {
      newErrors.deadline = "Please Enter Value";
      counterr++;
    }
    if(!nomineeLead)
    {
      newErrors.nomineeLead = "Please Enter Value";
      counterr++;
    }
    if(!securityType)
    {
      newErrors.securityType = "Please Enter Value";
      counterr++;
    }
    if (videoRequired === "yes" || videoRequired === "Yes")
    {
      if(videoChoice === "upload" && !videoFile)
      {
        newErrors.videoFile = "Please Enter Video";
        counterr++;
      }
      else if(videoChoice === "Link" && !videoUrl)
      {
        newErrors.videoUrl = "Please Enter URL Value";
        counterr++;
      }
    }
    if (special === true) {
      if (!discountedValuationCap) {
        newErrors.discountedValuationCap = "Please Enter Value";
        counterr++;
      }
      if (!discount)
      {
        newErrors.discount = "Please Enter Value";
        counterr++;
      }
    }
    console.log(pictures.length);
    console.log(numPictures);

    console.log(pictures);
    for(let i=0;i<numPictures;i++){

      console.log("i is,",i);
      console.log(pictures[i]);
      if(!pictures[i] || pictures[i]===undefined)
      {
        console.log("came here");
        newErrors.pictures = "Please Enter All Pictures";
        counterr++;
  
      }
    }


    for(let i=0;i<numDocs;i++){
      console.log("i:",i);
      if(!docs[i] ){
      console.log("came1")
        newErrors.docs = "Please Enter All Docs Details";
        counterr++;
    break;
  }

  if(!docs[i].docName || docs[i].docName===""){
    console.log("came2")
    newErrors.docs = "Please Enter All Docs Details";
    counterr++;
    break;

  }
  if(!docs[i].docFile || docs[i].docFile===""){
    console.log("came3")
    newErrors.docs = "Please Enter All Docs Details";
    counterr++;
    break;
  }


}
  
for(let i=0;i<numTeamMembers;i++){
  console.log("i:",i);
  if(!teamMembers[i]){
  console.log("came1")
    newErrors.teamMembers = "Please Enter All Team Members Details";
    counterr++;
    break;
}

if(teamMembers[i].name==="" || !teamMembers[i].name || teamMembers[i].title ==="" || !teamMembers[i].title || !teamMembers[i].description || teamMembers[i].description==="" || !teamMembers[i].profilePhoto || teamMembers[i].profilePhoto===""|| !teamMembers[i].linkedinLink || teamMembers[i].linkedinLink===""){
console.log("came2")
newErrors.teamMembers ="Please Enter All Team Members Details";
counterr++;
break;
}


}

    
    
    for(let i=0;i<numPartners;i++){
      console.log(i);
      if(!partners[i] || !partners[i].name || partners[i].name===""|| !partners[i].title || partners[i].title===""|| !partners[i].description|| partners[i].description===""|| !partners[i].profilePhoto || partners[i].profilePhoto===""|| !partners[i].linkedinLink || partners[i].linkedinLink==="")
      {
        newErrors.partners = "Please Enter All Partners Details";
        counterr++;
        break;
      }
    }
    if (numHighlightsStatements !== highlightsStatements.length) {
      newErrors.highlightsStatements = "Please Enter All Highlights Statements";
      counterr++;
    }
    if (numUspStatements !== uspStatements.length) {
      newErrors.uspStatements = "Please Enter All Usp Statements";
      counterr++;
    }
    if (numUtilityStatements !== utilityStatements.length) {
      newErrors.utilityStatements = "Please Enter All Utility Statements";
      counterr++;
    }
    if( numRevenueStreamStatements !== revenueStreamStatements.length) {
      newErrors.revenueStreamStatements = "Please Enter All Revenue Stream Statements";
      counterr++;
    }
    if (numRoadMapStatements !== roadMapStatements.length) {
      newErrors.roadMapStatements = "Please Enter All RoadMap Statements"
      counterr++;
    }
    if (numTechnologyStatements !== technologyStatements.length) {
      newErrors.technologyStatements = "Please Enter All Technology Statements";
      counterr++;
    }
    if (numMarketingStrategyStatements !== marketingStrategyStatements.length) {
      newErrors.marketingStrategyStatements = "Please Enter All Marketing Strategy Statements";
      counterr++;
    }
    if (numTokenomicStatements !== tokenomicStatements.length) {
      newErrors.tokenomicStatements = "Please Enter All Tokenomic Statements";
      counterr++;
    }
    setErrors(newErrors);

      console.log("img is:",image);
      if(counterr===0)
      {
        try{
     
          const form = new FormData();
    if(chain!="")
    
          form.append("chain",chain);
          form.append("privatee",privatee);
          form.append("title",title);
          form.append("category",category);
          form.append("sortbyy",sortbyy);
          form.append("tge",tge);
          form.append("special",special);
          form.append("stage",stage);
          form.append("location",location);
          form.append("investoramount",investoramount);
          form.append("raisedmoney",raisedmoney);
          form.append("mininvestment",mininvestment);
          form.append("valuationcap",valuationcap);
          form.append("description",description);
          form.append("logo",logo);//
          form.append("image",image);//
          form.append("maxInvestment",maxInvestment);
          form.append("fundingGoal",fundingGoal);    
          form.append("tgeDate",tgeDate);
          form.append("allocation",allocation);
          form.append("browsecLink",browsecLink);
          form.append("redditLink",redditLink);
          form.append("twitterLink",twitterLink);
          form.append("highlightsStatements", JSON.stringify(highlightsStatements));
        form.append("utilityStatements", JSON.stringify(utilityStatements));
        form.append("uspStatements", JSON.stringify(uspStatements));
        form.append("roadMapStatements", JSON.stringify(roadMapStatements));
        form.append("revenueStreamStatements", JSON.stringify(revenueStreamStatements));
        form.append("technologyStatements", JSON.stringify(technologyStatements));
        form.append("marketingStrategyStatements", JSON.stringify(marketingStrategyStatements));
        form.append("tokenomicStatements", JSON.stringify(tokenomicStatements));
        form.append("discountedValuationCap",discountedValuationCap);
          form.append("discount",discount);
          form.append("deadline",deadline);
          form.append("nomineeLead",nomineeLead);
          form.append("securityType",securityType);
          console.log("video Attached: ",videoRequired);
          form.append("IsVideoAttached", videoRequired);
          form.append("videoChoice", videoChoice);
            form.append("videoUrl", videoUrl);
            form.append("videoFile",videoFile);//
    
    
    
            for (let i = 0; i < numPictures; i++) {
              form.append(`pictures[${i}]`, pictures[i]);  
            }
      
    
          for (let i = 0; i < numPartners; i++) {////////
            const partner = partners[i] || {};
            form.append(`partners[${i}][name]`, partner.name || "");
            form.append(`partners[${i}][title]`, partner.title || "");
            form.append(`partners[${i}][description]`, partner.description || "");
            if (partner.profilePhoto) {
              form.append(`partners[${i}][profilePhoto]`, partner.profilePhoto);
            }
            form.append(`partners[${i}][linkedinLink]`, partner.linkedinLink || "");
          }
    
          for (let i = 0; i < numDocs; i++) {////////
            const doc = docs[i] || {};
            form.append(`docs[${i}][docName]`, doc.docName || "");
            if (doc.docFile) {
              form.append(`docs[${i}][docFile]`, doc.docFile);
            }
            }
    
    
    
          for (let i = 0; i < numTeamMembers; i++) {////////
            const teamMember = teamMembers[i] || {};
            form.append(`teamMembers[${i}][name]`, teamMember.name || "");
            form.append(`teamMembers[${i}][title]`, teamMember.title || "");
            form.append(`teamMembers[${i}][description]`, teamMember.description || "");
            if (teamMember.profilePhoto) {
              form.append(`teamMembers[${i}][profilePhoto]`, teamMember.profilePhoto);
            }
            form.append(`teamMembers[${i}][linkedinLink]`, teamMember.linkedinLink || "");
          }
      
          for (let i = 0; i < numTeamMembers; i++) {////////
            
            if (teamMembers[i].profilePhoto===undefined||teamMembers[i].profilePhoto===""||teamMembers[i].profilePhoto===null||teamMembers[i].name===undefined||teamMembers[i].name===""||teamMembers[i].description===undefined||teamMembers[i].description===""||teamMembers[i].title===undefined||teamMembers[i].title===""||teamMembers[i].linkedinLink===undefined||teamMembers[i].linkedinLink==="") {
    
    
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Enter all required credentials.",
            });
            return;
            }
          }
          for (let i = 0; i < numPartners; i++) {////////
            if (partners[i].profilePhoto===undefined||partners[i].profilePhoto===null||partners[i].profilePhoto===""||partners[i].name===undefined||partners[i].name===""||partners[i].description===undefined||partners[i].description===""||partners[i].title===undefined||partners[i].title===""||partners[i].linkedinLink===undefined||partners[i].linkedinLink==="") {
    
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Enter all required credentials.",
            });
            return;
            }
          }
          for (let i = 0; i < numDocs; i++) {////////
            if (docs[i].docFile===undefined||docs[i].docFile===null||docs[i].docFile===""||docs[i].docName===undefined||docs[i].docName==="") {
    
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Enter all required credentials.",
            });
            return;
            }
          }
    
          for (let i = 0; i < numPictures; i++) {////////
            if (pictures[i]==="" || pictures[i]===undefined||pictures[i]===null ) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Enter all required credentials.",
            });
            return;
            }
          }
    
    
          for(let i = 0; i < numDocs; i++) {////////
            if (docs[i]==="" || docs[i]===undefined||docs[i]===null ) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Enter all required credentials.",
            });
            return;
            }
          }
      
    
        
    
    
          if (
            chain === "" ||
            privatee === "" ||
            title === "" ||
            category === "" ||
            sortbyy === "" ||
            tge === "" ||
           ( special === true&&(discountedValuationCap===""||discount===""))||
            stage === "" ||
            location === "" ||
            investoramount === "" ||
            raisedmoney === "" ||
            mininvestment === "" ||
            valuationcap === "" ||
            description === "" ||
            logo === null ||   // Assuming this is a required field
            image === null ||  // Assuming this is a required field
            maxInvestment === "" ||
            fundingGoal === "" ||
            tgeDate === "" ||
            allocation === "" ||
            browsecLink === "" ||
            redditLink === "" ||
            twitterLink === "" ||
            deadline === "" ||
            nomineeLead === "" ||
            securityType === ""){
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Enter all required credentials.",
            });
            return; // Exit the function to prevent further processing
            }
    
            if(videoRequired==="yes"||videoRequired==="Yes"){
              if (videoChoice === "upload") {
                if(videoFile=== null || videoFile==="" || videoFile === undefined)
                {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Enter all required credentials.",
                });
                return; // Exit the function to prevent further processing
       
                }
               } else {
                 if(videoUrl==="" || videoUrl === null ||videoUrl === undefined)
                 {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Enter all required credentials.",
                });
                return; // Exit the function to prevent further processing
                   
                 }
               }
       
    
            }
    
    
    
    let x=0;
    for(x=0;x<numHighlightsStatements;x++)
    {
      if(highlightsStatements[x]===""||highlightsStatements[x]===undefined){
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Enter all required credentials.",
      });
      return; // Exit the function to prevent further processing
      }
        } 
    
        
        
    
        for(x=0;x<numUspStatements;x++)
        {
          if(uspStatements[x]===""||uspStatements[x]===undefined ){
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Enter all required credentials.",
          });
          return; // Exit the function to prevent further processing
          }
            } for(x=0;x<numUtilityStatements;x++)
            {
              if(utilityStatements[x]===""|| utilityStatements[x]===undefined){
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Enter all required credentials.",
              });
              return; // Exit the function to prevent further processing
              }
                } for(x=0;x<numRevenueStreamStatements;x++)
                {
                  if(revenueStreamStatements[x]===""||revenueStreamStatements[x]===undefined){
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "Enter all required credentials.",
                  });
                  return; // Exit the function to prevent further processing
                  }
                    } for(x=0;x<numRoadMapStatements;x++)
                    {
                      if(roadMapStatements[x]===""||roadMapStatements[x]===undefined ){
                        Swal.fire({
                          icon: "error",
                          title: "Error",
                          text: "Enter all required credentials.",
                      });
                      return; // Exit the function to prevent further processing
                      }
                        } for(x=0;x<numTechnologyStatements;x++)
                        {
                          if(technologyStatements[x]===""||technologyStatements[x]===undefined){
                            Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: "Enter all required credentials.",
                          });
                          return; // Exit the function to prevent further processing
                          }
                            } for(x=0;x<numMarketingStrategyStatements;x++)
                            {
                              if(marketingStrategyStatements[x]===""||marketingStrategyStatements[x]===undefined){
                                Swal.fire({
                                  icon: "error",
                                  title: "Error",
                                  text: "Enter all required credentials.",
                              });
                              return; // Exit the function to prevent further processing
                              }
                                } for(x=0;x<numTokenomicStatements;x++)
                                {
                                  if(tokenomicStatements[x]===""||tokenomicStatements[x]===undefined){
                                    Swal.fire({
                                      icon: "error",
                                      title: "Error",
                                      text: "Enter all required credentials.",
                                  });
                                  return; // Exit the function to prevent further processing
                                  }
                                    } 
    
    
    
    
                                   
                          
          const token = localStorage.getItem('token'); 
          const headers = {
            'Authorization': `Bearer ${token}`, // Corrected header format
          };
          const response = await axios.post(
            `${SERVERURL}/api/v1/AddProject`,form, {
              headers: headers, // Include the headers object in the request configuration
              onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              
                setProgress(progress);
                setUploading(true);
                // You can also update your UI with the current progress if needed
            },
            
            });
          console.log("responseForm", response);
    
         
          
            if(response.status === 201)
            {
              Swal.fire({
                icon: "error",
                title: "An error occurred",
                text: response.data.message,
              });
            }
            else
            {
    if(response.status === 200)
    {
      setVideoUrl("");
      setVideoChoice("upload");
      setVideoFile(null);
      setVideoRequired("no");
      setChain("");
      setCategory("");
      setSortByy("");
      setTge("");
      setSpecial(false);
      setStage("");
      setLocation("");
      setTitle("");
      setInvestorAmount("");
      setRaisedMoney("");
      setMinInvestment("");
      setValuationCap("");
      setDescription("");
      setLogo(null);
      setImage(null);
      setMaxInvestment("");
      setFundingGoal("");
      setTgeDate("");
      setAllocation("");
      setBrowsecLink("");
      setRedditLink("");
      setTwitterLink("");
      setNumPictures(0);
      setPictures([]);
      setDiscountedValuationCap("");
      setDeadline("");
      setDiscount("");
      setSecurityType("");
      setNomineeLead("");
      setNumHighlightsStatements(0);
      setNumUspStatements(0);
      setNumUtilityStatements(0);
      setNumRoadMapStatements(0);
      setNumRevenueStreamStatements(0);
      setNumTechnologyStatements(0);
      setNumMarketingStrategyStatements(0);
      setNumTokenomicStatements(0);
      setHighlightsStatements([]);
      setUspStatements([]);
      setUtilityStatements([]);
      setRoadMapStatements([]);
      setRevenueStreamStatements([]);
      setTechnologyStatements([]);
      setMarketingStrategyStatements([]);
      setTokenomicStatements([]);
      setNumPartners(0);
      setPartners([]);
      setNumTeamMembers(0);
      setTeamMembers([]);
      setNumDocs(0);
      setDocs([]);
      if (logoInputRef.current) {
        logoInputRef.current.value = null;
      }
      if (imageInputRef.current) {
        imageInputRef.current.value = null;
      }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Project Added Successfully.",
      });
    }
    else
    {
    
      if (response.status === 500) {
        console.log("came herrrrreeeeeeeeee") 
     // localStorage.setItem('token', response?.data?.token);            
     Swal.fire({
       icon: "error",
       title: "An error occurred",
       text: response.data.message,
     });
    
    }
    else
    {
    if(response.status === 400)
    {
     Swal.fire({
       icon: "error",
       title: "An error occurred",
       text: response.message,
     });
    
    }
    } 
    
    }
    
    
    
    }
      
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "An error occurred",
            text: "Project Not Added.",
          });
          console.error("Error registering ambassador:", error);
        } finally {
          setUploading(false); // Reset uploading state to false
      }
            
      }
      else
      {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Enter all required credentials.",
      });
      }


    };

    // Call the fetchAmbassadorsData function when the component mounts
  

    const handleFileChange = (e, setStateFunction) => {
      const file = e.target.files[0];
      console.log("log:",logo);
      setStateFunction(file);

    };  


    const pictureDivs = [];
    for (let i = 0; i < numPictures; i++) {
      pictureDivs.push(
        <div className="xyz" key={i}>
          <label className="topTextEditAdmVehic2">Upload Picture {i + 1}:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, (file) => handlePictureArray(file, i))}
          />
        </div>
      );
    }
    const docDivs = [];
    for (let i = 0; i < numDocs; i++) {
      docDivs.push(
        <div className="xyz" key={i}>
          <label className="topTextEditAdmVehic2">Upload Document {i + 1}:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, (file) => handleDocArray(file, i))}
          />
        </div>
      );
    }

// console.log("filterDrivers",filterDrivers,driversData,tempArray)
const logoInputRef = useRef(null);
const imageInputRef = useRef(null);
const handlePictureArray = (file, index) => {
  const updatedPictures = [...pictures];
  updatedPictures[index] = file;
  setPictures(updatedPictures);
};
const handleDocArray = (file, index) => {
  const updatedDocs = [...docs];
  updatedDocs[index] = file;
  setDocs(updatedDocs);
};
  console.log("driversData",driversData)

  console.log("idr tk tw aya aha ");

  return (
    <>
      {/* <AdminHeader rightHeader={rightHeader} /> */}
      
<AdminHeader rightHeader={rightHeader}/>
      <div className="topSideVehicles">
        <SideBarAdmin
        setRightHeader={setRightHeader}
        rightHeader={rightHeader}
        />
        
        <div className="vehicleAdminMain  bg-white ">
          <div className="topTextEditAdmVehic">
            Upload New Blog 
          </div>

          <div className="topTextsVehiclAdmin2">
            
          <form onSubmit={uploadOnServer}>
        

        
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Select">Select</option>
            <option value="AI">AI</option>
            <option value="DeFi">DeFi</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Metaverse">Metaverse</option>
            <option value="NFTs">NFTs</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>
        {errors.category && <p className="error">⚠ {errors.category}</p>}
        
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Heading:</label>
          <input    className="inputSearchVehic" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        {errors.heading && <p className="error">⚠ {errors.heading}</p>}
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Title:</label>
          <input     className="inputSearchVehic" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        {errors.title && <p className="error">⚠ {errors.title}</p>}

        <div className="xyz">
          <label className="topTextEditAdmVehic2">Author:</label>
          <input     className="inputSearchVehic" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        {errors.title && <p className="error">⚠ {errors.author}</p>}
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Read Time:</label>
          <input     className="inputSearchVehic" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        {errors.title && <p className="error">⚠ {errors.read}</p>}
        

        <div className="xyz">
          <label className="topTextEditAdmVehic2">Description:</label>
          <textarea className="fullWidthDescription" value={description} onChange={handleDescriptionChange} />
        </div>
        {errors.description && <p className="error">⚠ {errors.description}</p>}
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Logo:</label>
          <input     type="file" accept="image/*" ref={logoInputRef} onChange={(e) => handleFileChange(e, setLogo)} />
        </div>
        {errors.logo && <p className="error">⚠ {errors.logo}</p>}
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Cover Image:</label>
          <input     type="file" accept="image/*" ref={imageInputRef} onChange={(e) => handleFileChange(e, setImage)} />
        </div>
        {errors.image && <p className="error">⚠ {errors.image}</p>}
<div className="xyz">
          <label className="topTextEditAdmVehic2">Youtube Link:</label>
          <input    className="inputSearchVehic" type="text" value={browsecLink} onChange={(e) => setBrowsecLink(e.target.value)} />
        </div>
        {errors.browsecLink && <p className="error">⚠ {errors.browsecLink}</p>}
        <div className="xyz">
          <label className="topTextEditAdmVehic2">LinkedIn Link:</label>
          <input    className="inputSearchVehic" type="text" value={redditLink} onChange={(e) => setRedditLink(e.target.value)} />
        </div>
        {errors.redditLink && <p className="error">⚠ {errors.redditLink}</p>}
        <div className="xyz">
          <label className="topTextEditAdmVehic2">Twitter Link:</label>
          <input    className="inputSearchVehic" type="text" value={twitterLink} onChange={(e) => setTwitterLink(e.target.value)} />
        </div>
        {errors.twitterLink && <p className="error">⚠ {errors.twitterLink}</p>}
        {/* <div className="xyz">
        <label className="topTextEditAdmVehic2">Do you want to add a video?</label>
        <div className="like">
          <div>

          <input
            type="radio"
            id="videoYes"
            name="videoRequired"
            value="yes"
            checked={videoRequired === "yes"}
            onChange={(e) => setVideoRequired(e.target.value)}
          />
          <label htmlFor="videoYes">Yes</label>
          </div>
          <div>
          <input
            type="radio"
            id="videoNo"
            name="videoRequired"
            value="no"
            checked={videoRequired === "no"}
            onChange={(e) => setVideoRequired(e.target.value)}
          />
          <label htmlFor="videoNo">No</label>
          </div>

        </div>
      </div> */}
        <div className="xyz">
        <label className="topTextEditAdmVehic2">Do you want to make this Blog Featured?</label>
        <div className="like">
          <div>

          <input
            type="radio"
            id="videoYes"
            name="videoRequired"
            value="yes"
            checked={videoRequired === "yes"}
            onChange={(e) => setVideoRequired(e.target.value)}
          />
          <label htmlFor="videoYes">Yes</label>
          </div>
          <div>
          <input
            type="radio"
            id="videoNo"
            name="videoRequired"
            value="no"
            checked={videoRequired === "no"}
            onChange={(e) => setVideoRequired(e.target.value)}
          />
          <label htmlFor="videoNo">No</label>
          </div>

        </div>
      </div>

        <button className="btnSearchVehicle hh" type="submit">Upload Blog</button>
        {uploading && (
          <div className="modddd">
                    <div className="coontent">                  
                      <p>Uploading: {progress}%</p>
                    <div className="w-full bg-gray-200 rounded">
                        <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded" style={{ width: `${progress}%` }}>
                            
                        </div>
                    </div>
                </div>
                </div>
            )}
      </form>
               </div>
        </div>
      </div>
    
    </>
  );
};

export default AddProject;
