import React, { useState, useEffect } from "react";
import loading2 from '../../../../src/images/load.gif';
import { deleteUser } from "../../../redux/CustomerReducer";
import "./UserAdmin.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUsers } from "../../../redux/CustomerReducer";
import AdminHeader from "../AdminHeader/AdminHeader";
import SideBarAdmin from "../SideBar/SideBar";
import BlogRequests from "../BlogRequests/BlogRequests";

import axios from "axios";
import { SERVERURL } from "../../../ServerUrl";


const BlogRequestsAdmin = () => {

  const [rightHeader, setRightHeader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [driversData,setDriversData] = useState([]);
  const [completeData,setCompleteData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Define an async function to fetch Projects data
    const fetchBlogsData = async () => {
      try {

        console.log("hanji bhaiiiiiiiiiiiiiiii");
        // Make an Axios GET request to fetch Projects data from the server
        const response = await axios.get(`${SERVERURL}/api/v1/getBlogRequests`);
        // Assuming the response contains an array of projects
        const newData = response.data;

        // Update the state variable with the received data
        setDriversData(newData);
        setCompleteData(newData);
        // Set loading to false when data is received
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Projects data:", error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    // Call the fetchProjectsData function when the component mounts
    fetchBlogsData();
  }, []); // The empty dependency array ensures the effect runs once when the component mounts

  const filteredDriversData = driversData.filter((driver) =>
  driver.title && driver.title.toLowerCase().includes(searchValue.toLowerCase())
);
const handleSearch = () => {
  // Call this function when the search button is pressed
  // It will filter the data based on the searchValue and update the state
  if (searchValue === "") {
    // If the search value is empty, set the driversData state to the original data
    setDriversData(completeData);
  } else {
    // If the search value is not empty, filter the driversData based on the searchValue
    const filteredData = driversData.filter((driver) =>
      driver.title &&
      driver.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setDriversData(filteredData);
  }
};
  return (
    <>
      <AdminHeader rightHeader={rightHeader} />
      <div className="topSideVehicles">
        <SideBarAdmin
          setRightHeader={setRightHeader}
          rightHeader={rightHeader}
        />
        <div className="vehicleAdminMain">
          <div className="topTextEditAdmVehic">
            You Can View Accept & Reject Blog Requests 
          </div>
          <div className="topTextsVehiclAdmin">
            <div className="topInputBtnSearch">
              <input
                placeholder="Search Here"
                className="inputSearchVehic"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btnSearchVehicle" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          {/* Display loading GIF when loading state is true */}
          {loading && (
            <div className="loading">
              <img className="gif" src={loading2} alt="Loading..." />
            </div>
          )}

          {/* Display projects table when loading state is false */}
          {!loading && (
            <div className="topTableAdminVehicles">
              <BlogRequests driverData={driversData} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogRequestsAdmin;
