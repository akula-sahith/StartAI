// frontend/src/pages/SignUp.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await signup(email, password, displayName);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">
          Create Account
        </h1>
        <p className="text-neutral-400 mb-8">
          Start building with AI organizational intelligence
        </p>

        {error && (
          <div className="bg-neutral-900 border border-neutral-700 text-neutral-300 p-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-white transition-colors"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-neutral-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:text-neutral-300 underline underline-offset-4">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}