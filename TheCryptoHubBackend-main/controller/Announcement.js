const Announcement= require('../models/Announcement');
const User= require('../models/User');
const nodemailer= require('nodemailer')
const path = require('path');
const fs= require('fs');
//dont use formdata in frontend for these type of routes where no file is attached in req from frontend

const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne(); // Get the latest announcement
    if (!announcement) {
      return res.status(200).json({ message: "No Announcement Uploaded Yet!" });
    }
    res.status(200).json({ banner: announcement.banner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Announcement" });
  }
};


const addAnnouncement = async (req, res) => {
  console.log("Request body: ", req.body);
  
  try {
    const { banner } = req.body;

    // Find the first announcement (if it exists)
    const existingAnnouncement = await Announcement.findOne({});

    if (existingAnnouncement) {
      // Update the existing announcement
      existingAnnouncement.banner = banner;
      await existingAnnouncement.save();
      return res.status(200).json({ success: true, message: "Announcement updated successfully." });
    } else {
      // Create a new announcement if none exists
      const newAnnouncement = new Announcement({
        banner
      });
      await newAnnouncement.save();
      return res.status(200).json({ success: true, message: "Announcement added successfully." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "An error occurred! Announcement failed." });
  }
};
module.exports={addAnnouncement,getAnnouncement}