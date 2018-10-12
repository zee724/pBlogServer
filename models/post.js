const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3
    },
    content:{
        type:String,
        required:true,
    },
    datePublished:{
        type:Date,
        required:true,
        default:Date.now
    }
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;