const Podcast= require('../models/Podcast');
const User= require('../models/User');
const nodemailer= require('nodemailer')
const path = require('path');
const fs= require('fs');
//dont use formdata in frontend for these type of routes where no file is attached in req from frontend

const getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().sort({ createdAt: -1 });

    
    console.log(podcasts);
    res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error fetching Podcasts data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteFiles =  (filePaths) => {
  for (let filePath of filePaths) {
    deleteFileFromStorage(filePath);
  }
};
const deleteFileFromStorage =  (filePath) => {  
  if (filePath) {
    const imagePath = path.join(__dirname, '../uploads', filePath);              
    // Check if the file exists before attempting to delete it
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};

const deletePodcast=async(req,res)=>{
  
  console.log("came in deletePodcast with ");
    console.log("req:.......",req.body);
    // console.log("response:files ",req.files);  
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Blog by id
      //remove it here
      if(req.body.user.category==='admin')
      {
        const existingPodcast = await Podcast.findById(id);
        console.log("existing is:",existingPodcast);
        if(existingPodcast)
        {
          const filesToDelete = [
            existingPodcast.thumbnail
          ].filter(Boolean); // filter out any undefined values
         deleteFiles(filesToDelete);
        await Podcast.deleteOne({ _id: id });  
      res.status(200).json({ success: true, message: "Podcast Deleted Successfully!"});
        }
        else
        {
          res.status(201).json({ success: false, message: "Podcast not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry, Admin can Delete Podcast Only."});
      }
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Podcast Deletion Failed!"});
      }
}
const storeFile = async (file, id) => {
  console.log("file: ", file);
  const fs = require("fs");
  const path = require("path");
  const fileType = file.mimetype.split("/")[1];
  const filePath = path.join(__dirname, `../uploads`, `${id}.${fileType}`);
  console.log("filePath: ", filePath);
  fs.writeFileSync(filePath, file.buffer, function (err) {
    if (err) {
      console.log("error is", err);
    } else {
      console.log("file saved");
    }
  });
  return `${id}.${fileType}`;
};
const addPodcast = async (req, res) => {
  console.log("Request body: ", req.body);
  
  try {
    const {
      title,
      link    } = req.body;

    console.log("Podcast title is: ", title);

    const existingPodcast = await Podcast.findOne({ title });
    if (existingPodcast) {
      return res.status(201).json({ success: false, message: "Podcast with the same title already exists." });
    }


    // Create a new Blog object
    const newPodcast = new Podcast({
      title,
link,
      userId: req.body.user.userId,
    });
console.log("req files",req.files);
    const thumbnail = req.files[0];
    if (thumbnail) {
      const filePath = await storeFile(thumbnail, newPodcast._id + "_thumbnail");
      newPodcast.thumbnail = filePath;
    }

    await newPodcast.save();

    // Respond based on user category
    if (req.body.user.category === 'admin') {
      res.status(200).json({ success: true, message: "Podcast added successfully." });
    } 

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred!" });
  }
}

module.exports={deletePodcast,getPodcasts,addPodcast}