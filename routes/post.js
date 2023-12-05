const express = require("express");
const router = express.Router();
const passport=require('passport');



const postsController=require('../controller/post_controller');

router.post('/create', passport.checkAuthentication,postsController.create);


module.exports=router;