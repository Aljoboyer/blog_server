const router = require("express").Router();

const { blog_create_controller, getBlogsController, getSingleBlogController, getPersonalBlogsController, updateBlogController } = require("../controller/Blog.controller");
const JwtTokenChecker = require("../middlewares/JwtTokenChecker");

router.post("/publish",JwtTokenChecker, blog_create_controller);
router.get("/allblogs", getBlogsController);
router.get("/singleblog/:id", getSingleBlogController);
router.get("/personalblogs/:id", getPersonalBlogsController);
router.put("/update",JwtTokenChecker, updateBlogController);

module.exports = router;
