const mongoose= require('mongoose');

const announcementSchema = new mongoose.Schema({
    banner: { type: String},
    
  });
  
  module.exports= mongoose.model('Announcement',announcementSchema);
  