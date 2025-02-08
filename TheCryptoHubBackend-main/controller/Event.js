const Event= require('../models/Event');
const User= require('../models/User');
const nodemailer= require('nodemailer')
const path = require('path');
const fs= require('fs');
//dont use formdata in frontend for these type of routes where no file is attached in req from frontend

const getEvents = async (req, res) => {
  try {
    console.log("aya isme");
    // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
    const currentDate = new Date();

    // Fetch events that are verified and have not yet ended
    const events = await Event.find({
      verified: true,
      endDate: { $gte: currentDate }, // Ensure the event has not ended
    }).sort({ startDate: 1 }); // Sort by startDate in ascending order (recent events first)

console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const getPastEvents = async (req, res) => {
  try {
    console.log("aya isme");
    // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
    const currentDate = new Date();

    // Fetch events that are verified and have not yet ended
    const events = await Event.find({
      verified: true,
      endDate: {$lt: currentDate }, // Ensure the event has not ended
    }).sort({ startDate: 1 }); // Sort by startDate in ascending order (recent events first)

console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getEventRequests = async (req, res) => {
  try {
    console.log("aya isme");
    // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
    const currentDate = new Date();

    // Fetch events that are verified and have not yet ended
    const events = await Event.find({
      verified: false,
      endDate: { $gte: currentDate }, // Ensure the event has not ended
    }).sort({ startDate: 1 }); // Sort by startDate in ascending order (recent events first)
    
console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events data:", error);
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

const acceptEvent=async(req,res)=>{
  
  console.log("came in acceptEvent ");
    console.log("req:.......",req.body);
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Event by id
      //remove it here
      if(req.body.user.category==='admin')
      {


        const existingEvent = await Event.findById(id);
        console.log("existing is:",existingEvent);
        if(existingEvent)
        {
                    //here find user email by id present in object
                    const user = await User.findById(existingEvent.userId);
                    //Send mail to user to let creator know about the verification
                    const emailIs = user.email;
                    const subjectIs = `Verification Status of Your Uploaded Event "${existingEvent.title}" From TheCryptoHub`;
                    const msgIs = `Hello ${user.fullName}.\n\nWe hope you are doing well. We are happy to inform you that Your Event titled as ${existingEvent.title}, is accepted by Admin. Go and watch your uploaded Event @ TheCryptoHub.\n\n\nRegards\nTCH Admin`;        
                          var transporter = nodemailer.createTransport({
                              port: 465,
                              host:"smtp.gmail.com",
                               auth: {
                                user: process.env.GMAIL_SENDER,
                                pass: process.env.GMAIL_PASS
                          },
                              secure: true,
                              });
                              var mailOptions={
                                  from:process.env.GMAIL_SENDER,
                                  to:emailIs,
                                  subject:subjectIs,
                                  text:msgIs
                              };
                              transporter.sendMail(mailOptions,function(error,info){
                                  if(error)
                                  {
                                     res.status(500).json({ success: false, message: "Sorry, Event not Accepted! Verification Mail could not sent to Author." });
                                  }
                              });          
            existingEvent.verified=true;
            await existingEvent.save();
            res.status(200).json({ success: true, message: "Event Accepted Successfully!"});
        }
        else
        {
            res.status(201).json({ success: false, message: "Event not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry! Only Admin can Accept/Reject Event."});
      }


  
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Event Verification Failed!"});
      }
}
const rejectEvent=async(req,res)=>{
  
  console.log("came in RejectEvent with ");
    console.log("req:.......",req.body);
    // console.log("response:files ",req.files);  
    
  
  
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Event by id
      //remove it here
      if(req.body.user.category==='admin')
      {
        const existingEvent = await Event.findById(id);
        console.log("existing is:",existingEvent);
        if(existingEvent)
        {
          const filesToDelete = [
            existingEvent.coverImage
          ].filter(Boolean); // filter out any undefined values
    
          //here find user email by id present in object
          const user = await User.findById(existingEvent.userId);
          //Send mail to user to let creator know about the verification
          const emailIs = user.email;
          const subjectIs = `Verification Status of Your Uploaded Event "${existingEvent.title}" From TheCryptoHub`;
          const msgIs = `Hello ${user.fullName}.\n\nWe hope you are doing well. We are really sorry to inform you that Your Event titled as ${existingEvent.title}, is rejected by Admin. Try uploading a new one.\n\n\nRegards\nTCH Admin`;        
                var transporter = nodemailer.createTransport({
                    port: 465,
                    host:"smtp.gmail.com",
                     auth: {
                      user: process.env.GMAIL_SENDER,
                      pass: process.env.GMAIL_PASS
                },
                    secure: true,
                    });
                    var mailOptions={
                        from:process.env.GMAIL_SENDER,
                        to:emailIs,
                        subject:subjectIs,
                        text:msgIs
                    };
                    transporter.sendMail(mailOptions,function(error,info){
                        if(error)
                        {
                           res.status(500).json({ success: false, message: "Sorry, Event Rejection Failed. Mail could not sent to Author of Event." });
                        }
                    });
          deleteFiles(filesToDelete);
          await Event.deleteOne({ _id: id });  
        res.status(200).json({ success: true, message: "Event Rejected Successfully!"});  
        }
        else
        {
          res.status(201).json({ success: false, message: "Event not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry! Only Admin can Accept/Reject Event."});
      }  
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Event Rejection Failed!"});
      }
}


const deleteEvent=async(req,res)=>{
  
  console.log("came in deleteEvent with ");
    console.log("req:.......",req.body);
    // console.log("response:files ",req.files);  
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Event by id
      //remove it here
      if(req.body.user.category==='admin')
      {
        const existingEvent = await Event.findById(id);
        console.log("existing is:",existingEvent);
        if(existingEvent)
        {
          const filesToDelete = [
            existingEvent.coverImage
          ].filter(Boolean); // filter out any undefined values
    
         deleteFiles(filesToDelete);
          
        await Event.deleteOne({ _id: id });  
      res.status(200).json({ success: true, message: "Event Deleted Successfully!"});
        }
        else
        {
          res.status(201).json({ success: false, message: "Event not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry, Admin can Delete Event Only."});
      }
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Event Deletion Failed!"});
      }
}
const editEvent=async(req,res)=>{
  
      console.log("came in editEvent with ");
        console.log("req:.......",req.body);
        try {

            const {
              title,
              description,
              shortDescription,
              startDate,
              endDate,
              type,
              location,
              countryCode,
              websiteLink,
              instagramLink,
              twitterLink,
              linkedinLink,
              startTime,
              endTime,
              hashtags,
            } = req.body;
            console.log("title is:", title);
            const already = await Event.findOne({ title });
            if(req.body.user.category==='admin')
            {
              if(already != null)
              {
                already.title = title;
                already.shortDescription = shortDescription;
                already.description = description;
                already.startDate = startDate;
                already.endDate = endDate;
                already.startTime = startTime;
                already.endTime = endTime;
                already.location = location;
                already.type = type;
                already.linkedinLink =linkedinLink ;
                already.websiteLink = websiteLink;
                already.instagramLink = instagramLink;
                already.twitterLink =twitterLink ;
                already.countryCode =countryCode ;
                already.hashtags =hashtags ;
                await already.save();
              
                res.status(200).json({ success: true, message: "Event Edited Successfully!"});
              
              }
        
            }
            else
            {
              res.status(201).json({ success: false, message: "Sorry, Admin can Edit Event Only."});
            }
        
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Event Edit Failed!"});
          }
}

const addEvent = async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Uploaded files: ", req.files);
  
  try {
    const {
      title,
      description,
      startDate,
      shortDescription,
      endDate,
      type,
      location,
      countryCode,
      websiteLink,
      instagramLink,
      twitterLink,
      linkedinLink,
      startTime,
      endTime
    } = req.body;

    console.log("Event title is: ", title);

    // Check if a event with the same title already exists
    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res.status(201).json({ success: false, message: "Event with the same title already exists." });
    }

    // Create a new Event object
    const newEvent = new Event({
      title,
      description,
      shortDescription,
      startDate,
      endDate,
      type,
      location,
      countryCode,
      websiteLink,
      instagramLink,
      twitterLink,
      linkedinLink,
      startTime,
      endTime,      
      userId: req.body.user.userId,
    });

    // Set verification status based on user category
    if (req.body.user.category === 'admin') {
      newEvent.verified = true;
    } else {
      newEvent.verified = false;
    }

    // Handle coverImage upload
  
    const coverImage = req.files[0];
    if (coverImage) {
      const filePath = await storeFile(coverImage, newEvent._id + "_cover");
      newEvent.coverImage = filePath;
    }

    // Handle references array
    const hashtags = JSON.parse(req.body.hashtags || '[]');
    newEvent.hashtags = hashtags;

    await newEvent.save();
    // Respond based on user category
    if (req.body.user.category === 'admin') {
      res.status(200).json({ success: true, message: "Event added successfully." });
    } else {
      res.status(200).json({ success: true, message: "Event request sent to admin for verification. You will receive Verification status on mail. Stay tuned!" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred! Event upload failed." });
  }
}
const getEventUsingTitle = async (req, res) => {
    try {
      console.log("aya isme b");
      const title = req.query.title;
      // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
      console.log("title: ",title);
      const events = await Event.findOne( {title }); // You may apply filters or sorting as needed
  console.log("event is ......",events);
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching Ambassadors data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};
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

module.exports={storeFile,getEvents,getPastEvents,getEventRequests,acceptEvent, rejectEvent,deleteEvent,editEvent,addEvent,getEventUsingTitle}