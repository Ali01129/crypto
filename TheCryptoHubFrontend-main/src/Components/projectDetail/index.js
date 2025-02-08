import { SERVERURL } from "../../ServerUrl";
import loading2 from '../../../src/images/load.gif';
import React, { useState , useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactVideoPlayer from '../VideoPlayer'
import "./Style1.css"

const ItemDetailOne = (props) => {
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate();

  const handleGetInTouch = () => {
      navigate('/user/contact'); // Replace '/' with your homepage route path if different
  };
  const handleHowItWorks = () => {
    navigate('/user/contact'); // Replace '/' with your homepage route path if different
};


  const [activeMenu, setActiveMenu] = useState('Project Details');
  const [activeSection, setActiveSection] = useState(null);
  const [selected, setSelected] = useState('one');

  const [projectDetails2, setProjectDetails2] = useState([]);
  const [projectDetails,setProjectDetails] = useState(projectDetails2);

  const highlightsRef = useRef(null);
  const uspRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);
  const fifthRef = useRef(null);
  const sixthRef = useRef(null);
  const seventhRef = useRef(null);
  const eightRef = useRef(null);
  const parentRef = useRef(null);
  
  const firstRef = useRef(null);
  const scndRef = useRef(null);

  const scrollToSection = (ref, containerClass) => {
    if (ref && ref.current) {
      const headerOffset = 100; // Offset for the header height
      const refPosition = ref.current.getBoundingClientRect().top;
      const containerElement = document.querySelector(`.${containerClass}`);

      if (containerElement) {
        const containerPosition = containerElement.getBoundingClientRect().top;

        // Check if the reference is already in view within the container
        if (refPosition >= containerPosition && refPosition < containerPosition + containerElement.clientHeight) {
          // If already in view, scroll the reference to the top of the screen
          const offsetPosition = refPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Scroll the reference section to the top of the specified container div
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Then scroll the container div to the top of the screen
          const offsetPosition = containerPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const handleClick = (event) => {
    const Value = event.currentTarget.dataset.value;
    setSelected(Value);
    if (Value === 'one') {
      scrollToSection(firstRef, 'teamAndPartners');
    } else if (Value === 'two') {
      scrollToSection(scndRef, 'teamAndPartners');
    }
  };

  useEffect(() => {
    let title = props.title;
    console.log("title is ...", title, "");

    axios
      .get(`${SERVERURL}/api/v1/getProjectUsingTitle?title=${title}`)
      .then((response) => {
     let xyz=response.data;
        setProjectDetails2(xyz);
        setProjectDetails(xyz); // Set the state with the fetched data
        setLoading(false);
        console.log("Fetched project details:", projectDetails);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [props.title]);
return (
    <>
      {/* Navbar */}
      {loading && (
            <div className="loading">
              <img className="gif" src={loading2} alt="Loading..." />
            </div>
          )}

          {/* Display projects table when loading state is false */}
          {!loading && (
      <section className=" d-table w-100 backwhite">

      <div className="container mt-4 flex5 firstline">
        
        <div className='flex1'>
          <img src={SERVERURL+'/uploads/'+projectDetails.logo}  className='logoclass'></img>
        <h1 className='projectHeading1'>{projectDetails.title}</h1>
        
        </div>
        <div className='socialmedias'>
        
    <div className='social1'>
      <a href={projectDetails.youtubeLink} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-youtube con1" aria-hidden="true"></i>
      </a>
    </div>

    <div className='social2'>
      <a href={projectDetails.linkedinLink} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-linkedin con2"></i>
      </a>
    </div>
    
    <div className='social3'>
      <a href={projectDetails.twitterLink} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-twitter con3"></i>
      </a>
    </div>
  </div>
        
      </div>
      <div className="container secondline">
        <p className='thirdline'>{projectDetails.description}</p>
      </div>        
      <div className="container">
        <div className='thirdline'>
        <div className='thirdleft'>
          {projectDetails.special && (
            <div className='thirdFeatured'>
              <i class="fa-solid fa-star star"></i> FEATURED
              </div>
          )}

              <div className='thirdFilters'>
                {projectDetails.category}
              </div>
        </div>
        <div className='thirdright'>

              <div className='thirdFilters'>
                {projectDetails.sortbyy}
              </div>
        </div>
        </div>
      </div>        
      
      <div>
      <div className="container flexxxx">
      <ReactVideoPlayer pics={projectDetails.pictures} videoUrl={projectDetails.youtubeLink || ""}     />
      <div className='rightpartOuter'>
        <div className='rightpart'>
        <div className='flex22'>
        <div className='rightpartLeftAlignedDiv'>
Chain:
          </div>
          <div className='rightpartRightAlignedDiv'>
          {projectDetails.chain}
        </div>
        </div>
        <div className='flex22'>
        <div className='rightpartLeftAlignedDiv'>
Stage:
          </div>
          <div className='rightpartRightAlignedDiv'>
          {projectDetails.stage}
        </div>
        </div>
        <div className='flex22'>
        <div className='rightpartLeftAlignedDiv'>
Value Cap:
          </div>
          <div className='rightpartRightAlignedDiv'>
          {projectDetails.valuationCap === 0 ? 'N/A' : `$${projectDetails.valuationCap}`}
        </div>
        </div>
        <div className='flex22'>
        <div className='rightpartLeftAlignedDiv'>
Allocation:
          </div>
          <div className='rightpartRightAlignedDiv'>
          {projectDetails.allocation === 0 ? 'N/A' : `$${projectDetails.allocation}`}
        </div>
        </div>
        <div className='flex22'>
        <div className='rightpartLeftAlignedDiv'>
TGE Date:
          </div>
          <div className='rightpartRightAlignedDiv'>
          {projectDetails.tgeDate}
        </div>
        </div>
        <div className='flex22'>
        <div className='rightpartLeftAlignedDiv'>
Days Left:
          </div>
          <div className='rightpartRightAlignedDiv'>
          {projectDetails.tge}
        </div>
        </div>
        
        </div>
        <div className='rightpartButton'>
          <button onClick={handleGetInTouch} className='okbton'>Get in Touch</button>
        </div>
      </div>
      </div>
      </div>
      <div>

      {/* className='sliderThums' */}
      <div className='navmenusContainer' ref={parentRef}>
      <div className='navmenuOuter'>
      <div  className={`navmenu ${activeMenu === 'Project Details' ? 'clicked3' : ''}`}
    onClick={() => setActiveMenu('Project Details')}>
        Project Details
      </div>
      <div  className={`navmenu ${activeMenu === 'Team & Partners' ? 'clicked3' : ''}`}
    onClick={() => setActiveMenu('Team & Partners')}>
        Team & Partners
      </div>  
      </div>
      </div>
      <div>
{activeMenu === 'Project Details' && (
  /* Render Project Details section here */
  
  <div className='projectDetails'>
        <div className='projectDetailsLeft'>
        <div className={`projectDetailsLeftDiv ${activeSection === 'highlights' ? 'teamAndPartnersLeftDiv1' : 'teamAndPartnersLeftDiv'}`} onClick={() => {scrollToSection(highlightsRef, 'projectDetailsMid'); setActiveSection('highlights');}}> Highlights</div>
        <div className={`projectDetailsLeftDiv ${activeSection === 'USP' ? 'teamAndPartnersLeftDiv1' : 'teamAndPartnersLeftDiv'}`} onClick={() => {scrollToSection(uspRef, 'projectDetailsMid'); setActiveSection('USP');}}>USP</div>
        <div className={`projectDetailsLeftDiv ${activeSection === 'Utility' ? 'teamAndPartnersLeftDiv1' : 'teamAndPartnersLeftDiv'}`} onClick={() => {scrollToSection(thirdRef, 'projectDetailsMid'); setActiveSection('Utility');}}>Utility</div>
        <div className={`projectDetailsLeftDiv ${activeSection === 'RoadMap' ? 'teamAndPartnersLeftDiv1' : 'teamAndPartnersLeftDiv'}`} onClick={() => {scrollToSection(fourthRef, 'projectDetailsMid');  setActiveSection('RoadMap');}}>Roadmap</div>
        <div className={`projectDetailsLeftDiv ${activeSection === 'Revenue' ? 'teamAndPartnersLeftDiv1' : 'teamAndPartnersLeftDiv'}`} onClick={() => {scrollToSection(fifthRef, 'projectDetailsMid'); setActiveSection('Revenue');}}>Revenue Streams</div>
        <div className={`projectDetailsLeftDiv ${activeSection === 'Technology' ? 'teamAndPartnersLeftDiv1' : 'teamAndPartnersLeftDiv'}`} onClick={() => {scrollToSection(sixthRef, 'projectDetailsMid'); setActiveSection('Technology');}}>Technology</div>
        <div className={`projectDetailsLeftDiv ${activeSection === 'Marketing' ? 'teamAndPartnersLeftDiv1' : 'teamAndPartnersLeftDiv'}`} onClick={() => {scrollToSection(seventhRef, 'projectDetailsMid'); setActiveSection('Marketing');}}>Marketing Strategy</div>
        <div className={`projectDetailsLeftDiv ${activeSection === 'Tokenomics' ? 'teamAndPartnersLeftDiv1' : 'teamAndPartnersLeftDiv'}`} onClick={() => {scrollToSection(eightRef, 'projectDetailsMid'); setActiveSection('Tokenomics');}}>Tokenomics</div>

        </div>
        <div className='projectDetailsMid '>
          <div className='projectDetailsMidDiv ' ><h2 ref={highlightsRef} className='projectDetailsMidDivh text-left text-xs font-medium text-gray-500 tracking-wider'>Highlights</h2></div>
<div className='projectDetailsMidDiv morepadleft'>

  
      
          <div className='projectDetailsMidDivContent morepaddown'dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(projectDetails.highlights) }}>

          </div>
          {projectDetails.highlightsImage && (
  <img className='innerimages' src={`${SERVERURL}/uploads/${projectDetails.highlightsImage}`} alt="Highlights" />
)}


</div>     
<div className='projectDetailsMidDiv ' ><h2 ref={uspRef} className='projectDetailsMidDivh text-left text-xs font-medium text-gray-500  tracking-wider'>USP</h2></div>
<div className='projectDetailsMidDiv morepadleft'>
      
          <div className='projectDetailsMidDivContent morepaddown' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(projectDetails.usp) }}></div>
          {projectDetails.uspImage && (
  <img className='innerimages' src={`${SERVERURL}/uploads/${projectDetails.uspImage}`} alt="USP" />
)}

</div>          
<div className='projectDetailsMidDiv '><h2 ref={thirdRef} className='projectDetailsMidDivh text-left text-xs font-medium text-gray-500  tracking-wider'>Utility</h2></div>
<div className='projectDetailsMidDiv morepadleft'>
      
          <div className='projectDetailsMidDivContent morepaddown' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(projectDetails.utility) }}></div>
          {projectDetails.utilityImage && (
  <img className='innerimages' src={`${SERVERURL}/uploads/${projectDetails.utilityImage}`} alt="Utility" />
)}

</div>           
<div className='projectDetailsMidDiv '><h2 ref={fourthRef} className=' text-left text-xs font-medium text-gray-500  tracking-wider projectDetailsMidDivh'>Roadmap</h2></div>
<div className='projectDetailsMidDiv morepadleft'>
       
          <div className='projectDetailsMidDivContent morepaddown'dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(projectDetails.roadMap) }}></div>
          {projectDetails.roadMapImage && (
  <img className='innerimages' src={`${SERVERURL}/uploads/${projectDetails.roadMapImage}`} alt="Road Map" />
)}

</div>           
<div className='projectDetailsMidDiv '><h2 ref={fifthRef} className=' text-left text-xs font-medium text-gray-500  tracking-wider projectDetailsMidDivh'>Revenue Streams</h2></div>
<div className='projectDetailsMidDiv morepadleft'>

      
          <div className='projectDetailsMidDivContent morepaddown' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(projectDetails.revenueStream) }}></div>
          {projectDetails.revenueStreamImage && (
  <img className='innerimages' src={`${SERVERURL}/uploads/${projectDetails.revenueStreamImage}`} alt="Revenue Stream" />
)}

</div>          
<div className='projectDetailsMidDiv '><h2 ref={sixthRef} className=' text-left text-xs font-medium text-gray-500  tracking-wider projectDetailsMidDivh'>Technology</h2></div>
<div className='projectDetailsMidDiv morepadleft'>

      
          <div className='projectDetailsMidDivContent morepaddown' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(projectDetails.technology) }}></div>
          {projectDetails.technologyImage && (
  <img className='innerimages' src={`${SERVERURL}/uploads/${projectDetails.technologyImage}`} alt="Technology" />
)}

</div>           
<div className='projectDetailsMidDiv '><h2 ref={seventhRef} className='projectDetailsMidDivh text-left text-xs font-medium text-gray-500  tracking-wider'>Marketing Strategy</h2></div>
<div className='projectDetailsMidDiv morepadleft'>

      
          <div className='projectDetailsMidDivContent morepaddown' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(projectDetails.marketingStrategy) }}></div>  
          {projectDetails.marketingStrategyImage && (
  <img className='innerimages' src={`${SERVERURL}/uploads/${projectDetails.marketingStrategyImage}`} alt="Marketing Strategy" />
)}

