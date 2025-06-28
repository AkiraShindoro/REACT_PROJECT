import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function LoginForm({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const url =
    mode === "login"
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/register";

  try {
    const res = await axios.post(url, {
      username,
      password,
    });

    if (mode === "login") {
      const token = res.data.token;
      localStorage.setItem("token", token);
      onLoginSuccess(token);
      toast.success("Logged In!");
    } else {
      toast.success("Registered! You can log in now.");
      setMode("login"); // switch to login mode after register
    }
  } catch (err) {
    toast.error(err.response?.data?.error || "Auth failed");
  }
  setUsername("");
  setPassword("");

};


  return (
   <form onSubmit={handleSubmit}>
  <h2>{mode === "login" ? "Login" : "Register"}</h2>

  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <br />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <br />
  <button type="submit">
    {mode === "login" ? "Login" : "Register"}
  </button>

  <br />
  <button
    type="button"
    onClick={() => setMode(mode === "login" ? "register" : "login")}
  >
    {mode === "login" ? "New user? Register" : "Already registered? Login"}
  </button>
</form>

  );
}

export default LoginForm;
