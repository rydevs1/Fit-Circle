import { useState } from "react";
import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import sharedStyles from "../styles/sharedStyles";
import { calculateWorkoutPoints } from "./scoreCalculator";

export default function LogWorkout({ onWorkoutLogged, onBack }) {
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("medium");
  const [notes, setNotes] = useState("");

  function handleSubmit() {
    if (!workoutType || !duration || Number(duration) <= 0) {
      alert("Please fill in workout type and enter a valid duration");
      return;
    }

    const workout = {
      type: workoutType,
      duration: Number(duration),
      intensity: intensity,
      notes: notes,
      points: calculateWorkoutPoints({
        duration: Number(duration),
        intensity: intensity,
      }),
      date: new Date().toLocaleDateString(),
    };

    onWorkoutLogged(workout);
  }

  return (
    <PageCard>
      <PageTitle>Log Workout</PageTitle>
      <AppInput
        label="Workout Type"
        value={workoutType}
        onChange={e => setWorkoutType(e.target.value)}
        placeholder="e.g. Running, Cycling, Yoga"
      />
      <AppInput
        label="Duration (minutes)"
        type="number"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        placeholder="e.g. 30"
      />
      <label style={sharedStyles.label}>Intensity</label>
      <select
        value={intensity}
        onChange={e => setIntensity(e.target.value)}
        style={sharedStyles.input}
      >
        <option value="light">Light</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <AppInput
        label="Notes (optional)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="How did it go?"
      />
      <AppButton text="Save Workout" onClick={handleSubmit} />
      <p style={sharedStyles.link} onClick={onBack}>← Back</p>
    </PageCard>
  );
}
