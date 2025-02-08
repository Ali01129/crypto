const express=require('express');
const router=express.Router();
const authenticateUser = require('../middleware/authentication');
const {editPartner,getPartners,deletePartner,AddPartner,getPartnersAdminPanel}= require('../controller/Partner');

router.post('/editPartner',authenticateUser,editPartner);
router.get('/getPartners',getPartners);
router.post('/deletePartner',authenticateUser,deletePartner);
router.post('/AddPartner',authenticateUser,AddPartner);
router.get('/getPartnersAdminPanel',getPartnersAdminPanel);

module.exports=router;