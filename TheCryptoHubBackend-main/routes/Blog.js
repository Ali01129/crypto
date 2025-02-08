const express=require('express');
const router=express.Router();
const authenticateUser = require('../middleware/authentication');
const {addBlog,getBlogs,getBlogRequests,acceptBlog,rejectBlog,getBlogUsingTitle,editBlog,deleteBlog}= require('../controller/Blog');

router.post('/AddBlog',authenticateUser,addBlog);//add upload middlewear to upload multiple images 
router.post('/editBlog',authenticateUser,editBlog);//dont use formData for this route which has no media attached in req from frontend
router.post('/deleteBlog',authenticateUser,deleteBlog);//dont use formData for this route which has no media attached in req from frontend
router.get('/getBlogs',getBlogs);//dont use formData for this route which has no media attached in req from frontend
router.get('/getBlogUsingTitle',getBlogUsingTitle);//dont use formData for this route which has no media attached in req from frontend
router.get('/getBlogRequests',getBlogRequests);//dont use formData for this route which has no media attached in req from frontend
router.post('/acceptBlog',authenticateUser,acceptBlog);
router.post('/rejectBlog',authenticateUser,rejectBlog);
module.exports=router;