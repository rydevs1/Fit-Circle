export function calculateWorkoutPoints(workout) {
    const BASE = 10;
  
    const intensityMap = {
      light: 5,
      medium: 10,
      hard: 15
    };
  
    const intensity = workout.intensity?.toLowerCase();
    const duration = Number(workout.duration || 0);
  
    let durationPoints = 0;
    if (duration >= 60) durationPoints = 20;
    else if (duration >= 45) durationPoints = 15;
    else if (duration >= 30) durationPoints = 10;
    else if (duration >= 15) durationPoints = 5;
  
    const total = BASE + (intensityMap[intensity] || 0) + durationPoints;
  
    return Math.min(total, 50);
  }