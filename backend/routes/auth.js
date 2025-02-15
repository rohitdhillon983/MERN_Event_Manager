const express = require("express");
const { register, login, getCurrentUser, forgetPassword, resetPassword } = require("../controllers/authController");
const auth = require("../middleware/auth");
const otpCreate = require("../middleware/otpCreate");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sendotp", otpCreate)
router.get("/me", auth, getCurrentUser)
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);
module.exports = router;