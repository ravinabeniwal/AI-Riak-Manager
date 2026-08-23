import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Gauge,
  ClipboardList,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRiskStore } from "../context/RiskStoreContext";
import { USERS } from "../data/misc";
import StatCard from "../components/StatCard";
import { SeverityBadge } from "../components/Badges";
const SEVERITY_COLORS = { Critical: "#ef4444", High: "#f59e0b", Medium: "#3b82f6", Low: "#34d399" };
const chartTooltip = { background: "#0d1428", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 };
function Dashboard() {
  const { user } = useAuth();
  const { risks } = useRiskStore();
  const critical = risks.filter((r) => r.severity === "Critical").length;
  const high = risks.filter((r) => r.severity === "High").length;
  const newRisks = risks.filter((r) => r.status === "New").length;
  const avgScore = Math.round(risks.reduce((a, r) => a + r.score, 0) / risks.length);
  const openMitigations = risks.flatMap((r) => r.mitigationActions).filter((m) => m.status !== "Completed").length;
  const overdue = risks.flatMap((r) => r.mitigationActions).filter((m) => m.status !== "Completed" && new Date(m.dueDate) < /* @__PURE__ */ new Date()).length;
  const resolved = risks.filter((r) => r.status === "Resolved").length;
  const severityDist = ["Critical", "High", "Medium", "Low"].map((s) => ({
    name: s,
    value: risks.filter((r) => r.severity === s).length
  }));
  const trend = risks.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((r, i) => ({ name: `#${i + 1}`, score: r.score }));
  const topRisks = [...risks].sort((a, b) => b.score - a.score).slice(0, 5);
  const recentActivity = risks.flatMap((r) => r.timeline.map((t) => ({ ...t, riskId: r.id, riskTitle: r.title }))).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
  return <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">
          {user?.role === "admin" ? "Admin Overview" : user?.role === "manager" ? "Organization Risk Overview" : `Welcome back, ${user?.name?.split(" ")[0]}`}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {user?.role === "admin" ? "Platform-wide activity, users, and risk detection statistics." : "Your organization's current risk posture, powered by AI."}
        </p>
      </div>

      {
    /* Stat cards vary by role */
  }
      {user?.role === "admin" ? <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={USERS.length} icon={Users} accent="blue" delay={0} />
          <StatCard label="Risk Analysts" value={USERS.filter((u) => u.role === "analyst").length} icon={Users} accent="teal" delay={0.05} />
          <StatCard label="Active Risks" value={risks.length - resolved} icon={ShieldAlert} accent="amber" delay={0.1} />
          <StatCard label="Resolved Risks" value={resolved} icon={CheckCircle2} accent="emerald" delay={0.15} />
        </div> : user?.role === "manager" ? <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard label="Org Risk Score" value={avgScore} suffix="/100" icon={Gauge} accent="teal" delay={0} />
          <StatCard label="Critical Risks" value={critical} icon={ShieldAlert} accent="red" delay={0.05} />
          <StatCard label="Open Mitigations" value={openMitigations} icon={ClipboardList} accent="blue" delay={0.1} />
          <StatCard label="Overdue Actions" value={overdue} icon={Clock} accent="amber" delay={0.15} />
          <StatCard label="Resolved" value={resolved} icon={CheckCircle2} accent="emerald" delay={0.2} />
        </div> : <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <StatCard label="Total Risks" value={risks.length} icon={ShieldAlert} accent="teal" delay={0} />
          <StatCard label="Critical" value={critical} icon={AlertTriangle} accent="red" delay={0.05} />
          <StatCard label="High" value={high} icon={AlertTriangle} accent="amber" delay={0.1} />
          <StatCard label="New" value={newRisks} icon={Sparkles} accent="blue" delay={0.15} />
          <StatCard label="Avg Score" value={avgScore} suffix="/100" icon={Gauge} accent="indigo" delay={0.2} />
          <StatCard label="Open Mitigations" value={openMitigations} icon={ClipboardList} accent="emerald" delay={0.25} />
        </div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-6">Risk Score Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={28} />
              <Tooltip contentStyle={chartTooltip} labelStyle={{ color: "#94a3b8" }} />
              <Line type="monotone" dataKey="score" stroke="#2dd4bf" strokeWidth={2.5} dot={{ fill: "#2dd4bf", r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-6">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={severityDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={3}>
                {severityDist.map((entry) => <Cell key={entry.name} fill={SEVERITY_COLORS[entry.name]} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={chartTooltip} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {severityDist.map((c) => <div key={c.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-400">
                  <span className="w-2 h-2 rounded-full" style={{ background: SEVERITY_COLORS[c.name] }} />
                  {c.name}
                </span>
                <span className="text-slate-300 font-mono">{c.value}</span>
              </div>)}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Top Priority Risks</h3>
            <Link to="/app/risks" className="text-xs text-teal-400 hover:text-teal-300">View all</Link>
          </div>
          <div className="space-y-3">
            {topRisks.map((r) => <Link key={r.id} to={`/app/risks/${r.id}`} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className="min-w-0">
                  <p className="text-sm text-slate-200 truncate">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.category} · Score {r.score}</p>
                </div>
                <SeverityBadge severity={r.severity} className="shrink-0" />
              </Link>)}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">{user?.role === "admin" ? "Audit Activity" : "Recent Activity"}</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a) => <div key={a.id + a.riskId} className="flex gap-3 text-sm">
                <TrendingUp size={14} className="text-slate-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-slate-300">{a.event}</p>
                  <p className="text-xs text-slate-600">
                    <Link to={`/app/risks/${a.riskId}`} className="hover:text-teal-400">{a.riskTitle}</Link> · {new Date(a.date).toLocaleString()}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-teal-400" />
          <h3 className="font-display font-semibold">AI Recommendation Summary</h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          {critical > 0 ? <span>
              <span className="text-red-400 font-medium">{critical} critical risk{critical === 1 ? "" : "s"}</span> require immediate attention, led by{" "}
              <span className="text-slate-200 font-medium">"{topRisks[0]?.title}"</span> at a score of {topRisks[0]?.score}/100.{" "}
            </span> : "No critical risks are currently open. "}
          There {openMitigations === 1 ? "is" : "are"} <span className="text-slate-200 font-medium">{openMitigations} open mitigation action{openMitigations === 1 ? "" : "s"}</span>
          {overdue > 0 && <span>, including <span className="text-amber-400 font-medium">{overdue} overdue</span></span>}. Review the risk heatmap for a full probability × impact view.
        </p>
      </motion.div>
    </div>;
}
export {
  Dashboard as default
};
