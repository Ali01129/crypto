const Blog= require('../models/Blog');
const User= require('../models/User');
const nodemailer= require('nodemailer')
const path = require('path');
const fs= require('fs');
//dont use formdata in frontend for these type of routes where no file is attached in req from frontend

const getBlogs = async (req, res) => {
  try {
    // Fetch blogs where verified is true
    const blogs = await Blog.find({ verified: true }).sort({ createdAt: -1 });

    // Iterate through blogs and fetch user details manually
    const blogsWithUserDetails = await Promise.all(
      blogs.map(async (blog) => {
        const user = await User.findById(blog.userId).select('fullName image'); // Fetch user by userId
        return {
          ...blog._doc, // Spread the blog object
          user: user ? { fullName: user.fullName, image: user.image } : null, // Attach user details if found
        };
      })
    );
    console.log(blogsWithUserDetails);
    res.status(200).json(blogsWithUserDetails);
  } catch (error) {
    console.error("Error fetching blogs data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBlogRequests = async (req, res) => {
  try {
    // Fetch blogs where verified is false
    const blogs = await Blog.find({ verified: false }).sort({ createdAt: -1 });

    // Iterate through blogs and fetch user details manually
    const blogsWithUserDetails = await Promise.all(
      blogs.map(async (blog) => {
        const user = await User.findById(blog.userId).select('fullName image'); // Fetch user by userId
        return {
          ...blog._doc, // Spread the blog object
          user: user ? { fullName: user.fullName, image: user.image } : null, // Attach user details if found
        };
      })
    );
    console.log("sdjiv");
console.log(blogsWithUserDetails);
    res.status(200).json(blogsWithUserDetails);
  } catch (error) {
    console.error("Error fetching blogs data:", error);
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

const acceptBlog=async(req,res)=>{
  
  console.log("came in acceptBlog ");
    console.log("req:.......",req.body);
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Blog by id
      //remove it here
      if(req.body.user.category==='admin')
      {


        const existingBlog = await Blog.findById(id);
        console.log("existing is:",existingBlog);
        if(existingBlog)
        {
                    //here find user email by id present in object
                    const user = await User.findById(existingBlog.userId);
                    //Send mail to user to let creator know about the verification
                    const emailIs = user.email;
                    const subjectIs = `Verification Status of Your Uploaded Blog "${existingBlog.title}" From TheCryptoHub`;
                    const msgIs = `Hello ${user.fullName}.\n\nWe hope you are doing well. We are happy to inform you that Your Blog titled as ${existingBlog.title}, is accepted by Admin. Go and watch your uploaded Blog @ TheCryptoHub.\n\n\nRegards\nTCH Admin`;        
                          var transporter = nodemailer.createTransport({
                              port: 465,
                              host:"smtp.gmail.com",
                               auth: {
                          user: 'thecryptohub.com@gmail.com',//add here your mail
                          pass: 'jpurqadqvwjqmygm'//add here your gmail app pass
                          },
                              secure: true,
                              });
                              var mailOptions={
                                  from:'thecryptohub.com@gmail.com',
                                  to:emailIs,
                                  subject:subjectIs,
                                  text:msgIs
                              };
                              transporter.sendMail(mailOptions,function(error,info){
                                  if(error)
                                  {
                                     res.status(500).json({ success: false, message: "Sorry, Blog not Accepted! Verification Mail could not sent to Author." });
                                  }
                              });          
            existingBlog.verified=true;
            await existingBlog.save();
            res.status(200).json({ success: true, message: "Blog Accepted Successfully!"});
        }
        else
        {
            res.status(201).json({ success: false, message: "Blog not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry! Only Admin can Accept/Reject Blog."});
      }


  
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Blog Verification Failed!"});
      }
}
const rejectBlog=async(req,res)=>{
  
  console.log("came in RejectBlog with ");
    console.log("req:.......",req.body);
    // console.log("response:files ",req.files);  
    
  
  
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Blog by id
      //remove it here
      if(req.body.user.category==='admin')
      {
        const existingBlog = await Blog.findById(id);
        console.log("existing is:",existingBlog);
        if(existingBlog)
        {
          const filesToDelete = [
            existingBlog.coverImage
          ].filter(Boolean); // filter out any undefined values
    
          //here find user email by id present in object
          const user = await User.findById(existingBlog.userId);
          //Send mail to user to let creator know about the verification
          const emailIs = user.email;
          const subjectIs = `Verification Status of Your Uploaded Blog "${existingBlog.title}" From TheCryptoHub`;
          const msgIs = `Hello ${user.fullName}.\n\nWe hope you are doing well. We are really sorry to inform you that Your Blog titled as ${existingBlog.title}, is rejected by Admin. Try uploading a new one.\n\n\nRegards\nTCH Admin`;        
                var transporter = nodemailer.createTransport({
                    port: 465,
                    host:"smtp.gmail.com",
                     auth: {
                user: 'thecryptohub.com@gmail.com',//add here your mail
                pass: 'jpurqadqvwjqmygm'//add here your gmail app pass
                },
                    secure: true,
                    });
                    var mailOptions={
                        from:'thecryptohub.com@gmail.com',
                        to:emailIs,
                        subject:subjectIs,
                        text:msgIs
                    };
                    transporter.sendMail(mailOptions,function(error,info){
                        if(error)
                        {
                           res.status(500).json({ success: false, message: "Sorry, Blog Rejection Failed. Mail could not sent to Author of Blog." });
                        }
                    });
          deleteFiles(filesToDelete);
          await Blog.deleteOne({ _id: id });  
        res.status(200).json({ success: true, message: "Blog Rejected Successfully!"});  
        }
        else
        {
          res.status(201).json({ success: false, message: "Blog not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry! Only Admin can Accept/Reject Blog."});
      }  
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Blog Rejection Failed!"});
      }
}


const deleteBlog=async(req,res)=>{
  
  console.log("came in deleteBlog with ");
    console.log("req:.......",req.body);
    // console.log("response:files ",req.files);  
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Blog by id
      //remove it here
      if(req.body.user.category==='admin')
      {
        const existingBlog = await Blog.findById(id);
        console.log("existing is:",existingBlog);
        if(existingBlog)
        {
          const filesToDelete = [
            existingBlog.coverImage
          ].filter(Boolean); // filter out any undefined values
    
         deleteFiles(filesToDelete);
          
        await Blog.deleteOne({ _id: id });  
      res.status(200).json({ success: true, message: "Blog Deleted Successfully!"});
        }
        else
        {
          res.status(201).json({ success: false, message: "Blog not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry, Admin can Delete Blog Only."});
      }
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Blog Deletion Failed!"});
      }
}
const editBlog=async(req,res)=>{
  
      console.log("came in editBlog with ");
        console.log("req:.......",req.body);
        // console.log("response:files ",req.files);  
        try {
           
            const {
              title,
              type,
              shortDescription,
              description,
              ytVideo,
              readTime,
              references      // Add more attributes here as needed
            } = req.body;
        


            console.log("title is:", title);
        
            const already = await Blog.findOne({ title });
            if(req.body.user.category==='admin')
            {
              if(already != null)
              {
                already.type = type;
                already.title = title;
                already.description = description;
                already.shortDescription = shortDescription;
                already.readTime = readTime;
                already.ytVideo = ytVideo;
                already.references = references;
                await already.save();
              
                res.status(200).json({ success: true, message: "Blog Edited Successfully!"});
              
              }
        
            }
            else
            {
              res.status(201).json({ success: false, message: "Sorry, Admin can Edit Blog Only."});
            }
        
          } catch (error) {
            console.error(error);
            res.status(201).json({ success: false, message: "Blog Edit Failed!"});
          }
}

const addBlog = async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Uploaded files: ", req.files);
  
  try {
    const {
      title,
      shortDescription,
      description,
      type,
      ytVideo,
      readTime,
    } = req.body;

    console.log("Blog title is: ", title);

    // Check if a blog with the same title already exists
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(201).json({ success: false, message: "Blog with the same title already exists." });
    }

    // Clean values (if necessary)
    const cleanReadTime = readTime === null ? "0 min" : readTime;

    // Create a new Blog object
    const newBlog = new Blog({
      title,
      shortDescription,
      description,
      ytVideo,
      type,
      readTime: cleanReadTime,
      userId: req.body.user.userId,
    });

    // Set verification status based on user category
    if (req.body.user.category === 'admin') {
      newBlog.verified = true;
    } else {
      newBlog.verified = false;
    }

    // Handle coverImage upload
  
    const coverImage = req.files[0];
    if (coverImage) {
      const filePath = await storeFile(coverImage, newBlog._id + "_cover");
      newBlog.coverImage = filePath;
    }

    // Handle references array
    const references = JSON.parse(req.body.references || '[]');
    newBlog.references = references;
    await newBlog.save();

    // Respond based on user category
    if (req.body.user.category === 'admin') {
      res.status(200).json({ success: true, message: "Blog added successfully." });
    } else {
      res.status(200).json({ success: true, message: "Blog request sent to admin for verification. You will receive Verification status on mail. Stay tuned!" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred! Blog upload failed." });
  }
}
const getBlogUsingTitle = async (req, res) => {
    try {
      console.log("aya isme b");
      const title = req.query.title;
      // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
      console.log("title: ",title);
      const blogs = await Blog.findOne( {title }); // You may apply filters or sorting as needed
  console.log("blog is ......",blogs);
      res.status(200).json(blogs);
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

module.exports={storeFile,getBlogs,getBlogRequests,acceptBlog, rejectBlog,deleteBlog,editBlog,addBlog,getBlogUsingTitle}