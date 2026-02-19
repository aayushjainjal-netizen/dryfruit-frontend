import { useState } from "react";
import { loginUser } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email: email,
        password: password,
      });

      console.log("Login Response:", response.data);

      // Save token
      localStorage.setItem("token", response.data.token);

      alert("Login Successful ✅");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