</div>           
<div className='projectDetailsMidDiv '><h2 ref={eightRef} className='text-left text-xs font-medium text-gray-500  tracking-wider projectDetailsMidDivh'>Tokenomics</h2></div>
<div className='projectDetailsMidDiv morepadleft'>

      
          <div className='projectDetailsMidDivContent morepaddown' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(projectDetails.tokenomic) }}></div>  
          {projectDetails.tokenomicImage && (
  <img className='innerimages' src={`${SERVERURL}/uploads/${projectDetails.tokenomicImage}`} alt="Tokenomic" />
)}

</div>           



        </div>
        

        <div className='projectDetailsRight'>
        <div className='projectDetailsRightDiv'>
        <h2 className='projectDetailsRightDivh px-6  text-left text-xs font-medium text-gray-500  tracking-wider'>Deal Terms</h2>            
        {projectDetails.special && <div className='projectDetailsRightDivs'><i class="fa-solid fa-bolt"></i> Special</div>}
        </div>
        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Valuation cap</div>            
        <div className='projectDetailsRightDivr'>
        {

projectDetails.special &&(< div className='anotherR'>
          <div className='projectDetailsRightDivrl'>
         <i class="fa-solid fa-bolt"></i> ${projectDetails.discountedValuationCap}
        </div> 
          <del className='projectDetailsRightDivrr'>
          ${projectDetails.valuationCap}
        </del>
        </div>)
        }
        
        { !projectDetails.special &&
          <div className='projectDetailsRightDivrr'>
          {projectDetails.valuationCap === 0 ? 'N/A' : `$${projectDetails.valuationCap}`}
        </div>}
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>
        { projectDetails.special &&
        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Discount</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
        {projectDetails.discount}%
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>
}
        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Min Investment</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
        {projectDetails.minimumInvestment === 0 ? 'N/A' : `$${projectDetails.minimumInvestment}`}  
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>

        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Max Investment</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
        {projectDetails.maximumInvestment === 0 ? 'N/A' : `$${projectDetails.maximumInvestment}`}
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>

        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Investor Amount</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
        {projectDetails.investorAmount === 0 ? 'N/A' : `$${projectDetails.investorAmount}`}
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>
        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Raised Money</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
        {projectDetails.raisedMoney === 0 ? 'N/A' : `$${projectDetails.raisedMoney}`}
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>
        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Location</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
          {projectDetails.location}
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>

        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Funding Goal</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
        {projectDetails.fundingGoal === 0 ? 'N/A' : `$${projectDetails.fundingGoal}`}
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>


        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Deadline</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
       {projectDetails.deadline}
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>

        <div className='projectDetailsRightDiv bottttom'>
        <div className='projectDetailsRightDivl'>Security Type</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
         {projectDetails.securityType}
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>

        <div className='projectDetailsRightDiv'>
        <div className='projectDetailsRightDivl'>Nominee Lead</div>            
        <div className='projectDetailsRightDivr'>
        <div className='projectDetailsRightDivrr'>
         {projectDetails.nomineeLead}
        </div>
        <div className='projectDetailsRightDivi'>
        <i class="fa-solid fa-info fa-2xs iconissss"></i>
        </div>  
        </div>
        </div>
