import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateCircle from "./pages/CreateCircle";
import InviteLink from "./pages/InviteLink";
import JoinCircle from "./pages/JoinCircle";
import Scoreboard from "./pages/Scoreboard";
import LogWorkout from "./pages/LogWorkout";
import Progress from "./pages/Progress";
import ResetPassword from "./pages/ResetPassword";

const centerStyle = {
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0",
};

export default function App() {
  const [page, setPage] = useState(() =>
    localStorage.getItem("fc_currentUser") ? "home" : "login"
  );
  const [currentUser, setCurrentUser] = useState(
    () => localStorage.getItem("fc_currentUser") || ""
  );
  const [circleName, setCircleName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [workouts, setWorkouts] = useState(() => {
    const user = localStorage.getItem("fc_currentUser");
    if (!user) return [];
    const stored = localStorage.getItem("fc_workouts_" + user);
    return stored ? JSON.parse(stored) : [];
  });

  function handleLogin(username) {
    localStorage.setItem("fc_currentUser", username);
    setCurrentUser(username);
    const stored = localStorage.getItem("fc_workouts_" + username);
    setWorkouts(stored ? JSON.parse(stored) : []);
    setPage("home");
  }

  function handleLogout() {
    localStorage.removeItem("fc_currentUser");
    setCurrentUser("");
    setWorkouts([]);
    setPage("login");
  }

  function handleCircleCreated(name, code) {
    setCircleName(name);
    setInviteCode(code);
    setPage("invite");
  }

  function handleJoinCircle(name, code) {
    setCircleName(name);
    setInviteCode(code);
    setPage("scoreboard");
  }

  function handleWorkoutLogged(workout) {
    const newWorkouts = [...workouts, workout];
    setWorkouts(newWorkouts);
    localStorage.setItem("fc_workouts_" + currentUser, JSON.stringify(newWorkouts));
    setPage("progress");
  }

  return (
    <div style={centerStyle}>

      {/* LOGIN PAGE */}
      {page === "login" && (
        <Login
          onLogin={handleLogin}
          onGoRegister={() => setPage("register")}
          onGoForgot={() => setPage("forgot")}
        />
      )}

      {/* REGISTER PAGE */}
      {page === "register" && (
        <Register
          onRegister={handleLogin}
          onGoLogin={() => setPage("login")}
        />
      )}

      {/* RESET PASSWORD PAGE */}
      {page === "forgot" && (
        <ResetPassword
          onBackToLogin={() => setPage("login")}
        />
      )}

      {/* HOME PAGE */}
      {page === "home" && (
        <CreateCircle
          currentUser={currentUser}
          onCircleCreated={handleCircleCreated}
          onGoJoin={() => setPage("join")}
          onLogout={handleLogout}
        />
      )}

      {/* INVITE PAGE */}
      {page === "invite" && (
        <InviteLink
          circleName={circleName}
          inviteCode={inviteCode}
          onBack={() => setPage("home")}
          onGoScoreboard={() => setPage("scoreboard")}
        />
      )}

      {/* JOIN CIRCLE PAGE */}
      {page === "join" && (
        <JoinCircle
          onJoinCircle={handleJoinCircle}
          onBack={() => setPage("home")}
        />
      )}

      {/* SCOREBOARD PAGE */}
      {page === "scoreboard" && (
        <Scoreboard
          circleName={circleName}
          currentUser={currentUser}
          workouts={workouts}
          onBack={() => setPage("home")}
          onLogWorkout={() => setPage("logWorkout")}
          onViewProgress={() => setPage("progress")}
        />
      )}

      {/* LOG WORKOUT PAGE */}
      {page === "logWorkout" && (
        <LogWorkout
          onWorkoutLogged={handleWorkoutLogged}
          onBack={() => setPage("scoreboard")}
        />
      )}

      {/* PROGRESS PAGE */}
      {page === "progress" && (
        <Progress
          workouts={workouts}
          onBack={() => setPage("scoreboard")}
        />
      )}

    </div>
  );
}
