const Project= require('../models/Project');
const User= require('../models/User');
const nodemailer= require('nodemailer')
const path = require('path');
const fs= require('fs');
//dont use formdata in frontend for these type of routes where no file is attached in req from frontend

const getProjects = async (req, res) => {
  try {
    console.log("aya isme");
    // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
    const projects = await Project.find({ verified: true }); // You may apply filters or sorting as needed
console.log(projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getProjectRequests = async (req, res) => {
  try {
    console.log("aya isme");
    // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
    const projects = await Project.find({ verified: false }); // You may apply filters or sorting as needed
console.log(projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects data:", error);
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

const acceptProject=async(req,res)=>{
  
  console.log("came in acceptProject with ");
    console.log("req:.......",req.body);
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Project by id
      //remove it here
      if(req.body.user.category==='admin')
      {


        const existingProject = await Project.findById(id);
        console.log("existing is:",existingProject);
        if(existingProject)
        {
                    //here find user email by id present in object
                    const user = await User.findById(existingProject.userId);
                    //Send mail to user to let creator know about the verification
                    const emailIs = user.email;
                    const subjectIs = `Verification Status of Your Uploaded Project "${existingProject.title}" From TheCryptoHub`;
                    const msgIs = `Hello ${user.fullName}.\n\nWe hope you are doing well. We are happy to inform you that Your Project titled as ${existingProject.title}, is accepted by Admin. Go and watch your uploaded project @ TheCryptoHub.\n\n\nRegards\nTCH Admin`;        
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
                                     res.status(500).json({ success: false, message: "Sorry, Project not Accepted! Verification Mail could not sent to Author." });
                                  }
                              });          
            existingProject.verified=true;
            await existingProject.save();
            res.status(200).json({ success: true, message: "Project Accepted Successfully!"});
        }
        else
        {
            res.status(201).json({ success: false, message: "Project not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry! Only Admin can Accept/Reject Project."});
      }


  
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Project Verification Failed!"});
      }
}
const rejectProject=async(req,res)=>{
  
  console.log("came in RejectProject with ");
    console.log("req:.......",req.body);
    // console.log("response:files ",req.files);  
    
  
  
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Project by id
      //remove it here
      if(req.body.user.category==='admin')
      {
        const existingProject = await Project.findById(id);
        console.log("existing is:",existingProject);
        if(existingProject)
        {
          const filesToDelete = [
            existingProject.logo,
            existingProject.image,
            existingProject.highlightsImage,
            existingProject.uspImage,
            existingProject.utilityImage,
            existingProject.roadMapImage,
            existingProject.revenueStreamImage,
            existingProject.marketingStrategyImage,
            existingProject.tokenomicImage,
            existingProject.technologyImage,
            ...existingProject.pictures,
            ...existingProject.partners.map(partner => partner.profilePhoto),
            ...existingProject.teamMembers.map(teamMember => teamMember.profilePhoto),
            ...existingProject.docs.map(doc => doc.docFile)
          ].filter(Boolean); // filter out any undefined values
    
          //here find user email by id present in object
          const user = await User.findById(existingProject.userId);
          //Send mail to user to let creator know about the verification
          const emailIs = user.email;
          const subjectIs = `Verification Status of Your Uploaded Project "${existingProject.title}" From TheCryptoHub`;
          const msgIs = `Hello ${user.fullName}.\n\nWe hope you are doing well. We are really sorry to inform you that Your Project titled as ${existingProject.title}, is rejected by Admin. Try uploading a new one.\n\n\nRegards\nTCH Admin`;        
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
                           res.status(500).json({ success: false, message: "Sorry, Project Rejection Failed. Mail could not sent to Author of Project." });
                        }
                    });
          deleteFiles(filesToDelete);
          await Project.deleteOne({ _id: id });  
        res.status(200).json({ success: true, message: "Project Rejected Successfully!"});  
        }
        else
        {
          res.status(201).json({ success: false, message: "Project not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Sorry! Only Admin can Accept/Reject Project."});
      }  
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Project Rejection Failed!"});
      }
}


