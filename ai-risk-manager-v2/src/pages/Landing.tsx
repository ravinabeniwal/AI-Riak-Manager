import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Radar,
  Gauge,
  ListOrdered,
  FileSearch,
  Activity,
  ClipboardCheck,
  Sparkles,
  Clock,
  BellRing,
  LineChart as LineChartIcon,
  CheckCircle2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const FEATURES = [
  { icon: Radar, title: "Risk Detection", desc: "AI identifies patterns humans may miss across logins, transactions, and vendor signals." },
  { icon: Gauge, title: "Risk Scoring", desc: "Every risk carries a transparent 0–100 score built from probability and impact." },
  { icon: ListOrdered, title: "Risk Prioritization", desc: "Prioritize what needs attention first, ranked by score, status, and urgency." },
  { icon: FileSearch, title: "Evidence & Explainability", desc: "Understand why the AI flagged this risk, with the evidence behind every score." },
  { icon: Activity, title: "Risk Monitoring", desc: "See risk before it escalates, with live tracking of score changes and emerging patterns." },
  { icon: ClipboardCheck, title: "Mitigation Planning", desc: "Turn every finding into an owned action with a due date, priority, and status." },
  { icon: Sparkles, title: "AI Insights", desc: "AI prepares the insight. Your team makes the decision — with full context every time." },
  { icon: Clock, title: "Risk Timeline", desc: "A complete, auditable history of every risk from detection through resolution." },
  { icon: BellRing, title: "Alerts & Notifications", desc: "Get notified the moment a risk escalates or a mitigation falls overdue." },
  { icon: LineChartIcon, title: "Executive Risk Overview", desc: "A single, board-ready view of organizational risk posture and trends." },
];

const MESSAGES = [
  "See risk before it escalates.",
  "AI identifies patterns humans may miss.",
  "Every important risk comes with context.",
  "Prioritize what needs attention first.",
];

export default function Landing() {
  return (
    <div className="bg-[#060a16] text-slate-200 overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-50 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShieldCheck className="text-teal-400" size={24} />
              <div className="absolute inset-0 blur-md bg-teal-400/40 rounded-full" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight">AI Risk Manager</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#capabilities" className="hover:text-teal-300 transition-colors">Capabilities</a>
            <a href="#insights" className="hover:text-teal-300 transition-colors">AI Insights</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:inline text-sm text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:shadow-[0_0_24px_rgba(45,212,191,0.4)] transition-shadow"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 noise-radial grid-bg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-xs text-teal-300 mb-7 font-mono tracking-wider"
          >
            <Sparkles size={13} /> AI-POWERED RISK INTELLIGENCE
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight"
          >
            Turn complex risk into clear,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">actionable intelligence.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            AI Risk Manager helps teams identify emerging risks, assess impact, prioritize critical issues, and track
            mitigation actions from one intelligent workspace.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/login"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] transition-all"
            >
              Get Started
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#capabilities"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass text-slate-200 font-medium hover:bg-white/10 transition-colors"
            >
              Explore Risk Intelligence
            </a>
          </motion.div>
        </div>

        {/* Floating message strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto px-6 mt-20"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {MESSAGES.map((m) => (
              <motion.div
                key={m}
                whileHover={{ y: -3 }}
                className="glass rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                <span className="text-sm text-slate-300">{m}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Capabilities grid */}
      <section id="capabilities" className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl mb-16"
          >
            <p className="text-teal-400 text-sm font-mono uppercase tracking-wider mb-3">Capabilities</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
              A full intelligence layer over organizational risk
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: (i % 5) * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-blue-500/10 flex items-center justify-center mb-4 border border-teal-500/20">
                  <f.icon size={18} className="text-teal-300" />
                </div>
                <h3 className="font-display font-semibold text-base mb-1.5">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights narrative section */}
      <section id="insights" className="py-24 md:py-32 border-t border-white/5 bg-white/[0.015]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-teal-400 text-sm font-mono uppercase tracking-wider mb-4">
            AI Insights
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-semibold tracking-tight leading-relaxed"
          >
            "AI prepares the insight. Your team makes the decision."
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-slate-400 max-w-xl mx-auto"
          >
            Every flagged risk arrives with a full explanation: the indicators that triggered it, the evidence behind
            it, and a confidence score — so your team can act with context, not guesswork.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                See your risk landscape clearly
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Sign in with a demo account to explore the analyst, manager, and admin experiences.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] transition-all"
              >
                Get Started <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-teal-400" size={18} />
            <span className="font-display text-sm font-medium">AI Risk Manager</span>
          </div>
          <p className="text-xs text-slate-600">Enterprise risk intelligence, built for clarity.</p>
        </div>
      </footer>
    </div>
  );
}
