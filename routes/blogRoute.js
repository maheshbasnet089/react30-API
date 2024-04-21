const blogController = require("../controller/blog/blogController")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")
const router = require("express").Router()
const {multer,storage} = require("../services/multerConfig")
const upload = multer({storage : storage})

router.route("/blog").post(isAuthenticated,upload.single('image'), catchAsync(blogController.createBlog)).get(catchAsync(blogController.getBlogs))
router.route("/blog/:id").get(catchAsync(blogController.getSingleBlog)).delete(isAuthenticated, catchAsync(blogController.deleteBlog)).patch(isAuthenticated, upload.single('image'), catchAsync(blogController.updateBlog))

module.exports = router 