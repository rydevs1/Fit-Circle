import { useState } from "react";
import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import sharedStyles from "../styles/sharedStyles";

export default function Login({ onLogin, onGoRegister, onGoForgot }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    onLogin(data.username);
  }

  return (
    <PageCard>
      <PageTitle>FitCircle</PageTitle>

      <AppInput
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter username"
      />

      <AppInput
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter password"
      />

      <AppButton text="Log In" onClick={handleLogin} />

      <p style={sharedStyles.link} onClick={onGoForgot}>
        Forgot your password?
      </p>

      <p style={sharedStyles.link} onClick={onGoRegister}>
        Don't have an account? Register
      </p>
    </PageCard>
  );
}
