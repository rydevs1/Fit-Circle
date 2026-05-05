import { useState } from "react";
import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import sharedStyles from "../styles/sharedStyles";
import theme from "../styles/theme";

export default function CreateCircle({ currentUser, onCircleCreated, onGoJoin, onLogout }) {
  const [circleName, setCircleName] = useState("");
  const [goal, setGoal] = useState("");

  function handleCreate() {
    if (!circleName || !goal) {
      alert("Please fill in all fields");
      return;
    }
    
    const inviteCode =
      circleName.replace(/\s+/g, "").toLowerCase() +
      "-" +
      Math.random().toString(36).slice(2, 7);
    onCircleCreated(circleName, inviteCode);
  }

  return (
    <PageCard>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ color: theme.colors.mutedText, fontSize: "13px" }}>
          Signed in as{" "}
          <strong style={{ color: theme.colors.primary }}>{currentUser}</strong>
        </span>
        <span style={{ ...sharedStyles.link, marginTop: 0, fontSize: "13px" }} onClick={onLogout}>
          Log out
        </span>
      </div>
      <PageTitle>Create a Circle</PageTitle>
      <AppInput
        label="Circle Name"
        value={circleName}
        onChange={e => setCircleName(e.target.value)}
        placeholder="e.g. Morning Runners"
      />
      <AppInput
        label="Goal"
        value={goal}
        onChange={e => setGoal(e.target.value)}
        placeholder="e.g. Run 5 days a week"
      />
      <AppButton text="Create Circle" onClick={handleCreate} />
      <p style={sharedStyles.link} onClick={onGoJoin}>
        Already have an invite? Join a Circle
      </p>
    </PageCard>
  );
}
