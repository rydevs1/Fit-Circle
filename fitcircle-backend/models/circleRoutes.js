const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const Circle = require("../models/Circle");
const CircleMembership = require("../models/CircleMembership");
const InviteCode = require("../models/InviteCode");

//Helper to generate random invite codes
function generateCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

//CREATE CIRCLE
router.post("/create", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const circle = await Circle.create({
      name,
      owner: req.user,
    });

    //Add creator as member
    await CircleMembership.create({
      circle: circle._id,
      user: req.user,
    });

    res.json(circle);
  } catch (err) {
    console.error("Create circle error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

//GENERATE INVITE CODE
router.post("/generate-invite/:circleId", auth, async (req, res) => {
  try {
    const { circleId } = req.params;

    const circle = await Circle.findById(circleId);
    if (!circle) return res.status(404).json({ message: "Circle not found" });

    if (circle.owner.toString() !== req.user)
      return res.status(403).json({ message: "Not authorized" });

    const code = generateCode();

    const invite = await InviteCode.create({
      code,
      circle: circleId,
    });

    res.json({ code: invite.code });
  } catch (err) {
    console.error("Generate invite error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

//JOIN CIRCLE USING INVITE CODE
router.post("/join/:code", auth, async (req, res) => {
  try {
    const { code } = req.params;

    const invite = await InviteCode.findOne({ code });
    if (!invite) return res.status(404).json({ message: "Invalid invite code" });

    if (invite.expiresAt < Date.now())
      return res.status(400).json({ message: "Invite code expired" });

    const alreadyMember = await CircleMembership.findOne({
      circle: invite.circle,
      user: req.user,
    });

    if (alreadyMember)
      return res.status(400).json({ message: "Already in this circle" });

    await CircleMembership.create({
      circle: invite.circle,
      user: req.user,
    });

    res.json({ message: "Joined circle successfully" });
  } catch (err) {
    console.error("Join circle error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

//GET USER'S CIRCLES
router.get("/my-circles", auth, async (req, res) => {
  try {
    const memberships = await CircleMembership.find({ user: req.user }).populate(
      "circle"
    );

    res.json(memberships.map((m) => m.circle));
  } catch (err) {
    console.error("Get circles error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

//GET MEMBERS OF A CIRCLE
router.get("/members/:circleId", auth, async (req, res) => {
  try {
    const { circleId } = req.params;

    const members = await CircleMembership.find({ circle: circleId }).populate(
      "user",
      "email name"
    );

    res.json(members);
  } catch (err) {
    console.error("Get members error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
