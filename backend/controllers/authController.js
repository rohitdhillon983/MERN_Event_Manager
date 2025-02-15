const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const  mailSender = require("../utils/mailSender");
const crypto = require('crypto');
const OTP = require("../models/OTP")

exports.register = async (req, res, next) => {
  const { username, email, password ,otp} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    // console.log(response)
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    
    res.json({ userId: req.user.id }); // Return the current user's ID
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
try {
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  // Send email
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  await mailSender(email, "Reset Password",`your Link for email Verification is ${resetUrl}. Please click this url to reset your Password`);

  res.status(200).json({ message: 'Password reset email sent' });
} catch (err) {
  res.status(500).json({ message: 'Error sending email', error: err });
}
};

exports.resetPassword = async (req, res) => {
const { token } = req.params;
const {password,confirmPassword} = req.body;

if (password !== confirmPassword) {
  return res.status(400).json({ message: 'Passwords do not match' });
}
if (!token) {
  return res.status(400).json({ message: 'Missing reset token' });
}

try {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
} catch (err) {
  res.status(500).json({ message: 'Error resetting password', error: err });
}
}