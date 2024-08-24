const router = require("express").Router();

const {
    signInController,
    signUpController
} = require("../controller/BlogUser.controller");

router.post("/signup", signUpController);
router.post("/signin", signInController);

module.exports = router;
