import { useState } from "react";
import InputField from "./components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { account, databases } from "./appwriteConfig";


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
      // 👤 current user nikaalo
      const user = await account.get();

      // 📦 DB se role lao
      const res = await databases.listDocuments(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID
      );

      const currentUser = res.documents.find(
        (doc) => doc.userId === user.$id
      );

      if (!currentUser) {
        setError("Role not assigned. Contact admin.");
        return;
      }

      // 🔐 auth context update
      login("demo-token", currentUser.role);

      // 🚦 ROLE BASED REDIRECT
      if (currentUser.role === "admin") {
        navigate("/dashboard", { replace: true });
      }
      else if (currentUser.role === "teacher") {
        navigate("/dashboard", { replace: true });
      }
      else if (currentUser.role === "student") {
        navigate("/view-results-student", { replace: true });
      }


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

      </div>
    </div>
  );
};

export default Login;
