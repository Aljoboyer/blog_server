const router = require("express").Router();

const { blog_create_controller } = require("../controller/Blog.controller");
const JwtTokenChecker = require("../middlewares/JwtTokenChecker");

router.post("/publish",JwtTokenChecker, blog_create_controller);

module.exports = router;
