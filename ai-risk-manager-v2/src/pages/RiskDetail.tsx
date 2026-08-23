import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle2, Clock, FileSearch, UserCog } from "lucide-react";
import { useRiskStore } from "../context/RiskStoreContext";
import { SeverityBadge, StatusBadge, PriorityBadge } from "../components/Badges";
import type { RiskStatus } from "../types";

const STATUSES: RiskStatus[] = ["New", "Under Review", "Mitigating", "Monitoring", "Resolved"];

export default function RiskDetail() {
  const { id } = useParams();
  const { risks, updateRiskStatus, assignOwner } = useRiskStore();
  const risk = risks.find((r) => r.id === id);
  const [ownerInput, setOwnerInput] = useState("");
  const [editingOwner, setEditingOwner] = useState(false);

  if (!risk) return <Navigate to="/app/risks" replace />;

  function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    if (!ownerInput.trim()) return;
    assignOwner(risk!.id, ownerInput.trim());
    setOwnerInput("");
    setEditingOwner(false);
  }

  return (
    <div className="space-y-6">
      <Link to="/app/risks" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300">
        <ArrowLeft size={15} /> Back to Risks
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono text-slate-500">{risk.id}</span>
              <SeverityBadge severity={risk.severity} />
              <StatusBadge status={risk.status} />
            </div>
            <h1 className="font-display text-2xl font-semibold mb-1">{risk.title}</h1>
            <p className="text-sm text-slate-500">{risk.category} · Owner: {risk.owner}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-slate-500 uppercase font-mono mb-1">Risk Score</p>
            <p className="font-display text-4xl font-semibold text-teal-300">{risk.score}<span className="text-lg text-slate-500">/100</span></p>
          </div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mt-6">{risk.description}</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 border border-teal-500/20 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal-500/10 blur-3xl rounded-full" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-teal-400" />
                <h3 className="font-display font-semibold">AI Risk Assessment</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">AI-generated risk assessment — review required.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Score</p>
                  <p className="text-sm text-slate-200 font-medium">{risk.score}/100</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Probability</p>
                  <p className="text-sm text-slate-200 font-medium">{risk.probability}</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Impact</p>
                  <p className="text-sm text-slate-200 font-medium">{risk.impact}</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Confidence</p>
                  <p className="text-sm text-slate-200 font-medium">{risk.aiInsight.confidence}%</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{risk.aiInsight.summary}</p>
              <div className="mb-4">
                <p className="text-xs text-slate-500 uppercase font-mono mb-2">Why This Matters</p>
                <p className="text-sm text-slate-400 leading-relaxed">{risk.aiInsight.whyItMatters}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-mono mb-2">Key Indicators</p>
                <ul className="space-y-1.5">
                  {risk.aiInsight.keyIndicators.map((k, i) => (
                    <li key={i} className="text-sm text-slate-300 flex gap-2"><span className="text-teal-400 mt-0.5">•</span> {k}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <FileSearch size={16} className="text-blue-400" />
              <h3 className="font-display font-semibold">Evidence</h3>
            </div>
            <ul className="space-y-2">
              {risk.evidence.map((e, i) => (
                <li key={i} className="text-sm text-slate-300 bg-white/[0.03] rounded-lg px-3 py-2">{e}</li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-3">Contributing Factors</h3>
            <ul className="space-y-1.5">
              {risk.contributingFactors.map((f, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2"><span className="text-amber-400 mt-0.5">•</span> {f}</li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-2">Potential Impact</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{risk.potentialImpact}</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-3">Recommended Actions</h3>
            <ul className="space-y-2">
              {risk.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" /> {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-3">Mitigation Plan</h3>
            {risk.mitigationActions.length === 0 && <p className="text-sm text-slate-500">No mitigation actions logged yet.</p>}
            <div className="space-y-3">
              {risk.mitigationActions.map((m) => (
                <div key={m.id} className="bg-white/[0.03] rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm text-slate-200 font-medium">{m.action}</p>
                    <PriorityBadge priority={m.priority} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                    <span>Owner: {m.owner}</span>
                    <span>Due: {new Date(m.dueDate).toLocaleDateString()}</span>
                    <StatusBadge status={m.status} />
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-blue-500" style={{ width: `${m.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Link to="/app/mitigation" className="inline-block mt-4 text-xs text-teal-400 hover:text-teal-300">Manage all mitigation actions →</Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4">Update Status</h3>
            <div className="space-y-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  disabled={s === risk.status}
                  onClick={() => updateRiskStatus(risk.id, s)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm border transition-colors ${
                    s === risk.status ? "border-teal-500/30 bg-teal-500/10 text-teal-300" : "border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  } disabled:cursor-default`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <UserCog size={16} className="text-indigo-400" />
              <h3 className="font-display font-semibold">Risk Owner</h3>
            </div>
            <p className="text-sm text-slate-300 mb-3">{risk.owner}</p>
            {editingOwner ? (
              <form onSubmit={handleAssign} className="flex gap-2">
                <input
                  autoFocus
                  value={ownerInput}
                  onChange={(e) => setOwnerInput(e.target.value)}
                  placeholder="New owner name"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                />
                <button type="submit" className="px-3 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs font-medium">Save</button>
              </form>
            ) : (
              <button onClick={() => setEditingOwner(true)} className="text-xs text-teal-400 hover:text-teal-300">Reassign owner</button>
            )}
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4">Timeline</h3>
            <div className="space-y-3">
              {risk.timeline
                .slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((h) => (
                  <div key={h.id} className="flex gap-3 text-sm">
                    <Clock size={14} className="text-slate-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-slate-300">{h.event}</p>
                      <p className="text-xs text-slate-600">{new Date(h.date).toLocaleString()} · {h.actor}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 text-sm text-slate-400 space-y-2">
            <div className="flex justify-between"><span>Created</span><span className="text-slate-300">{new Date(risk.createdAt).toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span>Last Updated</span><span className="text-slate-300">{new Date(risk.updatedAt).toLocaleDateString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
