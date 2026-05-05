import { useState } from "react";
import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import sharedStyles from "../styles/sharedStyles";

export default function Register({ onRegister, onGoLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleRegister() {
    if (!username || !email || !password || !confirm) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        phone,
        password
      })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Account created successfully!");
    onRegister(username);
  }

  return (
    <PageCard>
      <PageTitle>Create Account</PageTitle>

      <AppInput
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Choose a username"
      />

      <AppInput
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <AppInput
        label="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Enter your phone number"
      />

      <AppInput
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Choose a password"
      />

      <AppInput
        label="Confirm Password"
        type="password"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        placeholder="Confirm your password"
      />

      <AppButton text="Create Account" onClick={handleRegister} />

      <p style={sharedStyles.link} onClick={onGoLogin}>
        Already have an account? Log In
      </p>
    </PageCard>
  );
}
