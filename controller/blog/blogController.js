const Blog = require("../../model/blogModel");

class BlogController{
    async createBlog(req,res){
        let fileName ;
        if(!req.file){
            fileName = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfn8qSKm5XaNnIsQRF_00gXdf2VX-M5DBcuooLYpi_hQ&s"
        }else{
           fileName = process.env.BASE_URL + req.file.filename
        }
        const userId = req.userId
       const {title,description,category,subtitle} = req.body
       if(!title || !description || !category || !subtitle){
        res.status(400).json({
            message : 'Please provide title,description,category,subtitle'
        })
        return
       } 
       await Blog.create({
            title,
            description,
            category,
            userId,
            subtitle,
            imageUrl : fileName
           })
       res.status(201).json({
        message : "Blog Created Successfully"
       })
    }
    async getBlogs(req,res){
        const data = await Blog.find().populate('userId','-password')
        res.status(200).json({
            message : 'Blogs fetched successfully',
            data
        })
    }
}

module.exports = new BlogController()