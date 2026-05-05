import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppButton from "../components/AppButton";
import theme from "../styles/theme";

const statContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "20px",
};

const statBoxStyle = {
  textAlign: "center",
  background: "rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "16px 12px",
  flex: 1,
  margin: "0 4px",
};

const workoutItemStyle = {
  background: "rgba(255,255,255,0.06)",
  borderRadius: "8px",
  padding: "10px 14px",
  marginBottom: "8px",
};

function StatBox({ label, value }) {
  return (
    <div style={statBoxStyle}>
      <div style={{ fontSize: "26px", fontWeight: "bold", color: theme.colors.primary }}>
        {value}
      </div>
      <div style={{ fontSize: "12px", color: theme.colors.mutedText, marginTop: "4px" }}>
        {label}
      </div>
    </div>
  );
}

export default function Progress({ workouts, onBack }) {
  const totalWorkouts = workouts.length;
  const totalMinutes = workouts.reduce((sum, w) => sum + Number(w.duration), 0);
  const totalPoints = workouts.reduce((sum, w) => sum + Number(w.points), 0);

  return (
    <PageCard>
      <PageTitle>My Progress</PageTitle>
      <div style={statContainerStyle}>
        <StatBox label="Workouts" value={totalWorkouts} />
        <StatBox label="Minutes" value={totalMinutes} />
        <StatBox label="Points" value={totalPoints} />
      </div>
      <h3 style={{ color: theme.colors.text, marginBottom: "10px", marginTop: "0" }}>
        Recent Workouts
      </h3>
      {workouts.length === 0 ? (
        <p style={{ color: theme.colors.mutedText, textAlign: "center" }}>
          No workouts logged yet.
        </p>
      ) : (
        [...workouts].reverse().map((workout, index) => (
          <div key={index} style={workoutItemStyle}>
            <div style={{ fontWeight: "bold", color: theme.colors.text }}>{workout.type}</div>
            <div style={{ color: theme.colors.mutedText, fontSize: "13px", marginTop: "2px" }}>
              {workout.duration} min · {workout.points} pts
              {workout.date ? ` · ${workout.date}` : ""}
            </div>
            {workout.notes ? (
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", marginTop: "3px" }}>
                {workout.notes}
              </div>
            ) : null}
          </div>
        ))
      )}
      <div style={{ marginTop: "16px" }}>
        <AppButton text="← Back to Scoreboard" onClick={onBack} />
      </div>
    </PageCard>
  );
}
