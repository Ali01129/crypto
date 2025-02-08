const express=require('express');
const router=express.Router();
const authenticateUser = require('../middleware/authentication');
const {addProject,getProjects,getProjectRequests,acceptProject,rejectProject,getProjectUsingTitle,editProject,deleteProject}= require('../controller/Project');

router.post('/AddProject',authenticateUser,addProject);//add upload middlewear to upload multiple images 
router.post('/editProject',authenticateUser,editProject);//dont use formData for this route which has no media attached in req from frontend
router.post('/deleteProject',authenticateUser,deleteProject);//dont use formData for this route which has no media attached in req from frontend
router.get('/getProjects',getProjects);//dont use formData for this route which has no media attached in req from frontend
router.get('/getProjectUsingTitle',getProjectUsingTitle);//dont use formData for this route which has no media attached in req from frontend
router.get('/getProjectRequests',getProjectRequests);//dont use formData for this route which has no media attached in req from frontend
router.post('/acceptProject',authenticateUser,acceptProject);
router.post('/rejectProject',authenticateUser,rejectProject);
module.exports=router;