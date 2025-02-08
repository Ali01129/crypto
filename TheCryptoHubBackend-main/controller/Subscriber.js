const Subscriber= require('../models/Subscriber')
const nodemailer= require('nodemailer')
const bcrypt = require('bcryptjs');

//dont use formdata in frontend for these type of routes where no file is attached in req from frontend
const register= async(req,res)=>{
  try {
    // Handle user registration here
    console.log("came again");
    
    const { email } = req.body;

    // Check if the email already exists in the Subscriber table
    const existingUser = await Subscriber.findOne({ email });

    if (!existingUser) {
        // Create a new subscriber document
        const newSubscriber = new Subscriber({
            email: email
        });

        // Save the new subscriber to the Subscriber table
        await newSubscriber.save();

        const emailIs = newSubscriber.email;
        const subjectIs = "New Subscriber Alert of TheCryptoHub.com";
       

        const msgIs = `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333366; text-align: center; margin-bottom: 20px;">Hello TheCryptoHub Community,</h2>
            
            
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);">
                <p style="font-size: 18px; color: #333366; margin-bottom: 10px;">💌 <strong>New Subscriber's Email Address:</strong></p>
                <p style="font-size: 16px; color: #666666; margin-bottom: 0;">${emailIs}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #666666; margin-top: 20px;">
                Send Updates & News Regularly to increase engagement and Alert Users about your Updates.
            </p>

            
            <p style="font-size: 16px; line-height: 1.6; color: #666666; margin-top: 20px;">
                Stay tuned for more user updates and insights at <a href="https://TheCryptoHub.com" target="_blank" style="color: #333366; text-decoration: none; font-weight: bold;">ThrCryptoHub.com</a>.
            </p>
            
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
                    user: process.env.GMAIL_SENDER,
                    pass: process.env.GMAIL_PASS
              },
                  secure: true,
                  });
                  var mailOptions={
                      from:process.env.GMAIL_SENDER,
                      to:"thecryptohub.com@gmail.com",
                      //to:"jawadhaider682@gmail.com",
                      subject:subjectIs,
                      html:msgIs
                  };
                  transporter.sendMail(mailOptions,function(error,info){
                      if(error)
                      {
                          console.log(error);
                      }
                      else
                      {
                          console.log("Code Sent to your Entered Email, Authorize Yourself!");
                      }
                  });
        


        res.status(201).json({ success: true, message: "Subscribed Successfully!", data: newSubscriber });
    } else {
      console.log("Already Subscribed!")
        res.status(200).json({ success: false, message: "You Have Already Subscribed!" });
    }

} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Subscription Failed" });
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
const getSubscribers = async (req, res) => {
  try {
    console.log("aya isme");
    // Fetch Subscriber data from your database (Assuming you have an Subscriber model)
    const subscribers = await Subscriber.find(); // You may apply filters or sorting as needed
console.log(subscribers);
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error fetching Subscribers data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
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
                  console.log(error);
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

module.exports={getSubscribers,register,verifyEmail,getCode}