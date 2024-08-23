const router = require("express").Router();

const {
    signInController,
    signUpController
} = require("../controller/BlogUser.controller");

router.post("/user-signup", signInController);
router.get("/user-signin", signUpController);

module.exports = router;
