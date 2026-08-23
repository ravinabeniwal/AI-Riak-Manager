import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { useRiskStore } from "../context/RiskStoreContext";
import { StatusBadge, PriorityBadge } from "../components/Badges";
import type { MitigationStatus } from "../types";

const STATUSES: MitigationStatus[] = ["Not Started", "In Progress", "Blocked", "Completed"];

export default function Mitigation() {
  const { risks, updateMitigationStatus, addMitigationAction } = useRiskStore();
  const [showAdd, setShowAdd] = useState<string | null>(null);
  const [form, setForm] = useState({ action: "", owner: "", priority: "Medium", dueDate: "" });

  function handleAdd(e: React.FormEvent, riskId: string) {
    e.preventDefault();
    if (!form.action) return;
    addMitigationAction(riskId, form);
    setForm({ action: "", owner: "", priority: "Medium", dueDate: "" });
    setShowAdd(null);
  }

  function cycleStatus(riskId: string, actionId: string, current: MitigationStatus) {
    const idx = STATUSES.indexOf(current);
    const next = STATUSES[(idx + 1) % STATUSES.length];
    updateMitigationStatus(riskId, actionId, next, next === "Completed" ? 100 : undefined);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Mitigation</h1>
        <p className="text-sm text-slate-500 mt-1">Track every mitigation action across your risk portfolio.</p>
      </div>

      <div className="space-y-4">
        {risks.map((r) => (
          <div key={r.id} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <Link to={`/app/risks/${r.id}`} className="font-display font-semibold hover:text-teal-300">{r.title}</Link>
              <button
                onClick={() => setShowAdd(showAdd === r.id ? null : r.id)}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass text-teal-300 hover:bg-white/10"
              >
                <Plus size={13} /> Add Action
              </button>
            </div>

            {showAdd === r.id && (
              <form onSubmit={(e) => handleAdd(e, r.id)} className="grid sm:grid-cols-2 gap-3 mb-4 bg-white/[0.03] rounded-xl p-4">
                <input required placeholder="Action description" value={form.action} onChange={(e) => setForm((f) => ({ ...f, action: e.target.value }))} className="sm:col-span-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200" />
                <input placeholder="Owner" value={form.owner} onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200" />
                <input type="date" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200" />
                <select value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200">
                  {["Low", "Medium", "High", "Urgent"].map((p) => <option key={p}>{p}</option>)}
                </select>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium">Save</button>
                  <button type="button" onClick={() => setShowAdd(null)} className="px-3 py-2 rounded-lg glass text-slate-300"><X size={14} /></button>
                </div>
              </form>
            )}

            {r.mitigationActions.length === 0 && <p className="text-sm text-slate-500">No mitigation actions yet.</p>}
            <div className="space-y-2">
              {r.mitigationActions.map((m) => (
                <div key={m.id} className="bg-white/[0.03] rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <p className="text-sm text-slate-200 font-medium">{m.action}</p>
                    <PriorityBadge priority={m.priority} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 flex-wrap">
                    <span>Owner: {m.owner}</span>
                    <span>Due: {new Date(m.dueDate).toLocaleDateString()}</span>
                    <button onClick={() => cycleStatus(r.id, m.id, m.status)}>
                      <StatusBadge status={m.status} className="cursor-pointer hover:opacity-80" />
                    </button>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all" style={{ width: `${m.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
