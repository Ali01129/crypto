import React, { useState, useEffect } from 'react'
import {Link , useNavigate } from 'react-router-dom'

import ComboboxSortBy from '../../Components/ComboboxSortBy'
import ComboboxSearch from '../../Components/ComboboxSearch'

import Footer from '../../Components/Footer'
import Navbar from '../../Components/Navbar'


const ExploreTwo = () => {
  const navigate = useNavigate()
  
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


  const AuctionData = [
    {
      chain:"Solana",
      special:true,
      tge:'20',
      sortbyy:'Active',
      category:"AI",
      location:'Sunrise, FL',
      title: 'Pure Green',
      vid1:"https://uploads.republic.com/p/offerings/slider_media_items/contents/original/000/011/405/11405-1686092753-3390b035bd08592faf6b50337b97d04bde8b6797.mp4",
      keywords:['Active','AI'],
      investoramount:'105',
      stage:"Seed",
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'4,000,000 M',
      description:'Fastest-growing Juice Bar Franchise favored by pro athletes & celebs',
      logo: "https://imgproxy.republic.com/s7cpxJfphYy1s3JuxL0oQqDeb5MNtzMa6OCg1ZQqJZ0/rs:fit:120:120/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9sb2dvcy9v/cmlnaW5hbC8wMDAv/MDAyLzIzNS8yMjM1/LTE2ODExNDcwMjMt/YjA0NjEzN2E4ZGFi/MDdmMjU3YTliMGM2/ZjRlYTZkNjkwYjUy/ZjQ4Yy5wbmc",
      image:"https://imgproxy.republic.com/kZeVCHVRhny-Zx7wi3YZ3J_H_KGDOud80LFrxvUvhdo/rs:::/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9jYXJkX2lt/YWdlcy9vcmlnaW5h/bC8wMDAvMDAyLzIz/NS8yMjM1LTE2ODA1/NDI0NTktMjIyNjlh/YmIzOWVhOTZhOTZj/NmUxNzEwYTczZWMz/MTI2YTVlNjA1Yi5q/cGc",
    }, 
    {
      chain:"Ethereum",
      stage:"Private Sale",
      location:'Philadelphia, PA',
      sortbyy:'Active',
      tge:'30',
      category:"Infrastructure",
      keywords:['Active','Infrastructure'],
      title: 'HueDx',
      investoramount:'105',
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'4,000,000 M',
      description:'Accelerating quantitative testing in Medical, R&D, Agro, & Industrial sectors',
      logo: "https://imgproxy.republic.com/OnVz-zrUszqnoPlxo6zx667odoYWFe3-QBCd4c14bzA/rs:fit:120:120/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9sb2dvcy9v/cmlnaW5hbC8wMDAv/MDAyLzI1Ny8yMjU3/LTE2NzgyMjYxNDUt/ZmQ4MDE0YWRkMGZk/YzcwZDYyZDgzNjBl/ZjM4MzlkMzM2NGZj/NjA0MS5wbmc",
      image: "https://imgproxy.republic.com/qhNWo1w_9_NBJsxCtyHRNmMS1ehZ-XxRobmvX6L89fU/rs:::/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9jYXJkX2lt/YWdlcy9vcmlnaW5h/bC8wMDAvMDAyLzI1/Ny8yMjU3LTE2Nzg0/MDkzODItOTNhZDk3/M2UxZWY5ODYzODBm/ZmU1YWMyOTFmZTNl/MDk3YWIyMjk4Zi5w/bmc",
    },
    {
      chain:"Ethereum",
      category:"DeFi",
      stage:"Private Sale",
      sortbyy:'Active',
      location:'Newark, DE',
      title: 'Lucky Carrot',
      tge:'40',
      keywords:['Active','DeFi'],
      investoramount:'105',
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'40 M',
      description:'Where people connect to say thank you, appreciate hard work and achievements',
      logo: "https://imgproxy.republic.com/71aD4_frj-sBaSO2aECgXeerL0jySgvEzXn3s2FOIao/rs:fit:120:120/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9sb2dvcy9v/cmlnaW5hbC8wMDAv/MDAxLzgyMC8xODIw/LTE2NjAxNzA5Njkt/MDM5NjY3MGFhM2Fj/YTZjZDYyZDlmNzVk/Mzk1ZDgxYWM1OTkx/ZDE2YS5wbmc",
      image: "https://imgproxy.republic.com/CsbrjABl9WR1gEMspA7zFgMB30MZ-mh2vVpRMVclxl8/rs:::/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9jYXJkX2lt/YWdlcy9vcmlnaW5h/bC8wMDAvMDAxLzgy/MC8xODIwLTE2NjY5/ODIwOTctZDcwOGEw/ZmYyNmUxYWY4N2Iz/N2Y4NzQyMzRlN2U4/YzI2MzhmZDViZi5q/cGc",
    },
    {
      tge:'50',
      chain:"Solana",
      sortbyy:'Ended',
      stage:"Seed",
      category:"DeFi",
      location:'New York , NY',
      special:true,
      title: 'Nunbelievable',
      keywords:['Ended','DeFi'],
      investoramount:'105',
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'20 M',
      description:'The Ultimate Mission-Driven Cookie Company',
      logo: "https://imgproxy.republic.com/oy7V9FJv0DoEcRBdRy7e4tNADYiiHGHukZxu7LR3tBU/rs:fit:120:120/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9sb2dvcy9v/cmlnaW5hbC8wMDAv/MDAzLzE5OS8zMTk5/LTE2ODQ0MjMzMjgt/N2RjYzI2MGYyNjc1/ZTZjZTE5MzY3OGY4/YTM0NDM5ZjY5MTJl/ZDM0MS5wbmc",
      image:"https://imgproxy.republic.com/jpKQmU_JhzAVfqoEnoSWLMatPt7sE6QokILNkE1SO44/rs:::/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9jYXJkX2lt/YWdlcy9vcmlnaW5h/bC8wMDAvMDAzLzE5/OS8zMTk5LTE2ODk4/NTk3NTgtODFmMDY2/NDFlNzQ5NDg1MGEw/MTlmYjlhOTNhZGFj/NGM1OTM3Njg4YS5q/cGc",
    },
    {
      chain:"Polygon",
      category:"Metaverse",
      special:true,
      tge:'60',
      stage:"Private Sale",
      sortbyy:'Upcoming',
      location:'CliffSide Park , NJ',
      title: 'SmoothSail Sparkling Sake',
      keywords:['Upcoming','Metaverse'],
      investoramount:'105',
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'4,000 M',
      description:'Innovative canned sparkling sake from International Superstar Jay Sean',
      logo: "https://imgproxy.republic.com/bRBnx1Cb0EHhlBv7qCdRazghlOq9a8gJbCO9g7Gzaf8/rs:fit:120:120/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9sb2dvcy9v/cmlnaW5hbC8wMDAv/MDAyLzI2NS8yMjY1/LTE2ODAyMTM3NDUt/OTUyMzYyMjkyN2M4/YWEwNjU2Y2IzM2E1/ZWM0MTU1MzFlNWQ1/NDUwMy5wbmc",
      image:"https://imgproxy.republic.com/NlafnxoAykw8Uk6mq6UK5h05VPVQBJyLHbtxlw7ffZ8/rs:::/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9jYXJkX2lt/YWdlcy9vcmlnaW5h/bC8wMDAvMDAyLzI2/NS8yMjY1LTE2ODAy/MTM3NDYtMmI3MTM1/N2MzMWNlZWM4ZjE5/YjQ0ODRlZWNlZTdh/OWIyOTYwYmZlYS5q/cGc",
    },
    {
      chain:"Solana",
      category:"Gaming",
      sortbyy:'Upcoming',
      tge:'10',
      stage:"Private Sale",
      location:'San Francisco , CA',
      title: 'B.T.R. Nation',
      keywords:['Upcoming','Gaming'],
      investoramount:'105',
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'4,000,000 M',
      description:'On a mission to end mindless snacking with superfood + adaptogen-boosted snacks',
      logo: "https://imgproxy.republic.com/K_GLJeUdzmlkc9gMFYQ-VtbSIElsobaUGG-athtec2E/rs:fit:120:120/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9sb2dvcy9v/cmlnaW5hbC8wMDAv/MDAxLzQyNi8xNDI2/LTE2NDkxNjk3Njct/ZGQ2ZjRkZTgyMDNm/NjAzNDUyZWVjYTg4/ZTNkOWVjYjY4N2My/Njc3Yi5wbmc",
      image:"https://imgproxy.republic.com/Vvali0q67hcGNvEQofQOpHvTLkBNjaQQaGz6o9bKtbk/rs:::/aHR0cHM6Ly91cGxv/YWRzLnJlcHVibGlj/LmNvbS9wL29mZmVy/aW5ncy9jYXJkX2lt/YWdlcy9vcmlnaW5h/bC8wMDAvMDAxLzQy/Ni8xNDI2LTE2NzIw/MTA5NDktYTBiYjYx/MmQ5N2Y4NGJiMTc4/MGJhNTcxMzRlNjky/NDQyNjllYjdjOC5q/cGc",
    },
    {
      chain:"Polygon",
      category:"Gaming",
      sortbyy:'Upcoming',
      tge:'22',
      stage:"Private Sale",
      location:'San Francisco , CA',
      title: 'RentBerry',
      keywords:['Upcoming','Gaming'],
      investoramount:'105',
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'4,000,000 M',
      description:'On a mission to end mindless snacking with superfood + adaptogen-boosted snacks',
      logo: "https://uploads.republic.com/p/offerings/logos/medium_2x/000/002/249/2249-1685972764-c555a68f732d132746c5778812bc5ba28ebab31c.png",
      image:"https://uploads.republic.com/p/offerings/card_images/default_2x/000/002/249/2249-1685972765-890bfdd9feffae7c1bd13b2f4649328a21e7463d.png",
    },
    {
      chain:"Ethereum",
      category:"AI",
      sortbyy:'Upcoming',
      tge:'34',
      stage:"Seed",
      location:'San Francisco , CA',
      title: 'Azure Printed Homes',
      keywords:['Upcoming','AI'],
      investoramount:'105',
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'4,000,000 M',
      description:'On a mission to end mindless snacking with superfood + adaptogen-boosted snacks',
      logo: "https://uploads.republic.com/p/offerings/logos/medium_2x/000/002/216/2216-1675218155-0aa4a28e509e0c26e6f6b6afd55b2a609e679f71.png",
      image:"https://uploads.republic.com/p/offerings/card_images/default_2x/000/002/216/2216-1686849449-6785002e2bd0e90b47367d807d486e9b24a17828.JPG",
    },
    {
      chain:"Ethereum",
      category:"NFTs",
      sortbyy:'Upcoming',
      stage:"Seed",
      location:'San Francisco , CA',
      title: 'iRemedy Healthcare',
      keywords:['Upcoming','NFTs'],
      investoramount:'105',
      tge:'5',
      raisedmoney:'106,300',
      mininvestment:'150',
      valuationcap:'4,000,000 M',
      description:'On a mission to end mindless snacking with superfood + adaptogen-boosted snacks',
      logo: "https://uploads.republic.com/p/offerings/logos/medium_2x/000/001/974/1974-1666402725-faf67208505ad3ac597e3b731e373f49583bce4e.png",
      image:"https://uploads.republic.com/p/offerings/card_images/default_2x/000/001/974/1974-1679073706-886a623e50bb2944ef4ca036d2577a8cb6154daf.jpg",
    },

  ];
  const [searchedData, setSearchedData] = useState(AuctionData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategorychain, setSelectedCategorychain] = useState(null);
  const [selectedCategorystage, setSelectedCategorystage] = useState(null);

  const [selectedButton, setSelectedButton] = useState(null);
  const handleClick = (event) => {
    
    
    if(selectedCategory===null)
    {const buttonValue = event.target.value;
      
    if(selectedButton===buttonValue){
      setSelectedButton();
      const filteredData = AuctionData;
      setSearchedData(filteredData);  
    }
    else{
      setSelectedButton(buttonValue);
      const filteredData = AuctionData.filter((item) => item.category === buttonValue);
      setSearchedData(filteredData);  
    }
      
    
      
    }
    else
    {
      const buttonValue = event.target.value;
      if(selectedButton!=buttonValue){
        setSelectedButton(buttonValue);
        const filteredData = AuctionData.filter((item) => item.category === buttonValue && item.sortbyy === selectedCategory);
        setSearchedData(filteredData);  
      }
      else{
        setSelectedButton(null);
        const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory);
        setSearchedData(filteredData);  
      }

      
    }
    };
    
  
    const handleOptionSelected = (selectedCategory) => {
      // Filter the data based on the selected category
      console.log("selected is "+selectedCategory);
setSelectedCategory(selectedCategory);
      if(selectedButton===null)
      {
        const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory);
        setSearchedData(filteredData);
  
      }
      else
      {
        const filteredData = AuctionData.filter((item) => item.sortbyy === selectedCategory && item.category === selectedButton);
        setSearchedData(filteredData);
      }
    };


    const handleOptionSelectedchain = (selectedCategory) => {
      // Filter the data based on the selected category
      console.log("selected is "+selectedCategory);
setSelectedCategorychain(selectedCategory);
      if(selectedButton===null)
      {
        const filteredData = AuctionData.filter((item) => item.chain === selectedCategory);
        setSearchedData(filteredData);
  
      }
      else
      {
        const filteredData = AuctionData.filter((item) => item.chain === selectedCategory && item.category === selectedButton);
        setSearchedData(filteredData);
      }
    };

    
    const handleOptionSelectedstage = (selectedCategory) => {
      // Filter the data based on the selected category
      console.log("selected is "+selectedCategory);
setSelectedCategorystage(selectedCategory);
      if(selectedButton===null)
      {
        const filteredData = AuctionData.filter((item) => item.stage === selectedCategory);
        setSearchedData(filteredData);
  
      }
      else
      {
        const filteredData = AuctionData.filter((item) => item.stage === selectedCategory && item.category === selectedButton);
        setSearchedData(filteredData);
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
  
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Start Home */}
      {/*end section*/}
      
      

      {/*end section*/}
      {/* End Home */}

      {/* Start */}
<div className='revise'>
      <div className="new4 new12 container wrapisss">
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
</div>
  
          <section className=" new1234">
        
      

        {/* End Home */}
  
  
          <div className="container">
            <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
              {searchedData?.map((data, index) => {
                return (
                  <div className="col" key={index}>
                    <div className="card nft-items nft-primary nft-auction upperrounded shadow overflow-hidden biggerwidth hoveris h600px" onClick={e => {
                            e.preventDefault()
                            navigate(`/projectDetail/${data?.title}`)
                          }}>
                      
                      <div className=" rounded-md  position-relative moreheightis overflow-hidden ">
                        <div>
                          <img src={data.image} className="img-fluid objectfitt moreheightis hundredwidth" alt="" />
                        </div>
                        {data?.special && (
                          <div className="special">
                             <i class="fa-solid fa-star staroffeatured"></i> FEATURED
                            </div>
                        )
  
                        }
  
                        <div className="position-absolute topdowner trans leftttt">
  
                         <img className="widthheight borderisss" src={data.logo}  alt="" />
                         </div>
                        
                        
                      </div>
  
                      <div className="card-body content position-absolute p-3 moretopandbackcolor moreepaddingtop trans">
  
                      <Link to={`/projectDetail/${data?.title}`} className="cardtitleis">
        {data?.title}
      </Link>        
                      {/* <div    className="title text-dark h6"
                        >
                          {data?.description}
                        </div> */}
  
                        <div className="d-block align-items-center justify-content-between mt-3">
                          <div className="padtop h100px">
                            <p className="mb-0 d-block fw-semibold carddescription">
                              {data?.description}
                            </p>
                          </div>
                          <div className='bottomcard'>
                          <div className="padtop lcc">
                            <p className="mb-0 d-block fw-semibold cardlocation">
                              {data?.location}
                            </p>
                          </div>
                          
                          <div className="keywords">
    {data.keywords?.map((data2, index2) => (
      <div className="keyword" key={index2}>
        {data2}
      </div>
    ))}
  </div>
  <div className="lastline">
  CryptoHub Funding Portal · Reg CF
      </div>
      </div>
                        </div>
                      </div>
                      <div className="belower"> 
                      <div className="belowercontent"> 
                      <span className="prominent" style={{marginRight:'35px'}}><strong>Chain: </strong></span>           <div class='toggle1'>
  {data.chain}
        </div>
                      </div>
                      <div className="belowercontent"> 
                        <span className="prominent" style={{marginRight:'7px'}}><strong>Valuation:</strong></span> ${data.valuationcap}
                      </div>  
                      <div className="belowercontent" > 
   <span className="prominent" style={{marginRight:'35px'}}><strong>Stage:   </strong></span> <div class='toggle2'>{data.stage}      
        </div>
                      </div>
                      <div className="belowercontent"> 
                        <span className="prominent" style={{marginRight:'50px'}}><strong>TGE:</strong></span> {data.tge} Days Left
                      </div>  

                      </div>
                    </div>
                  </div>
                )
              })}
              {/*end col*/}
            </div>
            {/*end row*/}
  
            
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
        
  
      {/*end section*/}
      {/* End */}

      {/* CTA Start */}
      
      {/*end section*/}
      {/* CTA End */}
      {/* footer */}
      <Footer />

      {/* Style switcher  */}
      
    </>
  )
}

export default ExploreTwo
