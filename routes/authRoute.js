const express = require("express");
const authController = require("../controllers/authController");
const checkToken = require("../middlewares/checkToken");
const router = express.Router();

router.post("/signup", authController.signUp)

router.route("/login")
    .post(authController.login)

module.exports = router;
