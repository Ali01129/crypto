const express=require('express');
const router=express.Router();
const authenticateUser = require('../middleware/authentication');
const {addPodcast,getPodcasts,deletePodcast}= require('../controller/Podcast');

router.post('/addPodcast',authenticateUser,addPodcast); 
router.post('/deletePodcast',authenticateUser,deletePodcast);
router.get('/getPodcasts',getPodcasts);
module.exports=router;