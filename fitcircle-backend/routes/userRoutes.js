const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password, phone } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      phone,
      password: hashed
    });

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: "Username already exists" });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Wrong password" });

  res.json({ success: true, username: user.username });
});

//EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

//SEND RESET CODE (with rate limiting + expiration)
router.post("/send-reset-code", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "Email not found" });

  //Basic rate limiting: max 5 attempts
  if (user.resetAttempts >= 5) {
    return res.json({
      success: false,
      message: "Too many reset attempts. Try again later."
    });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000); //5 minutes

  user.resetCode = code;
  user.resetCodeExpires = expires;
  user.resetAttempts = (user.resetAttempts || 0) + 1;
  await user.save();

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>FitCircle Password Reset</h2>
      <p>Your password reset code is:</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
      <p>This code will expire in <strong>5 minutes</strong>.</p>
      <p>If you did not request this, you can ignore this email.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "FitCircle Password Reset Code",
    html
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Email failed to send" });
    }

    res.json({ success: true });
  });
});

//VERIFY CODE + RESET PASSWORD (with expiration)
router.post("/reset", async (req, res) => {
  const { email, code, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "Email not found" });

  if (!user.resetCode || !user.resetCodeExpires) {
    return res.json({ success: false, message: "No reset request found" });
  }

  if (user.resetCode !== code) {
    return res.json({ success: false, message: "Invalid code" });
  }

  if (user.resetCodeExpires < new Date()) {
    return res.json({ success: false, message: "Code has expired" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetCode = null;
  user.resetCodeExpires = null;
  user.resetAttempts = 0;
  await user.save();

  res.json({ success: true });
});

module.exports = router;
