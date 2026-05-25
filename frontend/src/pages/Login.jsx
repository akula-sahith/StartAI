// frontend/src/pages/Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-neutral-400 mb-8">
          Login to your Startup Intelligence OS
        </p>

        {error && (
          <div className="bg-neutral-900 border border-neutral-700 text-neutral-300 p-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-white transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-white transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-neutral-200 text-black transition-all rounded-xl py-3 font-semibold"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-neutral-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-transparent border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 transition-all rounded-xl py-3 text-white"
        >
          Continue with Google
        </button>

        <p className="text-neutral-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white hover:text-neutral-300 underline underline-offset-4">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}