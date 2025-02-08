import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import HeaderComponent from "../Components/HeaderComponent/HeaderComponent";
import HomeTopBar from "../Components/HomeTopBar/HomeTopBar";
import ProjectDetail from "../Components/projectDetail/index";
import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
const ProjectDetailPage = () => {
  

  const { projectId } = useParams();
  useEffect(() => {
    console.log("aya");
    console.log("projectId is...:",projectId);
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);
    
    
  return (
    <>
      <Header />
      <ProjectDetail title={projectId}/>
      <Footer />
    </>
  );
};

export default ProjectDetailPage;
