import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SAMPLE_ACCOUNTS = [
  { role: "Risk Analyst", email: "risk@demo.com" },
  { role: "Risk Manager", email: "manager@demo.com" },
  { role: "Admin", email: "admin@demo.com" },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error || "Login failed");
      return;
    }
    navigate("/app/dashboard");
  }

  function fill(demoEmail) {
    setEmail(demoEmail);
    setPassword("password123");
    setError("");
  }

  return (
    <div className="min-h-screen bg-[#060a16] noise-radial grid-bg flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <ShieldCheck className="text-teal-400" size={28} />
          <span className="font-display font-semibold text-xl">AI Risk Manager</span>
        </Link>

        <div className="glass-strong rounded-2xl p-8">
          <h1 className="font-display text-2xl font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-6">Sign in to access your risk workspace.</p>

          <div className="space-y-2 mb-5">
            <p className="text-xs text-slate-600 mb-1">Try a sample account (password: password123):</p>
            {SAMPLE_ACCOUNTS.map((d) => (
              <button
                key={d.email}
                type="button"
                onClick={() => fill(d.email)}
                className="w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg border border-teal-500/20 bg-teal-500/5 text-teal-300 hover:bg-teal-500/10 transition-colors"
              >
                <span>{d.role}</span>
                <span className="font-mono text-slate-400">{d.email}</span>
              </button>
            ))}
          </div>

          {error && <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-11 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  placeholder="Your password"
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium hover:shadow-[0_0_24px_rgba(45,212,191,0.4)] transition-shadow disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Log In
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal-400 hover:text-teal-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
