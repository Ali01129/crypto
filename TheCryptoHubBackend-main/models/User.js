const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullName: {
      type: String,
    },
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    image: {
      type: String, // Store the filename of the uploaded photo
    },
      category: {
      type: String, // Store the filename of the uploaded photo
    },
    verified: {
    type:Boolean, // Store the filename of the uploaded photo
    },
    code:{
      type:String,
    }
    ,verifieduser:{
      type:Boolean,
    } 
    ,resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    }
});

//I have used pre in model of auth/user to call function of pre just before making user object
//Middlewear is used to call before dealing any api request , it is middle thing which is done before running api,it is used for security purposes and error handling

 UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
const hashedPassword = await bcrypt.hash(this.password,  parseInt(process.env.BCRYPT_SALT_ROUNDS));
this.password = hashedPassword;
 })


UserSchema.methods.createJWT = function () {
    console.log("id:"+this._id+" , name: "+this.fullName);
    return jwt.sign(
      { userId: this._id, name: this.fullName, category: this.category },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
}
  
module.exports = mongoose.model('User', UserSchema)
  