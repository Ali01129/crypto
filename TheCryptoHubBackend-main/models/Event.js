const mongoose= require('mongoose');

const eventSchema = new mongoose.Schema({
  verified:{type: Boolean },
  userId: {type: String },
  title: {type: String },
  description: {type: String },
  shortDescription: {type: String },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  websiteLink: {
    type: String,
    default: null,
  },
  instagramLink: {
    type: String,
    default: null,
  },
  twitterLink: {
    type: String,
    default: null,
  },
  linkedinLink: {
    type: String,
    default: null,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String, // Assuming you store the image URL/path as a string in your database
    required: true,
  },
  hashtags: [
    {
      type: String,
    }
  ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    
  });
  
  module.exports= mongoose.model('Event',eventSchema);
  