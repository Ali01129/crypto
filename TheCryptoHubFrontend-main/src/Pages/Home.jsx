import React from "react";
import Ambassadors from "../Components/Ambassadors/Ambassadors";
import AutoSlider from "../Components/AutoSlider/AutoSlider";
import FAQ from "../Components/FAQ/FAQ";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import HeaderComponent from "../Components/HeaderComponent/HeaderComponent";
import HomeTopBar from "../Components/HomeTopBar/HomeTopBar";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import Platform from "../Components/Platform/Platform";
import Stakeholder from "../Components/Stakeholder/Stakeholder";
import HomeProjects from "../Components/HomeProjects/HomeProjects";
import VideoPart from "../Components/VideoPart/VideoPart";
import WhtISCryp from "../Components/WhtISCryp/WhtISCryp";
import WhyCrypto from "../Components/WhyCrypto/WhyCrypto";
import Podcasts from "../Components/Podcasts/Podcasts";
import HomeBlogs from "../Components/HomeBlogs/HomeBlogs";

const Home = () => {
  return (
    <>
      {/* <HomeTopBar /> */}
      <Header />
      <HeaderComponent />
      {/* <VideoPart /> */}
      <HomeProjects />


      

      {/* <Stakeholder/> */}
      {/* <WhtISCryp/> */}
      <Podcasts />
<HomeBlogs /> 
      {/* <Platform/> */}
      <NewsLetter />

      <Ambassadors />

      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
