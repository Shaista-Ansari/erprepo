import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { account } from "./appwriteConfig";
import InputField from "./components/InputField";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create user
      await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // 2️⃣ Auto login
      await account.createEmailSession(email, password);

      alert("Signup successful");
      navigate("/dashboard"); // change if needed
    } catch (err) {
      console.error(err);
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="login-container">
        <h2 className="form-title">Sign Up</h2>

        <form className="login-form" onSubmit={handleSignup}>
          <InputField
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="signup-prompt">
          Already have an account?{" "}
          <Link to="/" className="signup-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
