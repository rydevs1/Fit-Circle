const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String, //e.g. "Strength", "Cardio", "HIIT"
      required: true,
    },
    duration: {
      type: Number, //in minutes
      required: true,
    },
    calories: {
      type: Number, //optional
      default: 0,
    },
    notes: {
      type: String,
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weight: Number, //in lbs or kg
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
