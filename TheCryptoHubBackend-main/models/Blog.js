const mongoose= require('mongoose');

const blogSchema = new mongoose.Schema({
  verified:{type: Boolean },
    userId: {type: String },
    title: { type: String},
    type: { type: String},
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    ytVideo: {
      type: String, // Storing YouTube URL
      default: null
    },
    readTime: {
      type: String,
      required: true
    },
    coverImage: {
      type: String, // Store the filename or path of the uploaded cover image
      required: true
    },
    references: [
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
  
  module.exports= mongoose.model('Blog',blogSchema);
  