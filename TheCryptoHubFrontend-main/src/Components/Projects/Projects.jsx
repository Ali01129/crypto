import React, { useState, useEffect } from 'react'
import {Link , useNavigate } from 'react-router-dom'
import profile from '../../images/a1.png';
import loading2 from '../../../src/images/load.gif';
import ComboboxSortBy from '../ComboboxSortBy/ComboboxSortBy'
import ComboboxSearch from '../ComboboxSearch/ComboboxSearch'
import { SERVERURL } from "../../ServerUrl";
import axios from "axios"



import './Projects.css'
const Projects = () => {
  const [loading, setLoading] = useState(true); // State for loading status
  const [token, setToken]=useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  
  const sortby=[
    'Active',
    'Upcoming',
    'Ended',
  ];
  const chainIs=[
    'Solana',
    'Ethereum',
    'Polygon',
  ];
  const stageIs=[
    'Seed',
    'Private Sale',
  ];

  const empty=[];


  const [AuctionData,setAuctionData] = useState([]);


  const [searchedData, setSearchedData] = useState([AuctionData]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searched, setSearched] = useState(0);
  const [selectedCategorychain, setSelectedCategorychain] = useState(null);
  const [selectedCategorystage, setSelectedCategorystage] = useState(null);

  const [selectedButton, setSelectedButton] = useState(null);
  const handleClick = (event) => {
    const buttonValue = event.target.value;
    if(selectedButton===buttonValue){
      setSelectedButton();
      const filteredData = AuctionData;
      setSearchedData(filteredData);  
    }
    else{
      if(buttonValue==='All')
      {
        setSelectedButton(buttonValue);
        const filteredData = AuctionData;
        setSearchedData(filteredData);
              }
              else
              {
                if(selectedCategory===null && selectedCategorychain=== null && selectedCategorystage=== null )
                {
                  setSelectedButton(buttonValue);
                  const filteredData = AuctionData.filter((item) => item.category === buttonValue);
                  setSearchedData(filteredData);
            
            
                }
                else
                {
                  if(selectedCategory!==null && selectedCategorychain=== null && selectedCategorystage=== null )
                  {
                    setSelectedButton(buttonValue);
                    const filteredData = AuctionData.filter((item) => item.category === buttonValue && item.sortbyy === selectedCategory);
                    setSearchedData(filteredData);
              
              
                  }
                  else
                  {
                    if(selectedCategory===null && selectedCategorychain!== null && selectedCategorystage=== null )
                    {
                      setSelectedButton(buttonValue);
                      const filteredData = AuctionData.filter((item) => item.category === buttonValue && item.chain === selectedCategorychain);
                      setSearchedData(filteredData);
                  
                    }
                    else
                    {
                      if(selectedCategory===null && selectedCategorychain=== null && selectedCategorystage!== null )
                      {
                        setSelectedButton(buttonValue);
                        const filteredData = AuctionData.filter((item) => item.category === buttonValue && item.stage === selectedCategorystage);
                        setSearchedData(filteredData);
  
                      }
                      else
                      {
                        if(selectedCategory!==null && selectedCategorychain!== null && selectedCategorystage=== null )
                        {
                          setSelectedButton(buttonValue);
                          const filteredData = AuctionData.filter((item) => item.category === buttonValue && item.sortbyy === selectedCategory && item.chain === selectedCategorychain);
                          setSearchedData(filteredData);
      
                        }
                        else
                        {
                          if(selectedCategory===null && selectedCategorychain!== null && selectedCategorystage!== null )
                          {
                            setSelectedButton(buttonValue);
                            const filteredData = AuctionData.filter((item) => item.category === buttonValue && item.chain === selectedCategorychain && item.stage === selectedCategorystage);
                            setSearchedData(filteredData);
  
                          }
                          else
                          {
                            if(selectedCategory!==null && selectedCategorychain=== null && selectedCategorystage!== null )
                            {
                              setSelectedButton(buttonValue);
                              const filteredData = AuctionData.filter((item) => item.category === buttonValue && item.sortbyy === selectedCategory && item.stage === selectedCategorystage);
                              setSearchedData(filteredData);
  
                            }
                            else
                            {
                              if(selectedCategory!==null && selectedCategorychain!== null && selectedCategorystage!== null )
                              {
                                setSelectedButton(buttonValue);
                                const filteredData = AuctionData.filter((item) => item.category === buttonValue && item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain);
                                setSearchedData(filteredData);
                            
                              }
                          
                            }
                        
                          }
                      
                        }
                    
                      }
                  
                    }
                
                  }
              
                }

              }
    }      
    };
    
  
    const handleOptionSelected = (selectedCategory) => {
      // Filter the data based on the selected category
      console.log("selected is "+selectedCategory);
setSelectedCategory(selectedCategory);
      if(selectedButton===null)
      {
        if(selectedCategorychain===null && selectedCategorystage===null)
        {
          const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory);
          setSearchedData(filteredData);
  
        }
        else
        {
          if(selectedCategorychain!=null && selectedCategorystage===null)
          {
            const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.chain === selectedCategorychain);
            setSearchedData(filteredData);
  
          }
          else
          {
            if(selectedCategorychain===null && selectedCategorystage!==null)
            {
              const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategorychain!=null && selectedCategorystage!=null)
              {
                const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain );
                setSearchedData(filteredData);
      
              } 
            }
  
          }

        }
  
      }
      else
      {
        if(selectedButton==='All')
        {
          if(selectedCategorychain===null && selectedCategorystage===null)
          {
            const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory);
            setSearchedData(filteredData);
    
          }
          else
          {
            if(selectedCategorychain!=null && selectedCategorystage===null)
            {
              const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.chain === selectedCategorychain);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategorychain===null && selectedCategorystage!==null)
              {
                const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage);
                setSearchedData(filteredData);
      
              }
              else
              {
                if(selectedCategorychain!=null && selectedCategorystage!=null)
                {
                  const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain );
                  setSearchedData(filteredData);
        
                } 
              }
    
            }
  
          }
    
          }
        else
        {

          if(selectedCategorychain===null && selectedCategorystage===null)
          {
            const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.category === selectedButton);
            setSearchedData(filteredData);
    
          }
          else
          {
            if(selectedCategorychain!=null && selectedCategorystage===null)
            {
              const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.chain === selectedCategorychain && item.category === selectedButton);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategorychain===null && selectedCategorystage!==null)
              {
                const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.category === selectedButton);
                setSearchedData(filteredData);
      
              }
              else
              {
                if(selectedCategorychain!=null && selectedCategorystage!=null)
                {
                  const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain && item.category === selectedButton);
                  setSearchedData(filteredData);
        
                } 
              }
    
            }
  
          }
    
  
  
        }
      }
    };


    const handleOptionSelectedchain = (selectedCategorychain) => {
      // Filter the data based on the selected category
      console.log("selected is "+selectedCategorychain);
setSelectedCategorychain(selectedCategorychain);
      if(selectedButton===null)
      {

        if(selectedCategory===null && selectedCategorystage===null)
        {
        
          const filteredData = AuctionData.filter((item) => item.chain === selectedCategorychain);
          setSearchedData(filteredData);
  
        }
        else
        {
          if(selectedCategory!=null && selectedCategorystage===null)
          {
            const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.chain === selectedCategorychain);
            setSearchedData(filteredData);
  
          }
          else
          {
            if(selectedCategory===null && selectedCategorystage!==null)
            {
              const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage && item.chain === selectedCategorychain);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategory!=null && selectedCategorystage!=null)
              {
                const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain );
                setSearchedData(filteredData);
      
              } 
            }
  
          }

        }
    
      }
      else
      {
        if(selectedButton==='All')
        {

          if(selectedCategory===null && selectedCategorystage===null)
          {
            const filteredData = AuctionData.filter((item) => item.chain === selectedCategorychain);
            setSearchedData(filteredData);
    
          }
          else
          {
            if(selectedCategory!=null && selectedCategorystage===null)
            {
              const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.chain === selectedCategorychain);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategory===null && selectedCategorystage!==null)
              {
                const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage && item.chain === selectedCategorychain);
                setSearchedData(filteredData);
      
              }
              else
              {
                if(selectedCategory!=null && selectedCategorystage!=null)
                {
                  const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain );
                  setSearchedData(filteredData);
        
                } 
              }
    
            }
  
          }
    

        }
        else
        {

          if(selectedCategory===null && selectedCategorystage===null)
          {
            const filteredData = AuctionData.filter((item) => item.chain === selectedCategorychain  && item.category === selectedButton);
            setSearchedData(filteredData);
    
          }
          else
          {
            if(selectedCategory!=null && selectedCategorystage===null)
            {
              const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.chain === selectedCategorychain && item.category === selectedButton);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategory===null && selectedCategorystage!==null)
              {
                const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage && item.chain === selectedCategorychain  && item.category === selectedButton);
                setSearchedData(filteredData);
      
              }
              else
              {
                if(selectedCategory!=null && selectedCategorystage!=null)
                {
                  const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain && item.category === selectedButton );
                  setSearchedData(filteredData);
        
                } 
              }
    
            }
  
          }
    

        }

      }
    };

    
    const handleOptionSelectedstage = (selectedCategorystage) => {
      // Filter the data based on the selected category
      console.log("selected is "+selectedCategorystage);
setSelectedCategorystage(selectedCategorystage);
      if(selectedButton===null)
      {

        if(selectedCategory===null && selectedCategorychain===null)
        {
          
          const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage );
          setSearchedData(filteredData);
  
        }
        else
        {
          if(selectedCategory!=null && selectedCategorychain===null)
          {
            const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage);
            setSearchedData(filteredData);
  
          }
          else
          {
            if(selectedCategory===null && selectedCategorychain!==null)
            {
              const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage && item.chain === selectedCategorychain);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategory!=null && selectedCategorychain!=null)
              {
                const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain );
                setSearchedData(filteredData);
      
              } 
            }
  
          }

        }



  
      }
      else
      {
        if(selectedButton==='All')
        {

          if(selectedCategory===null && selectedCategorychain===null)
          {
            
            const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage );
            setSearchedData(filteredData);
    
          }
          else
          {
            if(selectedCategory!=null && selectedCategorychain===null)
            {
              const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategory===null && selectedCategorychain!==null)
              {
                const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage && item.chain === selectedCategorychain);
                setSearchedData(filteredData);
      
              }
              else
              {
                if(selectedCategory!=null && selectedCategorychain!=null)
                {
                  const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain );
                  setSearchedData(filteredData);
        
                } 
              }
    
            }
  
          }
  
  
  

        }
        else
        {


          if(selectedCategory===null && selectedCategorychain===null)
          {
          
            const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage  && item.category === selectedButton );
            setSearchedData(filteredData);
    
          }
          else
          {
            if(selectedCategory!=null && selectedCategorychain===null)
            {
              const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage  && item.category === selectedButton);
              setSearchedData(filteredData);
    
            }
            else
            {
              if(selectedCategory===null && selectedCategorychain!==null)
              {
                const filteredData = AuctionData.filter((item) => item.stage === selectedCategorystage && item.chain === selectedCategorychain  && item.category === selectedButton);
                setSearchedData(filteredData);
      
              }
              else
              {
                if(selectedCategory!=null && selectedCategorychain!=null)
                {
                  const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.stage === selectedCategorystage && item.chain === selectedCategorychain  && item.category === selectedButton );
                  setSearchedData(filteredData);
        
                } 
              }
    
            }
  
          }
  
  
  

  
        }
      }
    };



  
    const handleSearch = (searchTerm) => {
      // Compare the searchTerm with auctionData and filter the matched items
      const filteredData = AuctionData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      // Save the matched data in the state
      setSearchedData(filteredData);
    };


    
  useEffect(() => {
    console.log("at least a tw gya");
    // Fetch data from your server using axios or any other library
    axios.get(`${SERVERURL}/api/v1/getProjects`)
      .then((response) => {
        // Assuming your API response contains an array of projects
        let projectsData = response.data;
        let loggedin= localStorage.getItem("loggedin");
        if(loggedin)
        {
          setAuctionData(projectsData);
          setSearchedData(projectsData);          
        }
        else
        {
          let filteredData=projectsData.filter((item) => item.privatee === "False" || item.privatee === "false" || item.privatee === null || item.privatee === false || item.privatee === undefined);
          setAuctionData(filteredData);
          setSearchedData(filteredData);
        }
        console.log("at least a tw gya",projectsData,AuctionData);
        setSearched(1);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  
  return (
    <>
           {/* Start */}
<div className='revise'>
      <div className="new45 new12 container finalWidth wrapisss">
            <div className="leftwala">
              <div className="">
                <p className="fontheading2 leftpadiss">Curated Projects</p>
                <p className="fontpara leftpadiss" >
                Search & get access to our selected list of early-stage Projects in Crypto & Web3
                </p>
              </div>
            </div>
            {/*end col*/}
            <div className="rightaligned" style={{marginTop:'30px'}}>
              <div className="toppp">
              <button className="filterrr clicked" value="All" onClick={handleClick}>
        All
      </button>  
              <button className={`filterrr ${selectedButton === 'AI' ? 'clicked' : ''}`} value="AI" onClick={handleClick}>
        AI
      </button>
      <button   className={`filterrr ${selectedButton === 'DeFi' ? 'clicked' : ''}`} value="DeFi" onClick={handleClick}>
        DeFi
      </button>
      <button className={`filterrr ${selectedButton === 'Metaverse' ? 'clicked' : ''}`} value="Metaverse" onClick={handleClick}>
        Metaverse
      </button>
      <button className={`filterrr ${selectedButton === 'NFTs' ? 'clicked' : ''}`} value="NFTs" onClick={handleClick}>
        NFTs
      </button>
      <button className={`filterrr ${selectedButton === 'Infrastructure' ? 'clicked' : ''}`} value="Infrastructure" onClick={handleClick}>
      Infrastructure
      </button>
      <button className={`filterrr ${selectedButton === 'Gaming' ? 'clicked' : ''}`} value="Gaming" onClick={handleClick}>
      Gaming
      </button>

              </div>
              <div className="bottommm">
                
                <div className="bottomright" >
                <ComboboxSearch className="searchbaris" dataIs={empty} placeholderIs="Start typing to search" classIs="fa-solid fa-magnifying-glass" drop='false' anchor='false' valueis='true' onEnterPress={handleSearch}/>
              </div>
              <div className='bottomleftt' style={{display:'flex',alignItems:'center'}}>
                <div className="bottomleft" >
                  <ComboboxSortBy dataIs={sortby} widthIs={true} placeholderIs="Most traction" classIs="fa-solid fa-compact-disc" drop='true' anchor='true' valueis='true' onSelect={handleOptionSelected}/>
                </div>
                <div className="bottomleft" >
                  <ComboboxSortBy dataIs={chainIs} widthIs={false} placeholderIs="Chain" classIs="fa-solid fa-compact-disc" drop='true' anchor='true' valueis='true' onSelect={handleOptionSelectedchain}/>
                </div>
                <div className="bottomleft" >
                  <ComboboxSortBy dataIs={stageIs} widthIs={false} placeholderIs="Stage" classIs="fa-solid fa-compact-disc" drop='true' anchor='true' valueis='true' onSelect={handleOptionSelectedstage}/>
                </div>
                </div>
              </div>
            </div>
            {/*end col*/}

          </div>
          {
!token && 
          <div className=" new12345" style={{flexDirection:"column"}}>
            <div className='lineOuter'>
            <div className='projectsPrivacy'>
              <div className='imj'>
              <img className='projectsPrivacyImage' src={profile} alt="" /> 
              </div>


<div className='lineeee'> To see our latest & featured projects available for investment, please 
<span 
style={{ 
color: 'blue',
marginLeft: '5px',
marginRight: '5px',
cursor: 'pointer',
textDecoration: 'none',
}}
onClick={() => navigate('/user/login')}
onMouseOver={(e) => { e.target.style.textDecoration = 'underline'; }}
onMouseOut={(e) => { e.target.style.textDecoration = 'none'; }}
>
Log in 
</span> 
to your account      
</div>




         
            
          </div> 
          </div> 

          <div className="" style={{marginTop:"15px",fontSize:"18px",wordSpacing:"0px", paddingBottom:"15px",color:"grey",textAlign:"center", fontFamily:"Inter var, Inter, Helvetica Neue, Arial, sans-serif"}}>Note: Any projects listed on the website are solely for the purpose of information and should not be considered as an advise for investment. Please do your own research before investing in any projects!</div>
</div>
}

</div>
  
{loading && (
            <div className="loading">
              <img className="gif" src={loading2} alt="Loading..." />
            </div>
          )}

          {/* Display projects table when loading state is false */}
          {!loading && (
                      <section className=" new1234">
        
      

                      {/* End Home */}
                
                
                        <div className="container container2222">
                          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                          {(!searched) ? (
                <div className="no-data-message">
                  
                </div>
              ) : (searchedData?.map((data, index) => {
                              return (
                                <div className="col" key={index}>
                                  <div className="card nft-items nft-primary nft-auction upperrounded shadow1 overflow-hidden biggerwidth hoveris h600px" onClick={e => {
                                          e.preventDefault()
                                          navigate(`/user/projectDetail/${data?.title}`)
                                        }}>
                                    
                                    <div className=" rounded-md  position-relative moreheightis overflow-hidden ">
                                      <div>
                                        <img src={SERVERURL+'/uploads/'+data.image} className="img-fluid objectfitt moreheightis hundredwidth" alt="" />
                                      </div>
                                      {data?.special && (
                                        <div className="special">
                                           <i class="fa-solid fa-star staroffeatured"></i> FEATURED
                                          </div>
                                      )
                
                                      }
                
                                      <div className="position-absolute topdowner trans leftttt">
                
                                       <img className="widthheight borderisss" src={SERVERURL+'/uploads/'+data.logo}  alt="" />
                                       </div>
                                      
                                      
                                    </div>
                
                                    <div  className="card-body content position-absolute moretopandbackcolor moreepaddingtop trans ppp" style={{ backgroundColor: data.funded ? '#fafafa' : '#fff' }}>
              
                
                    
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {data?.title}
                    </h2>
              
              
                                    {/* <div    className="title text-dark h6"
                                      >
                                        {data?.description}
                                      </div> */}
                
                                      <div className="d-block align-items-center justify-content-between mt-3">
                                        <div className="padtop h100px">
                                          
                                          <p className="mb-0 d-block fw-semibold12 carddescription">
                                            {data?.description}
                                          </p>
                                        </div>
                                        <div className='bottomcard'>
                                        <div className="padtop lcc">
                                          <p className="mb-0 d-block fw-semibold12 cardlocation">
                                            {data?.location}
                                          </p>
                                        </div>
                                        
                                        <div className="keywords">
                      {
              data?.sortbyy && (
              <div className="keyword" >
                      {data?.sortbyy}
                    </div>
                     ) }
              
              {
              
              data?.category &&(
              <div className="keyword" >
              {data?.category}
              </div>
              )
              }
                    
                      
                
                </div>
                <div className="lastline">
                CryptoHub Funding Portal · Reg CF
                    </div>
                    </div>
                                      </div>
                                    </div>
                                    <div className="belower"> 
                                    <div className={`belowercontent ${data.funded ? 'funded' : ''}`}> 
                                    <span className="prominent" style={{marginRight:'35px'}}><strong>Chain: </strong></span>           <div class='toggle1'>
                {data.chain}
                      </div>
                                    </div>
                                    <div className={`belowercontent ${data.funded ? 'funded' : ''}`}> 
                                      <span className="prominent" style={{marginRight:'7px'}}><strong>Valuation:</strong></span>{data.valuationCap === 0 ? 'N/A' : `$${data.valuationCap}`}
                                    </div>  
                                    <div className={`belowercontent ${data.funded ? 'funded' : ''}`} > 
                 <span className="prominent" style={{marginRight:'35px'}}><strong>Stage:   </strong></span> <div class='toggle2'>{data.stage}      
                      </div>
                                    </div>
                                    <div className={`belowercontent ${data.funded ? 'funded' : ''}`}> 
                                      <span className="prominent" style={{marginRight:'50px'}}><strong>TGE:</strong></span>{data.tge}
                                    </div>  
              
                                    </div>
                                  </div>
                                </div>
                              )
                            }))}
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                
                          
                          {/*end row*/}
                        </div>
                        {/*end container*/}
                      </section>
              
          )}

        
  
      {/*end section*/}
      {/* End */}

      {/* CTA Start */}
      
      {/*end section*/}
      {/* CTA End */}
      
    </>
  )
}

export default Projects
