const mongoose = require("mongoose");

const InviteCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    circle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circle",
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InviteCode", InviteCodeSchema);