const deleteProject=async(req,res)=>{
  
  console.log("came in deleteProject with ");
    console.log("req:.......",req.body);
    // console.log("response:files ",req.files);  
    
  
  
    try {
      const { id } = req.body;

      console.log("id:"+id);
      // Find the Project by id
      //remove it here
      if(req.body.user.category==='admin')
      {


        const existingProject = await Project.findById(id);
        console.log("existing is:",existingProject);
        if(existingProject)
        {
          const filesToDelete = [
            existingProject.logo,
            existingProject.image,
            existingProject.highlightsImage,
            existingProject.uspImage,
            existingProject.utilityImage,
            existingProject.roadMapImage,
            existingProject.revenueStreamImage,
            existingProject.marketingStrategyImage,
            existingProject.tokenomicImage,
            existingProject.technologyImage,
            ...existingProject.pictures,
            ...existingProject.partners.map(partner => partner.profilePhoto),
            ...existingProject.teamMembers.map(teamMember => teamMember.profilePhoto),
            ...existingProject.docs.map(doc => doc.docFile)
          ].filter(Boolean); // filter out any undefined values
    
         deleteFiles(filesToDelete);
          
  
  
  
        await Project.deleteOne({ _id: id });  
      res.status(200).json({ success: true, message: "Project Deleted Successfully!"});
  
        }
        else
        {
          res.status(201).json({ success: false, message: "Project not found!"});
        }
      }
      else
      {
        res.status(201).json({ success: false, message: "Admin can Delete Project, Only!"});
      }


  
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Project Deletion Failed!"});
      }
}
const editProject=async(req,res)=>{
  
      console.log("came in editProject with ");
        console.log("req:.......",req.body);
        
        try {
           
            const {
              privatee,
              chain,
              funded,
              category,
              sortbyy,
              tge,
              special,
              stage,
              location,
              title,
              investorAmount,
              raisedMoney,
              minimumInvestment,
              valuationCap,
              description,
              logo,
              image,
              maximumInvestment,
              fundingGoal,
              tgeDate,
              allocation,
              youtubeLink,
              linkedinLink,
              twitterLink,
              discountedValuationCap,
              discount,
              deadline,
              securityType,
              nomineeLead,
              pictures,
              highlights,
              utility,
              usp,
              roadMap,
              revenueStream,
              technology,
              marketingStrategy,
              tokenomic,
              partners,
              docs,
              teamMembers,
              // Add more attributes here as needed
            } = req.body;
        


            console.log("title is:", title);
        
            const already = await Project.findOne({ title });
            if(req.body.user.category==='admin')
            {
              if(already != null)
              {
                already.chain = chain;
                already.privatee = privatee;
                already.category = category;
                already.sortbyy = sortbyy;
                already.funded = funded;
                already.tge = tge;
                already.special = special;
                already.stage = stage;
                already.location = location;
                already.title = title;
                already.investorAmount = investorAmount;
                already.raisedMoney = raisedMoney;
                already.minimumInvestment = minimumInvestment;
                already.valuationCap = valuationCap;
                already.description = description;
                already.logo = logo;
                already.image = image;
                already.maximumInvestment = maximumInvestment;
                already.fundingGoal = fundingGoal;
                already.tgeDate = tgeDate;
                already.allocation = allocation;
                already.youtubeLink = youtubeLink;
                already.linkedinLink = linkedinLink;
                already.twitterLink = twitterLink;
                already.discountedValuationCap = discountedValuationCap;
                already.discount = discount;
                already.deadline = deadline;
                already.securityType = securityType;
                already.nomineeLead = nomineeLead;
                already.pictures = pictures;
                already.highlights = highlights;
                already.utility = utility;
                already.usp = usp;
                already.roadMap = roadMap;
                already.revenueStream = revenueStream;
                already.technology = technology;
                already.marketingStrategy = marketingStrategy;
                already.tokenomic = tokenomic;
                already.partners = partners;
                already.docs = docs;
                already.teamMembers = teamMembers;
              
                await already.save();
              
                res.status(200).json({ success: true, message: "Project Edited Successfully!"});
              
              }
        
            }
            else
            {
              res.status(201).json({ success: false, message: "Admin can Edit,Only"});
            }
        
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Project Edit Failed!"});
          }
}
const addProject=async(req,res)=>{
  console.log("req:.......",req.body);
  console.log("response:files ",req.files);  
  try {
      const {
        privatee,
        chain,
        funded,
        category,
        sortbyy,
        tge,
        special,
        stage,
        location,
        title,
        investorAmount,
        raisedMoney,
        minimumInvestment,
        valuationCap,
        description,
        maximumInvestment,
        fundingGoal,
        tgeDate,
        allocation,
        twitterLink,
        youtubeLink,
        linkedinLink,
        discountedValuationCap,
        discount,
        deadline,
        nomineeLead,
        securityType,
        utility,
        highlights,
        revenueStream,
        usp,
        tokenomic,
        marketingStrategy,
        roadMap,
        technology,
      } = req.body;
   console.log("title is:",title);
      const already = await Project.findOne( {title });
      console.log("already is:",already);
  // Create a new Project object
  const cleanValuationCap = valuationCap === null ? 0 : valuationCap;
  const cleanDiscountedValuationCap = discountedValuationCap === 'null' ? 0 : discountedValuationCap;
  const cleanDiscount = discount === 'null' ? 0 : discount;
  const cleanInvestorAmount = investorAmount === null ? 0 : investorAmount;
  const cleanRaisedMoney = raisedMoney === null ? 0 : raisedMoney;




  const newProject = new Project({
    privatee,
    chain,
    category,
    sortbyy,
    tge,
    funded,
    special,
    stage,
    location,
    title,
    investorAmount: cleanInvestorAmount,
    raisedMoney: cleanRaisedMoney,    
    minimumInvestment,
    valuationCap:cleanValuationCap,
    description,
    maximumInvestment,
    fundingGoal,
    tgeDate,
    allocation,
    youtubeLink,
    linkedinLink,
    twitterLink,
    discountedValuationCap:cleanDiscountedValuationCap,
    discount:cleanDiscount,
    deadline,
    nomineeLead,
    securityType,
    utility,
    highlights,
    usp,
    revenueStream,
    roadMap,
    tokenomic,
    marketingStrategy,
    technology,
  });
    newProject.userId=req.body.user.userId;  
  if(req.body.user.category==='admin')
  {
    newProject.verified=true;
  }
  else
  {
    newProject.verified=false;
  }
  const logoFile = req.files[0];
  const imageFile =req.files[1];
  if (logoFile) {
    const filePath = await storeFile(logoFile, newProject._id+"1");
    console.log("filePath user: ", filePath);
    newProject.logo = filePath;
  }
  if(imageFile)
  {
    const filePath = await storeFile(imageFile, newProject._id+"2");
    console.log("filePath user: ", filePath);
    newProject.image = filePath;
    
  }

  const pictureFiles = req.files.filter((file) => file.fieldname.startsWith('pictures'));
  console.log("picturesss..........",pictureFiles);
  if(pictureFiles.length)
  {
    for (let i = 0; i < pictureFiles.length; i++) {
      if (pictureFiles[i]) {
          const pictureFilePath = await storeFile(pictureFiles[i], newProject._id + "pics" + i);
          newProject.pictures.push(pictureFilePath); 
      }
    }
  }
  

  const highlightsImage = req.files.filter((file) => file.fieldname.startsWith('highlightsImage'));
  console.log("highightsImage.........",highlightsImage);
  if(highlightsImage.length>0)
    {
      const filePath = await storeFile(highlightsImage[0], newProject._id+"highlight");
      console.log("filePath user: ", filePath);
      newProject.highlightsImage = filePath;
    }
    else
    {
      newProject.highlightsImage = null;
    }
    const uspImage = req.files.filter((file) => file.fieldname.startsWith('uspImage'));
    console.log("uspImage.........",uspImage);
    if(uspImage.length>0)
      {
        const filePath = await storeFile(uspImage[0], newProject._id+"usp");
        console.log("filePath user: ", filePath);
        newProject.uspImage = filePath;
      }
      else
      {
        newProject.uspImage = null;
      }
      const utilityImage = req.files.filter((file) => file.fieldname.startsWith('utilityImage'));
      console.log("utilityImage.........",utilityImage);
      if(utilityImage.length>0)
        {
          const filePath = await storeFile(utilityImage[0], newProject._id+"utility");
          console.log("filePath user: ", filePath);
          newProject.utilityImage = filePath;
        }
        else
        {
          newProject.utilityImage = null;
        }
    
        const roadMapImage = req.files.filter((file) => file.fieldname.startsWith('roadMapImage'));
        console.log("roadMapImage.........",roadMapImage);
        if(roadMapImage.length>0)
          {
            const filePath = await storeFile(roadMapImage[0], newProject._id+"roadMap");
            console.log("filePath user: ", filePath);
            newProject.roadMapImage = filePath;
          }
          else
          {
            newProject.roadMapImage = null;
          }
  
          const tokenomicImage = req.files.filter((file) => file.fieldname.startsWith('tokenomicImage'));
          console.log("tokenomicImage.........",tokenomicImage);
          if(tokenomicImage.length>0)
            {
              const filePath = await storeFile(tokenomicImage[0], newProject._id+"tokenomic");
              console.log("filePath user: ", filePath);
              newProject.tokenomicImage = filePath;
            }
            else
            {
              newProject.tokenomicImage = null;
            }
  
            const technologyImage = req.files.filter((file) => file.fieldname.startsWith('technologyImage'));
            console.log("technologyImage.........",technologyImage);
            if(technologyImage.length>0)
              {
                const filePath = await storeFile(technologyImage[0], newProject._id+"technology");
                console.log("filePath user: ", filePath);
                newProject.technologyImage = filePath;
              }
              else
              {
                newProject.technologyImage = null;
              }
  
              const revenueStreamImage = req.files.filter((file) => file.fieldname.startsWith('revenueStreamImage'));
              console.log("revenueStreamImage.........",revenueStreamImage);
              if(revenueStreamImage.length>0)
                {
                  const filePath = await storeFile(revenueStreamImage[0], newProject._id+"revenueStream");
                  console.log("filePath user: ", filePath);
                  newProject.revenueStreamImage = filePath;
                }
                else
                {
                  newProject.revenueStreamImage = null;
                }
  
                const marketingStrategyImage = req.files.filter((file) => file.fieldname.startsWith('marketingStrategyImage'));
                console.log("marketingStrategyImage.........",marketingStrategyImage);
                if(marketingStrategyImage.length>0)
                  {
                    const filePath = await storeFile(marketingStrategyImage[0], newProject._id+"marketingStrategy");
                    console.log("filePath user: ", filePath);
                    newProject.marketingStrategyImage = filePath;
                  }
                  else
                  {
                    newProject.marketingStrategyImage = null;
                  }

  const partnerData = JSON.parse(req.body.partners) || []; // Assuming partnerData contains partner information
  console.log(JSON.parse(req.body.partners));
  const partners = [];
  const partnerFiles = req.files.filter((file) => file.fieldname.startsWith('partnersProfilePhoto'));
  console.log("partnerssss.........",partnerFiles);

  if(partnerData.length)
  {
    for (let i = 0; i < partnerData.length; i++) {
      const partner = partnerData[i];
      const { name, title, description, linkedinLink } = partner;
      const partnerObj = {
        name,
        title,
        description,
        linkedinLink,
      };
      const partnerPicture = partnerFiles[i];
      if (partnerPicture) {
        const filePath = await storeFile(partnerPicture, newProject._id + `partner${i}`);
        partnerObj.profilePhoto = filePath;
      }
      partners.push(partnerObj);
    }  
  }
  newProject.partners = partners;
  




  const teamMemberData = JSON.parse(req.body.teamMembers) || []; // Assuming partnerData contains partner information
  console.log(JSON.parse(req.body.teamMembers));
  const teamMemberFiles = req.files.filter((file) => file.fieldname.startsWith('teamMembersProfilePhoto'));
  
  console.log("team Memberssss.........",teamMemberFiles);
  const teamMembers = [];
  if(teamMemberData.length)
  {
    for (let i = 0; i < teamMemberData.length; i++) {
      const teamMember = teamMemberData[i];
      const { name, title, description, linkedinLink } = teamMember;
      const teamMemberObj = {
        name,
        title,
        description,
        linkedinLink,
      };
      const teamMemberPicture = teamMemberFiles[i];
      if (teamMemberPicture) {
        const filePath = await storeFile(teamMemberPicture, newProject._id + `teamMember${i}`);
        teamMemberObj.profilePhoto = filePath;
      }
      teamMembers.push(teamMemberObj);
    }

  }
  newProject.teamMembers = teamMembers;

  const docFiles = req.files.filter((file) => file.fieldname.startsWith('docs'));
  console.log("docFilesssss.........",docFiles);
  const docs = [];
  if(docFiles.length)
  {
    for (let i = 0; i < docFiles.length; i++) {
      const doc = docFiles[i];
      console.log("doc is: ",doc);
      const docName = doc.originalname;
      const docObj = {
        docName,
      };
      const docFile = docFiles[i];
      if (docFile) {
        const filePath = await storeFile(docFile, newProject._id + `doc${i}`);
        docObj.docFile = filePath;
      }
      docs.push(docObj);
    }

  }
  newProject.docs = docs;
console.log("new project is...............:",newProject);

if(already != null)
{

  console.log("came .........============= here=================");
 res.status(201).json({ success: false, message: "Project Not Added! Same Titled Project Already Exists."}); 
}
else
{
  await newProject.save();
 
  if(req.body.user.category==='admin')
  {
    res.status(200).json({ success: true, message: "Project Added Successfully."});
  }
  else
  {
    res.status(200).json({ success: true, message: "Project Request Sent to Admin. You will receive verification status of Project from TheCryptoHub on Mail. Stay Tuned!"});
  }
}

} catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An Error Occured! Project Upload Failed."});
    }
}
const getProjectUsingTitle = async (req, res) => {
    try {
      console.log("aya isme b");
      const title = req.query.title;
      // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
      console.log("title: ",title);
      const projects = await Project.findOne( {title }); // You may apply filters or sorting as needed
  console.log("project is ......",projects);
      res.status(200).json(projects);
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

module.exports={storeFile,getProjects,getProjectRequests,acceptProject, rejectProject,deleteProject,editProject,addProject,getProjectUsingTitle}