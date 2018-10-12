const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },
    isAdmin:{
        type:Boolean
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id,isAdmin:this.isAdmin},'key');
};

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema={
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(3).max(50).required()
    }
    return Joi.validate(user,schema);
}

module.exports.validate = validateUser;
module.exports.User = User;