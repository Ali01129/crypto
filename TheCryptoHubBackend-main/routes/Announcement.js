const express=require('express');
const router=express.Router();
const authenticateUser = require('../middleware/authentication');
const {addAnnouncement,getAnnouncement}= require('../controller/Announcement');

router.post('/AddAnnouncement',authenticateUser,addAnnouncement);
router.get('/getAnnouncement',getAnnouncement);
module.exports=router;