<div className='projectDetailsRightDiv'>
        < div className='projectDetailsRightb' onClick={handleHowItWorks}>
          How it works
        </div>
        </div>
        <h2 className='projectDetailsRightDivh futhertop'>Documents</h2>
        <div className='projectDetailsRightDoc'>
          <div className='projectDetailsRightDocUpper'>
        < div className='projectDetailsRightDocUpperu'>
        Through TCH (TheCryptHub) , Attachments offered by {projectDetails.title} will be in following section.
        </div>
        
        </div>

        <div className='dow'>
     {   projectDetails.docs && (
<><div className='dowU'>
Company documents
</div>

<div className='dowD'>
{
projectDetails.docs && projectDetails.docs.map(filter => (////////////////here need to make backend and front end for it

<a href={SERVERURL+'/uploads/'+filter.docFile} className='dowDdiv'>
<div className='dowDdivl'> 
<i class="fa-regular fa-file-lines doccc"></i>           </div>
         <div className='dowDdivr'> 
         {filter.docName}           
         </div>
</a>
))
}
        </div>
        </>
)   }
       
        </div>
        </div>

        </div>
  </div>

)}
{activeMenu === 'Team & Partners' && (
<div className='teamAndPartners'>
  <div className='teamAndPartnersLeft'>
    <div 
      className={selected === 'one' ? 'teamAndPartnersLeftDiv1':'teamAndPartnersLeftDiv'} 
      onClick={handleClick} 
      data-value='one'>
      Who Is The Team Of {projectDetails.title} ({projectDetails.title})? 
    </div>
    <div 
      className={selected === 'two' ? 'teamAndPartnersLeftDiv1':'teamAndPartnersLeftDiv'} 
      onClick={handleClick} 
      data-value='two'>
      Who Are Investors & Partners Of {projectDetails.title}? 
    </div>
  </div>

  <div className='teamAndPartnersRight'>
    <div className='teamAndPartnersRightDiv' ref={firstRef}>
      Who Is The Team Of {projectDetails.title}? 
    </div>
    <div className='teamAndPartnersRightDivImg'>
      {projectDetails.teamMembers.length > 0 ? (
        projectDetails.teamMembers.map((member, index) => (
          <div className='members' key={index}>
            <div className='member'>
              <img className='memberImg' src={SERVERURL+'/uploads/'+member.profilePhoto} alt={member.name} />
              <div className='memberName'>{member.name}</div>
              <div className='memberTitle'>{member.title}</div>
              <div className='memberDesc'>{member.description}</div>
              <a className='memberLinkedin' href={member.linkedinLink} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="revision1">No Team Member In this Project.</div>
      )}
    </div>
    
    <div className='teamAndPartnersRightDiv' ref={scndRef}>
      Who Are Investors & Partners Of {projectDetails.title}? 
    </div>
    <div className='teamAndPartnersRightDivImg'>
      {projectDetails.partners.length > 0 ? (
        projectDetails.partners.map((partner, index) => (
          <div className='members' key={index}>
            <div className='member'>
              <img className='memberImg' src={SERVERURL+'/uploads/'+partner.profilePhoto} alt={partner.name} />
              <div className='memberName'>{partner.name}</div>
              <div className='memberTitle'>{partner.title}</div>
              <div className='memberDesc'>{partner.description}</div>
              <a className='memberLinkedin' href={partner.linkedinLink} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="revision1">No Investor and Partner in this Project.</div>
      )}
    </div>
  </div>
</div>
)}
</div>
      </div>
</section>
          )}
      
    </>
  )
}

export default ItemDetailOne;
