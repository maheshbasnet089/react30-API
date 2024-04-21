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
    async getSingleBlog(req,res){
        const id = req.params.id 
    
        if(!id){
            return res.status(400).json({
                message : 'Please provide id'
            })
        }
        const data = await Blog.findById(id).populate('userId','-password')
        res.status(200).json({
            message : 'Blogs fetched successfully',
            data
        })
    }
    async deleteBlog(req,res){
        const id = req.params.id 
        if(!id){
            return res.status(400).json({
                message : 'Please provide id'
            })
        }
      await Blog.findByIdAndDelete(id)
        res.status(200).json({
            message : 'Blogs deleted successfully',
        
        })
    }

    async updateBlog(req,res){
        const id = req.params.id 
    const {title,description,category,subtitle} = req.body
        const oldDatas = await Blog.findById(id)
        let fileName;
        if(req.file){
            
        const oldImagePath = oldDatas.imageUrl
       
        const localHostUrlLength = process.env.BASE_URL.length
        const newOldImagePath = oldImagePath.slice(localHostUrlLength)
        fs.unlink(`uploads/${newOldImagePath}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File Deleted Successfully")
            }
        })
        fileName =  process.env.BASE_URL + req.file.filename
    }
    await Blog.findByIdAndUpdate(id,{
        title,
        description,
        category,
        subtitle,
        imageUrl : fileName
    })
    res.status(200).json({
        message : "Blog Updated Successfully"
    })
    }
}

module.exports = new BlogController()