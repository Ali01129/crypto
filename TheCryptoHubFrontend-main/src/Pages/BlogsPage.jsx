import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import HeaderComponent from "../Components/HeaderComponent/HeaderComponent";
import HomeTopBar from "../Components/HomeTopBar/HomeTopBar";
import Blogs from "../Components/Blogs/Blogs";
import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react'
const BlogsPage = () => {


  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      
      <Header />
      <Blogs />
      <Footer />
    </>
  );
};

export default BlogsPage;
