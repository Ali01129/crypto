const express=require('express');
const router=express.Router();
const {register,getCode,getSubscribers,verifyEmail}= require('../controller/Subscriber');

router.post('/subscribe',register);
router.post('/getCode',getCode);
router.get('/getSubscribers',getSubscribers);
router.post('/verifyEmail',verifyEmail);

module.exports=router;