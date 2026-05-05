import { useState } from "react";
import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import sharedStyles from "../styles/sharedStyles";

export default function JoinCircle({ onJoinCircle, onBack }) {
  const [inviteCode, setInviteCode] = useState("");

  function handleJoin() {
    if (!inviteCode) {
      alert("Please enter an invite link or code");
      return;
    }
    const circleName = "FitCircle Group";
    onJoinCircle(circleName, inviteCode);
  }

  return (
    <PageCard>
      <PageTitle>Join a Circle</PageTitle>
      <AppInput
        label="Invite Code or Link"
        value={inviteCode}
        onChange={e => setInviteCode(e.target.value)}
        placeholder="Paste invite code or link"
      />
      <AppButton text="Join Circle" onClick={handleJoin} />
      <p style={sharedStyles.link} onClick={onBack}>← Back</p>
    </PageCard>
  );
}
