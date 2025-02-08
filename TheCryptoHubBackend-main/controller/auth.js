const User= require('../models/User')
const nodemailer= require('nodemailer')
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Import the crypto module
const path = require('path');
const fs= require('fs');
require('dotenv').config();
//dont use formData in frontend when there is no any media attached with req in frontend


const registerSpecial= async(req,res)=>{
  try {
    console.log("came aya");
    const {
      fullName,
      title,
      twitter,
      linkedIn,
      email,
      password,
      location,
      phone,
      category,
    } = req.body;


    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("aya hai");
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if(isMatch)
      {
        console.log("aya hai again");

        if (existingUser.verifieduser!=true) {
          console.log("yha tw agya hai");
                 
                  existingUser.phone=phone;
                  existingUser.category=category;
                 
                  
                  const generatedCode = Math.floor(1000 + Math.random() * 9000);

                  // Update the existing user's code with the generated code
                  
                  
                  existingUser.code = generatedCode.toString();
                  // Update the existing user's code with the generated code
  existingUser.fullName=fullName;
  existingUser.title=title;
  existingUser.twitter=twitter;
  existingUser.linkedIn=linkedIn;
  existingUser.location=location;
  existingUser.password= password;
  // Save the changes to the existing user
  if (existingUser.image) {
    const imagePath = path.join(__dirname, '../uploads', existingUser.image);              
    // Check if the file exists before attempting to delete it
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  const image = req.files[0];
  if (image) {
    const filePath = await storeFile(image, existingUser._id);
    console.log("filePath user: ", filePath);
    existingUser.image = filePath;
    
  }
  await existingUser.save();
                  
                  // Handle the case where the email is already in use
                  const nameIs = existingUser.fullName;
                  const emailIs = existingUser.email;
                  const subjectIs = "Verification Code From TheCryptoHub";
                  const msgIs = `Your Code is: ${generatedCode}`;


                
                
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
                            console.log(error);
                        }
                        else
                        {
                            console.log("Email sent to your entered email bro_"+nameIs);
                        }
                    });
                  return res.status(200).json({ success: true, message: "Code Sent to your mail." });
                }
                else
                {
                  if (existingUser.verifieduser===true&&existingUser.verified===false) {
                    // Update the existing user's code with the generated code
  
                    existingUser.category=category;
                    existingUser.phone=phone;
                    existingUser.fullName=fullName;
                    existingUser.title=title;
                    existingUser.twitter=twitter;
                    existingUser.linkedIn=linkedIn;
                    existingUser.location=location;
                  
                    existingUser.password= password;
                    // Save the changes to the existing user
                    if (existingUser.image) {
                      const imagePath = path.join(__dirname, '../uploads', existingUser.image);              
                      // Check if the file exists before attempting to delete it
                      if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                      }
                    }
                    const image = req.files[0];
                    if (image) {
                      const filePath = await storeFile(image, existingUser._id);
                      console.log("filePath user: ", filePath);
                      existingUser.image = filePath;
                      
                    }
                  
                    existingUser.save();
                    console.log("yha?")
                    return res.status(200).json({ success: true, message: "Your Request Sent to Admin.You will be notified by mail when approved!"});
                }
                else
                {
                  if (existingUser.verifieduser===true&&existingUser.verified===true&&existingUser.category!=category) {
                    existingUser.category=category;
                    existingUser.verified=false;
                    existingUser.phone=phone;
                    existingUser.fullName=fullName;
                    existingUser.title=title;
                    existingUser.twitter=twitter;
                    existingUser.linkedIn=linkedIn;
                    existingUser.location=location;
                  
                    existingUser.password= password;
                    // Save the changes to the existing user
                    if (existingUser.image) {
                      const imagePath = path.join(__dirname, '../uploads', existingUser.image);              
                      // Check if the file exists before attempting to delete it
                      if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                      }
                    }
                    const image = req.files[0];
                    if (image) {
                      const filePath = await storeFile(image, existingUser._id);
                      console.log("filePath user: ", filePath);
                      existingUser.image = filePath;
                      
                    }
                    existingUser.save();
                    console.log("aya hai b?");
                    return res.status(200).json({ success: true, message: "Your Request Sent to Admin.You will be notified by mail when approved!" });

                  }
                  else
                  {
                    console.log("ohoo");

                    let formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
                    return res.status(201).json({ success: false, message: formattedCategory + " already exists" });                  }

                }

    
      }




    }

  console.log("phas gya");
  return res.status(201).json({ success: false, message: "Existing Account, Wrong Password!" });
  }
    else
    {
      console.log("idr hi rha ha");

// Create a new user 
const newUser = new User({
  fullName,
  title,
  twitter,
  linkedIn,
  email,
  password,
  location,
  phone,
  category,
  verified:false,
code:"5544",
verifieduser:false,
});

const image = req.files[0];
if (image) {
  const filePath = await storeFile(image, newUser._id);
  console.log("filePath user: ", filePath);
  newUser.image = filePath;
  
}

const generatedCode = Math.floor(1000 + Math.random() * 9000);

// Update the existing user's code with the generated code
newUser.code = generatedCode.toString();

// Save the changes to the existing user
await newUser.save();

const nameIs=newUser.fullName;
const emailIs=newUser.email;
const subjectIs="Verification Code From TheCryptoHub";
const msgIs = `Your Code is: ${generatedCode}`;



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
            console.log(error);
            res.status(500).json({ success: false, message: "Mail Not Sent!" });
        }
        else
        {
            console.log("Email sent to your entered email bro_"+nameIs);
        }
    });
    


  res.status(200).json({ success: true, message: "Code Sent to your mail."});

    }

    
 
  } catch (error) {
    console.error(error);
    console.log("hwwwwww");
    res.status(500).json({ success: false, message: "Registration failed" });
  }

}
const register= async(req,res)=>{
    try {
      // Handle user registration here
     console.log("came again");
        const { fullName, title, twitter, linkedIn, email, password, location } = req.body;
      //i have used pre in model of auth/user to call function of pre just before making user object
  //middle wear is used to call before dealing any api request , it is middle thing which is done before running api,it is used for security purposes and error handling

        //  const image = req.files[0];
        // Check if the user with the same email already exists
        const existingUser = await User.findOne({ email });
    
        if (existingUser && existingUser.verifieduser!=true) {
  console.log("yha tw agya hai");
  const generatedCode = Math.floor(1000 + Math.random() * 9000);

  // Update the existing user's code with the generated code
  existingUser.fullName=fullName;
  existingUser.title=title;
  existingUser.twitter=twitter;
  existingUser.linkedIn=linkedIn;
  existingUser.location=location;
  existingUser.code = generatedCode.toString();
  existingUser.password= password;
  // Save the changes to the existing user
  if (existingUser.image) {
    const imagePath = path.join(__dirname, '../uploads', existingUser.image);              
    // Check if the file exists before attempting to delete it
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  const image = req.files[0];
  if (image) {
    const filePath = await storeFile(image, existingUser._id);
    console.log("filePath user: ", filePath);
    existingUser.image = filePath;
    
  }

  await existingUser.save();
  

  // Handle the case where the email is already in use
  const nameIs = existingUser.fullName;
  const emailIs = existingUser.email;
  const subjectIs = "Verification Code From TheCryptoHub";
  const msgIs = `Your Code is: ${generatedCode}`;        
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
            res.status(500).json({ success: false, message: "Mail Not Sent!" });
                }
                else
                {
                    console.log("Email sent to your entered email bro_"+nameIs);
                }
            });
          return res.status(200).json({ success: true, message: "Again, Code sent to your mail." });
        }
        else
        {
          if (existingUser && existingUser.verifieduser==true) {
               return res.status(400).json({ success: false, message: "User Already Exists." });
          }
          else
          {
            console.log("here");
            const newUser = new User({
              fullName,
              title,
              twitter,
              linkedIn,
              email,
              phone:"",
              password,
              location,
              category:"user",
              verified:false,
              code:"5544",
            });


            const image = req.files[0];
            if (image) {
              const filePath = await storeFile(image, newUser._id);
              console.log("filePath user: ", filePath);
              newUser.image = filePath;
              
            }

            await newUser.save();
            const generatedCode = Math.floor(1000 + Math.random() * 9000);

            // Update the existing user's code with the generated code
            newUser.code = generatedCode.toString();
            
            // Save the changes to the existing user
            await newUser.save();
            
            

            const nameIs=newUser.fullName;
            const emailIs=newUser.email;
            const subjectIs="Verification Code From TheCryptoHub";
            const msgIs = `Your Code is: ${generatedCode}`;
            
            
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
                        res.status(500).json({ success: false, message: "Mail Not Sent!" });
                    }
                    else
                    {
                        console.log("Email sent to your entered email bro_"+nameIs);
                    }
                });    
      
            res.status(200).json({ success: true, message: "Code Sent to your mail."});
          }
    
        }
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Registration failed" });
      }
}  
const getCode= async(req,res)=>{
  try {
    // Handle user registration here
   console.log("came again");
      const {email } = req.body;
      // Check if the user with the same email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser && existingUser.verifieduser==true) {
console.log("yha tw agya hai");
const generatedCode = Math.floor(1000 + Math.random() * 9000);

// Update the existing user's code with the generated code
existingUser.code = generatedCode.toString();

// Save the changes to the existing user
await existingUser.save();

// Handle the case where the email is already in use
const emailIs = existingUser.email;
const subjectIs = "Verification Code From TheCryptoHub";
const msgIs = `Your Code is: ${generatedCode}`;        
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
                 res.status(500).json({ success: false, message: "Mail Not Sent!" });
              }
              else
              {
                  console.log("Code Sent to your Entered Email, Authorize Yourself!");
              }
          });
         const token=existingUser.createJWT();
        return res.status(200).json({ success: true, message: "Code Sent to your Email, Authorize Yourself!",token:token });
      }
      else
      {
        if (!existingUser || existingUser.verifieduser==false) {
          console.log("came here");
          // Handle the case where the email is already in use
          return res.status(400).json({ success: false, message: "User Not Exists." });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occured!" });
    }

}
const forgotPassword = async (req, res) => {
  console.log("forgot password");
  const BASE_URL = process.env.BASE_URL;
  const { email } = req.body;
  const baseUrl = `${BASE_URL}/user/reset/password`;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("came here");
      return res.status(201).json({ message: 'User not found' });
    }

    console.log("in1");
    const token = crypto.randomBytes(20).toString('hex');
    console.log("in3");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    console.log("here");
    await user.save();
    console.log(user);

    const resetLink = `${baseUrl}/?token=${token}`;  // Reset password link with token as query parameter
    const emailIs = user.email;
    const subjectIs = "Reset Password Link From TheCryptoHub";

    const msgIs = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
        }
        .header {
          background: linear-gradient(45deg, #248a8c, #9ea5a1);
          color: #ffffff;
          padding: 15px;
          text-align: center;
          border-radius: 8px 8px 0 0;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 20px;
          color: #333333;
          font-size: 16px;
        }
        .footer {
          color: white !important;
          font-size: 17px;
          background: linear-gradient(45deg, #248a8c, #9ea5a1);
          padding: 15px;
          text-align: center;
          border-radius: 0 0 8px 8px;
          font-weight: bold;
        }
        .button {
          color: #ffffff;
          background: linear-gradient(45deg, #248a8c, #9ea5a1);

          padding: 12px 24px;
          text-align: center;
          display: inline-block;
          border-radius: 5px;
          text-decoration: none;
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          Reset Password Link From TheCryptoHub
        </div>
        <div class="content">
          <p>Hi,</p>
          <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click on the following link, or paste this into your browser to complete the process:</p>
          <a href="${resetLink}" class="button">${resetLink}</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
        <div class="footer">
          Thanks!
        </div>
      </div>
    </body>
    </html>
  `;

    var transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: 'thecryptohub.com@gmail.com',
        pass: 'jpurqadqvwjqmygm'
      },
      secure: true,
    });

    var mailOptions = {
      from: 'thecryptohub.com@gmail.com',
      to: emailIs,
      subject: subjectIs,
      html: msgIs // Use html instead of text to send HTML formatted email
    };

    console.log("last");
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log("Link Sent to your Entered Email, Authorize and Reset !");
        res.status(200).json({ message: 'Email sent' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const resetPassword= async(req,res)=>{
  const { token, password } = req.body;
  try {

    console.log("token:",token);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: 'Password Reset successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const verifyEmail=async(req,res)=>{
    try {
      console.log(req.body);
      const { email, code } = req.body;
  
  
      // Find the user by email
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        console.log("nhi mila");
        return res.status(400).json({ success: false, message: "Invalid email" });
      }
  
      // Check if the verification code matches
      if (existingUser.code !== code) {
        console.log("wrong code");
        return res.status(400).json({ success: false, message: "Invalid verification code" });
      }
  
      // Update the user's verified status
      existingUser.verifieduser = true;

      console.log("ok");
  
      await existingUser.save();
  if(existingUser.category==="user"||existingUser.category===null)
{
  res.status(200).json({ success: true, message: "Email successfully verified!",User:{
    fullName: existingUser.fullName,
    email: existingUser.email,
  },});

}
else
{
  res.status(200).json({ success: true, message: "Email successfully verified & Your request for "+existingUser.category+" is sent to Admin.Keep Checking your mail.",User:{
    fullName: existingUser.fullName,
    email: existingUser.email,
  },});
}



    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Email verification failed" });
    }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email:"+email);
    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    console.log("Salt Rounds Used for Comparison:", saltRounds);
    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {

      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    if (!existingUser.verifieduser) {
      return res.status(400).json({ success: false, message: "Email not verified" });
    }

    // At this point, authentication is successful

    // Generate a JWT token


    const token =await existingUser.createJWT(); //createJWT in User MODEL functions
    console.log("okay");
    res.status(200).json({
      success: true,
      category: existingUser.category,
      message: "Login Successful",
    token,
      User: {
        fullName: existingUser.fullName,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
}
const contact = async (req, res) => {
  try {

    console.log(req.body);

    const { email,name,message } = req.body;
    // Find the user by email
    console.log(email,name, message);
        
    const nameIs=name;
    const emailIs=email;
    const msgIs = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333366; text-align: center; margin-bottom: 20px;">Hello TheCryptoHub Community, we got new contact us message. </h2>
        
        
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; color: #333366; margin-bottom: 10px;">💌 <strong>User Email Address:</strong></p>
            <p style="font-size: 16px; color: #666666; margin-bottom: 0;">${emailIs}</p>
        </div>

                <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; color: #333366; margin-bottom: 10px;">💌 <strong>Name:</strong></p>
            <p style="font-size: 16px; color: #666666; margin-bottom: 0;">${nameIs}</p>
        </div>

                <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; color: #333366; margin-bottom: 10px;">💌 <strong>Message:</strong></p>
            <p style="font-size: 16px; color: #666666; margin-bottom: 0;">${message}</p>
        </div>



        <p style="font-size: 16px; line-height: 1.6; color: #666666; margin-top: 20px;">
            <strong>Best regards,<br>
            The TheCryptoHub Team</strong>
        </p>
    </div>
    `;
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
        to:'thecryptohub.com@gmail.com',
        subject:`TheCryptoHub |New Contact Us Message from ${name}`,
        html:msgIs
    };
    await transporter.sendMail(mailOptions); // Await the sending of the email
      res.status(200).json({
        success: true,
        message: "Message Sent Successfully.",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}
const verifySpecialUser = async (req, res) => {
  try {

    if(req.body.user.category==='admin'){

    const { id } = req.body;

    console.log("id:"+id);
    // Find the user by email
    const existingUser = await User.findOne({ _id:id });

    if (!existingUser) {
      return res.status(400).json({ success: false, message: "Verification Failed" });
    }

existingUser.verified=true;
existingUser.save();



      
const nameIs=existingUser.fullName;
const emailIs=existingUser.email;
const subjectIs="Approved for "+existingUser.category;
const msgIs="Congratulations! You are now our "+existingUser.category;


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
            res.status(500).json({ success: false, message: "Mail Not Sent!" });

        }
    });
    




    // Compare the entered password with the hashed password in the database
    
      console.log("okay");
      res.status(200).json({
        success: true,
        message: "Verification Successful",
      });


    // At this point, authentication is successful
    }else
    {
      res.status(201).json({ success: false, message: "Sorry, Admin can Verify Only!"});  
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email:"+email);
    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    if (!existingUser.verifieduser) {
      return res.status(400).json({ success: false, message: "Email not verified" });
    }
    if(existingUser.category==="admin")
    {
      console.log("admin category");
      const token =await existingUser.createJWT(); 
      console.log("okay");
      res.status(200).json({
        success: true,
        message: "Login Successful",
        category: existingUser.category,
      token,
        User: {
          fullName: existingUser.fullName,
          email: existingUser.email,
        },
      });
    }
    else
    {
      res.status(500).json({ success: false, message: "Login failed" });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
}
const getUsers = async (req, res) => {
  try {
    if(req.body.user.category==='admin'){
    console.log("aya isme");
    // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
    const users = await User.find(); // You may apply filters or sorting as needed
console.log(users);
    res.status(200).json(users);
  }else
  {
    res.status(201).json({ success: false, message: "Sorry, Admin Can Access Only!"});  
  }
} catch (error) {
    console.error("Error fetching Ambassadors data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAmbassadors = async (req, res) => {
    try {

      const users = await User.find(
        { category: "ambassador", verified: true },
        {
          image: 1,
          fullName: 1,
          title: 1,
          linkedIn: 1,
          twitter: 1,
          _id: 0
        }
      ); // Projection to select specific fields and exclude _id
  
      // Format the data as per your requirement
      const formattedUsers = users.map((user) => ({
        image: user.image,
        fullName: user.fullName,
        title: user.title,
        linkedIn: user.linkedIn,
        twitter: user.twitter,
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

module.exports={contact,getAmbassadors,getCode,resetPassword,forgotPassword,verifySpecialUser,getUsers,registerSpecial,register,verifyEmail,login,loginAdmin,storeFile}