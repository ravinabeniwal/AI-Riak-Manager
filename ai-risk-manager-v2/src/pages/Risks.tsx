import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, X } from "lucide-react";
import { useRiskStore } from "../context/RiskStoreContext";
import { SeverityBadge, StatusBadge } from "../components/Badges";
import type { Likelihood } from "../types";

const SEVERITIES = ["Critical", "High", "Medium", "Low"];
const STATUSES = ["New", "Under Review", "Mitigating", "Monitoring", "Resolved"];

export default function Risks() {
  const { risks, createRisk } = useRiskStore();
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("score_desc");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", description: "", probability: "Medium" as Likelihood, impact: "Medium" as Likelihood, owner: "" });

  const filtered = useMemo(() => {
    let list = risks.filter((r) => {
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.category.toLowerCase().includes(search.toLowerCase())) return false;
      if (severity && r.severity !== severity) return false;
      if (status && r.status !== status) return false;
      return true;
    });
    list = list.slice().sort((a, b) => {
      if (sort === "score_desc") return b.score - a.score;
      if (sort === "score_asc") return a.score - b.score;
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return list;
  }, [risks, search, severity, status, sort]);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.category || !form.description) return;
    const created = createRisk(form);
    setShowCreate(false);
    setForm({ title: "", category: "", description: "", probability: "Medium", impact: "Medium", owner: "" });
    window.location.href = `/app/risks/${created.id}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">Risks</h1>
          <p className="text-sm text-slate-500 mt-1">Search, filter, and track every identified risk.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(45,212,191,0.35)] transition-shadow"
        >
          <Plus size={16} /> New Risk
        </button>
      </div>

      <div className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search risks..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/40">
            <option value="">All Severities</option>
            {SEVERITIES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/40">
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/40">
            <option value="score_desc">Highest Score</option>
            <option value="score_asc">Lowest Score</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs text-slate-500 uppercase font-mono tracking-wide">
                <th className="px-5 py-3.5 font-medium">Risk</th>
                <th className="px-5 py-3.5 font-medium">Category</th>
                <th className="px-5 py-3.5 font-medium">Score</th>
                <th className="px-5 py-3.5 font-medium">Severity</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Owner</th>
                <th className="px-5 py-3.5 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-slate-600">No risks match your filters.</td></tr>
              )}
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                  <td className="px-5 py-3.5">
                    <Link to={`/app/risks/${r.id}`} className="text-slate-200 hover:text-teal-300 font-medium">{r.title}</Link>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">{r.category}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-300">{r.score}</td>
                  <td className="px-5 py-3.5"><SeverityBadge severity={r.severity} /></td>
                  <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                  <td className="px-5 py-3.5 text-slate-400">{r.owner}</td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">{new Date(r.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={() => setShowCreate(false)}>
          <div className="glass-strong rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg">Log a New Risk</h3>
              <button onClick={() => setShowCreate(false)} className="text-slate-500 hover:text-slate-300"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Title</label>
                <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/40" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Category</label>
                <input required value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/40" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Description</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/40" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Probability</label>
                  <select value={form.probability} onChange={(e) => setForm((f) => ({ ...f, probability: e.target.value as Likelihood }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200">
                    {["Low", "Medium", "High", "Critical"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Impact</label>
                  <select value={form.impact} onChange={(e) => setForm((f) => ({ ...f, impact: e.target.value as Likelihood }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200">
                    {["Low", "Medium", "High", "Critical"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Owner</label>
                <input value={form.owner} onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))} placeholder="Unassigned" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/40" />
              </div>
              <button type="submit" className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium">Create Risk</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
