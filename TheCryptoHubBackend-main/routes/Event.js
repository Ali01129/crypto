const express=require('express');
const router=express.Router();
const authenticateUser = require('../middleware/authentication');
const {addEvent,getPastEvents,getEvents,getEventRequests,acceptEvent,rejectEvent,getEventUsingTitle,editEvent,deleteEvent}= require('../controller/Event');

router.post('/AddEvent',authenticateUser,addEvent);//add upload middlewear to upload multiple images 
router.post('/editEvent',authenticateUser,editEvent);//dont use formData for this route which has no media attached in req from frontend
router.post('/deleteEvent',authenticateUser,deleteEvent);//dont use formData for this route which has no media attached in req from frontend
router.get('/getEvents',getEvents);//dont use formData for this route which has no media attached in req from frontend
router.get('/getPastEvents',getPastEvents);//dont use formData for this route which has no media attached in req from frontend
router.get('/getEventUsingTitle',getEventUsingTitle);//dont use formData for this route which has no media attached in req from frontend
router.get('/getEventRequests',getEventRequests);//dont use formData for this route which has no media attached in req from frontend
router.post('/acceptEvent',authenticateUser,acceptEvent);
router.post('/rejectEvent',authenticateUser,rejectEvent);
module.exports=router;