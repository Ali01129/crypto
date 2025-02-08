const mongoose= require('mongoose');

const podcastSchema = new mongoose.Schema({
    userId: {type: String },
    title: { type: String},
    link: {
      type: String,
      required: true,
    },
    thumbnail:{type: String},
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
  });
  
  module.exports= mongoose.model('Podcast',podcastSchema);
  