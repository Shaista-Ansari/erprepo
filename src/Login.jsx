import { useState } from "react";
import InputField from "./components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { account } from "./appwriteConfig";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔥 FIX: agar pehle se login hai to logout
      try {
        await account.deleteSession("current");
      } catch (_) {}

      // 🔐 Login
      await account.createEmailPasswordSession(email, password);

      login(true);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-screen">
      <div className="login-container">
        <h2 className="form-title">Admin Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Link
            to="/reset-password"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Forget Password?
          </Link>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <p className="signup-prompt">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
