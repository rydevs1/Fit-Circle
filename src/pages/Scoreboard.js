import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppButton from "../components/AppButton";
import theme from "../styles/theme";

const DEMO_MEMBERS = [
  { name: "Alex", points: 90 },
  { name: "Jordan", points: 81 },
  { name: "Morgan", points: 64 },
];

const thStyle = {
  padding: "10px",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  color: "rgba(255,255,255,0.65)",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "13px",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  textAlign: "center",
  color: "#ffffff",
  fontSize: "14px",
};

export default function Scoreboard({ circleName, currentUser, workouts, onBack, onLogWorkout, onViewProgress }) {
  const userPoints = workouts.reduce((sum, w) => sum + Number(w.points), 0);

  const members = [
    { name: currentUser || "You", points: userPoints },
    ...DEMO_MEMBERS,
  ].sort((a, b) => b.points - a.points);

  return (
    <PageCard>
      <PageTitle>Scoreboard</PageTitle>
      <h2 style={{ color: theme.colors.primary, textAlign: "center", marginTop: 0, marginBottom: "20px" }}>
        {circleName}
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th style={thStyle}>Rank</th>
            <th style={thStyle}>Member</th>
            <th style={thStyle}>Points</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              key={member.name}
              style={member.name === currentUser ? { background: "rgba(76,175,80,0.15)" } : {}}
            >
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>
                {member.name}
                {member.name === currentUser && (
                  <span style={{ color: theme.colors.primary, marginLeft: "6px", fontSize: "12px" }}>
                    (you)
                  </span>
                )}
              </td>
              <td style={tdStyle}>{member.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AppButton text="Log Workout" onClick={onLogWorkout} />
      <div style={{ marginTop: "10px" }}>
        <AppButton text="View My Progress" onClick={onViewProgress} />
      </div>
      <div style={{ marginTop: "10px" }}>
        <AppButton text="← Back" onClick={onBack} />
      </div>
    </PageCard>
  );
}
