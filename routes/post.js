const express = require("express");
const router = express.Router();



const postsController=require('../controller/post_controller');

router.post('/create',postsController.create);


module.exports=router;