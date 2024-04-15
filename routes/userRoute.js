const userController = require("../controller/user/userController")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

router.route("/register").post(catchAsync(userController.register))
router.route("/login").post(catchAsync(userController.login))

module.exports = router 