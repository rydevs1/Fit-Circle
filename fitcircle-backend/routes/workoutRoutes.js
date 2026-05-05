const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const auth = require("../middleware/authMiddleware");

// @route   POST /api/workouts
// @desc    Create new workout
// @access  Private     
router.post("/", auth, async (req, res) => {
  try {
    const { title, type, duration, calories, notes, exercises } = req.body;

    const workout = new Workout({
      user: req.user,
      title,
      type,
      duration,
      calories,
      notes,
      exercises,
    });

    const saved = await workout.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create workout error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/workouts
// @desc    Get all workouts for logged-in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user }).sort({
      createdAt: -1,
    });
    res.json(workouts);
  } catch (err) {
    console.error("Get workouts error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/workouts/:id
// @desc    Get single workout
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(workout);
  } catch (err) {
    console.error("Get workout error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/workouts/:id
// @desc    Update workout
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, type, duration, calories, notes, exercises } = req.body;

    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title, type, duration, calories, notes, exercises },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(workout);
  } catch (err) {
    console.error("Update workout error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete workout
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json({ message: "Workout deleted" });
  } catch (err) {
    console.error("Delete workout error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
