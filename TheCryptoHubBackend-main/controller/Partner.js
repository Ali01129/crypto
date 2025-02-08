const Partner = require('../models/Partner');
const fs = require("fs");
const path = require("path");
//dont use formData in frontend when there is no any media attached with req in frontend


const AddPartner= async(req,res)=>{
  try {  

    if (req.body.user.category !== 'admin') {
      console.log("Category is not admin");
      return res.status(201).json({ success: false, message: 'Sorry, Admin can access only!' });
    }
              const {
                fullName,
              } = req.body;
              console.log("here");
              const newPartner = new Partner({
                fullName,
                
              });
              const image = req.files[0];
              if (image) {
                const filePath = await storeFile(image, newPartner._id);
                console.log("filePath user: ", filePath);
                newPartner.image = filePath;
              }  
              console.log("here2");

                  await newPartner.save();                  
                  res.status(200).json({ success: true, message: "Partner Added."});   
          
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Partner Not Added" });
    }
}
const deletePartner=async(req,res)=>{
  console.log("came in deletePartner with ");
    console.log("req:.......",req.body);
 
    try {
      if (req.body.user.category !== 'admin') {
        console.log("Category is not admin");
        return res.status(201).json({ success: false, message: 'Sorry, Admin can access only!' });
      }
  
      const { id } = req.body;
      console.log("id:"+id);

      const partner = await Partner.findOne({ _id:id });

      if (!partner) {
        return res.status(500).json({ success: false, message: "Partner not found!" });
      }
  // Remove the image file from the uploads folder
  if (partner.image) {
    const imagePath = path.join(__dirname, '../uploads', partner.image);
    
    // Check if the file exists before attempting to delete it
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

      await Partner.deleteOne({ _id:id });    
    res.status(200).json({ success: true, message: "Partner Deleted Successfully!"});
      
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Partner Deletion Failed!"});
      }
}
const editPartner=async(req,res)=>{
  
      console.log("came in editPartner with ");
        console.log("req:.......",req.body);
        try {
          if (req.body.user.category !== 'admin') {
            console.log("Category is not admin");
            return res.status(201).json({ success: false, message: 'Sorry, Admin can access only!' });
          }
      

            const {_id, image,fullName} =req.body;
        console.log("id:"+_id);
            const already = await Partner.findOne({ _id });
            
      if(already != null)
      {
        already.fullName = fullName;
        console.log("fullName,",already.fullName);
        const newPic = req.files[0];
        if (newPic) {
          //already.image = image;
          //here find previous image by image name and delete it
          if (already.image) {
      
            const prevImagePath = path.join(__dirname, '../uploads', already.image);
            
            if (fs.existsSync(prevImagePath)) {
              fs.unlinkSync(prevImagePath);
            }
          }
          
            const filePath = await storeFile(newPic, already._id);
            console.log("filePath user: ", filePath);
            already.image = filePath;
          }
        await already.save();
        res.status(200).json({ success: true, message: "Partner Edited Successfully!"});
      
      }
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Partner Edit Failed!"});
          }
}    
const getPartnersAdminPanel = async (req, res) => {
          try {
      
            const partners = await Partner.find(); // Projection to select specific fields and exclude _id
        
            console.log(partners);
            res.status(200).json(partners);
          }catch (error) {
            console.error("Error fetching partners data:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
};          
const getPartners = async (req, res) => {
          try {
      
            const users = await Partner.find(
              {},
              {
                image: 1,
                _id: 0
              }
            ); // Projection to select specific fields and exclude _id
        
            // Format the data as per your requirement
            const formattedUsers = users.map((user) => ({
              image: user.image,
                    }));
        
            console.log(formattedUsers);
            res.status(200).json(formattedUsers);
          }catch (error) {
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

module.exports={AddPartner,deletePartner,editPartner,getPartners,getPartnersAdminPanel,storeFile}