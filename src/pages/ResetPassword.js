import { useState } from "react";
import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import sharedStyles from "../styles/sharedStyles";

export default function ResetPassword({ onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function sendCode() {
    if (!email) {
      alert("Enter your email");
      return;
    }

    const res = await fetch("http://localhost:5000/api/users/send-reset-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Reset code sent to your email");
    setStep(2);
  }

  async function resetPassword() {
    if (!code || !newPassword || !confirm) {
      alert("Fill in all fields");
      return;
    }

    if (newPassword !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/api/users/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Password updated successfully!");
    onBackToLogin();
  }

  return (
    <PageCard>
      <PageTitle>Reset Password</PageTitle>

      {step === 1 && (
        <>
          <AppInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <AppButton text="Send Reset Code" onClick={sendCode} />
        </>
      )}

      {step === 2 && (
        <>
          <AppInput
            label="Reset Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the 6-digit code"
          />

          <AppInput
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />

          <AppInput
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
          />

          <AppButton text="Reset Password" onClick={resetPassword} />
        </>
      )}

      <p style={sharedStyles.link} onClick={onBackToLogin}>
        ← Back to Login
      </p>
    </PageCard>
  );
}
