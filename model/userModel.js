const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema  =  new Schema({

    email : {
        type : String,
        required : [true,"email must be provided"]
    },
    username : {
        type : String,
        required  : [true,"UserName must be provided"]
    },
    password : {
        type : String,
        required : [true,"Password must be provided"]
    },

},{
    timestamps : true
})

const User = mongoose.model("User",userSchema)
module.exports = User