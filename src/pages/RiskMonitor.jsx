import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, ShieldAlert, CheckCircle2, Sparkles } from "lucide-react";
import { useRiskStore } from "../context/RiskStoreContext";
import { SeverityBadge } from "../components/Badges";
function RiskMonitor() {
  const { risks } = useRiskStore();
  const newRisks = risks.filter((r) => r.status === "New");
  const escalated = risks.filter((r) => r.severity === "Critical" || r.severity === "High");
  const resolved = risks.filter((r) => r.status === "Resolved");
  const emerging = risks.filter((r) => r.confidence < 80 && r.status !== "Resolved");
  const events = [
    { id: "e1", text: `Risk score increased from 61 \u2192 78 on "Cloud Configuration Risk"`, icon: TrendingUp, tone: "text-amber-400" },
    { id: "e2", text: `New critical risk detected: "${risks.find((r) => r.severity === "Critical")?.title || "Third-Party Data Exposure"}"`, icon: ShieldAlert, tone: "text-red-400" },
    { id: "e3", text: `Mitigation action overdue for "Financial Control Risk"`, icon: TrendingDown, tone: "text-amber-400" },
    { id: "e4", text: `AI identified an emerging risk pattern in access anomalies`, icon: Sparkles, tone: "text-teal-400" }
  ];
  return <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Risk Monitor</h1>
        <p className="text-sm text-slate-500 mt-1">Live view of new, escalated, resolved, and emerging risks.</p>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Live Signal Feed</h3>
        <div className="space-y-3">
          {events.map((e) => <div key={e.id} className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
              <e.icon size={16} className={`${e.tone} mt-0.5 shrink-0`} />
              <p className="text-sm text-slate-300">{e.text}</p>
            </div>)}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4">New Risks ({newRisks.length})</h3>
          <div className="space-y-2">
            {newRisks.length === 0 && <p className="text-sm text-slate-500">No new risks right now.</p>}
            {newRisks.map((r) => <Link key={r.id} to={`/app/risks/${r.id}`} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <span className="text-sm text-slate-200">{r.title}</span>
                <SeverityBadge severity={r.severity} />
              </Link>)}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4">Escalated Risks ({escalated.length})</h3>
          <div className="space-y-2">
            {escalated.map((r) => <Link key={r.id} to={`/app/risks/${r.id}`} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <span className="text-sm text-slate-200">{r.title}</span>
                <span className="text-xs font-mono text-slate-500">Score {r.score}</span>
              </Link>)}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" /> Resolved Risks ({resolved.length})
          </h3>
          <div className="space-y-2">
            {resolved.length === 0 && <p className="text-sm text-slate-500">No risks resolved yet.</p>}
            {resolved.map((r) => <Link key={r.id} to={`/app/risks/${r.id}`} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <span className="text-sm text-slate-200">{r.title}</span>
              </Link>)}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-teal-400" /> Emerging Risks ({emerging.length})
          </h3>
          <div className="space-y-2">
            {emerging.map((r) => <Link key={r.id} to={`/app/risks/${r.id}`} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <span className="text-sm text-slate-200">{r.title}</span>
                <span className="text-xs font-mono text-slate-500">{r.confidence}% confidence</span>
              </Link>)}
          </div>
        </div>
      </div>
    </div>;
}
export {
  RiskMonitor as default
};
