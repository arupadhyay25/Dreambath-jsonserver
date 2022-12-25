const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        trim:true
    },
    role:{
        type:String,
        required:true
    }
})

const UserModel = mongoose.model('user',userSchema);

module.exports = {UserModel};