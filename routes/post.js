const Post = require('../models/post');
const express = require('express');
const router = express.Router();


router.get('/',async (req,res)=>{
    const post = await Post
        .find()
        .sort({datePublished:-1});
    res.send(post);
});
router.post('/',async (req,res)=>{
    
    const post = new Post({
        title:req.body.postTitle,
        content:req.body.postContent
    });
    // console.log(req);
    await post.save();
    res.send(post);
});

module.exports = router;