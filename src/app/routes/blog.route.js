const router = require("express").Router();

const { blog_create_controller, getBlogsController, getSingleBlogController } = require("../controller/Blog.controller");
const JwtTokenChecker = require("../middlewares/JwtTokenChecker");

router.post("/publish",JwtTokenChecker, blog_create_controller);
router.get("/allblogs", getBlogsController);
router.get("/singleblog/:id", getSingleBlogController);

module.exports = router;
