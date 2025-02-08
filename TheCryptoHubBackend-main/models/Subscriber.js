const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SubscriberSchema = new mongoose.Schema({
    email: {
      type: String,
    }  
});

  
module.exports = mongoose.model('Subscriber', SubscriberSchema)
  