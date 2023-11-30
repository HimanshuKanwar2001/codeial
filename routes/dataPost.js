const express=require('express');
const router=express.Router();


const postController=require('../controller/post_controller');

router.post("/dataPosting", postController.postingData);




module.exports=router;