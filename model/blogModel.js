const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title :{
        type : String,
      
    },
    subtitle : {
        type : String
    },
    description : {
        type : String
    },
    category : {
        type : String
    },
    imageUrl : {
        type : String
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }
})

const Blog = mongoose.model('Blog',blogSchema)
module.exports = Blog
