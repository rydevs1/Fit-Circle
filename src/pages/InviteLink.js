import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppButton from "../components/AppButton";
import sharedStyles from "../styles/sharedStyles";
import theme from "../styles/theme";

export default function InviteLink({ circleName, inviteCode, onBack, onGoScoreboard }) {
  const link = "https://fitcircle.app/join/" + inviteCode;

  function handleCopy() {
    navigator.clipboard.writeText(link);
    alert("Invite link copied!");
  }

  return (
    <PageCard>
      <PageTitle>Invite Link</PageTitle>
      <p style={{ color: theme.colors.mutedText, textAlign: "center", marginBottom: "4px" }}>
        Share this link to invite friends to
      </p>
      <h2 style={{ color: theme.colors.primary, textAlign: "center", marginTop: "4px", marginBottom: "20px" }}>
        {circleName}
      </h2>
      <div style={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "20px",
        wordBreak: "break-all",
        fontSize: "13px",
        color: theme.colors.text,
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.15)"
      }}>
        {link}
      </div>
      <AppButton text="Copy Invite Link" onClick={handleCopy} />
      <div style={{ marginTop: "10px" }}>
        <AppButton text="Go to Scoreboard →" onClick={onGoScoreboard} />
      </div>
      <p style={sharedStyles.link} onClick={onBack}>← Back</p>
    </PageCard>
  );
}
