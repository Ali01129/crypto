const express=require('express');
const router=express.Router();
const authenticateUser = require('../middleware/authentication');
const {contact,forgotPassword,resetPassword,getCode,getAmbassadors,verifySpecialUser,getUsers,registerSpecial,register,verifyEmail,login,loginAdmin}= require('../controller/auth');


router.post('/registerUser',register);
router.post('/registerSpecial',registerSpecial);
router.post('/verifyEmail',verifyEmail);
router.post('/contact',contact);
router.post('/login',login);
router.post('/resetPassword',resetPassword);
router.post('/forgotPassword',forgotPassword);
router.post('/getCode',getCode);
router.post('/loginAdmin',loginAdmin);
router.get('/getUsers',authenticateUser,getUsers);
router.get('/getAmbassadors',getAmbassadors);
router.post('/verifySpecialUser',authenticateUser,verifySpecialUser);

module.exports=router;