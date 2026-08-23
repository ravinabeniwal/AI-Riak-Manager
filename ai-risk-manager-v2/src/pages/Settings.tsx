import { useState } from "react";
import { Printer, Download } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRiskStore } from "../context/RiskStoreContext";

export default function Settings() {
  const { user } = useAuth();
  const { risks } = useRiskStore();
  const [threshold, setThreshold] = useState(70);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleExport() {
    const data = JSON.stringify(risks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "risk-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your profile, alert thresholds, and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="glass rounded-2xl p-6 space-y-5">
        <h3 className="font-display font-semibold">Profile</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Name</label>
            <input disabled value={user?.name} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-400" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Role</label>
            <input disabled value={user?.role} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-400 capitalize" />
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm text-slate-400 mb-1.5">
            <span>Risk Alert Threshold</span>
            <span className="font-mono text-teal-300">{threshold}/100</span>
          </label>
          <input type="range" min="0" max="100" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="w-full" />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-slate-400">Notification Preferences</p>
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} className="rounded border-white/20 bg-white/5 text-teal-500" />
            Email notifications for new risk alerts
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" checked={criticalOnly} onChange={(e) => setCriticalOnly(e.target.checked)} className="rounded border-white/20 bg-white/5 text-teal-500" />
            Only notify me for Critical-level risks
          </label>
        </div>

        <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(45,212,191,0.35)] transition-shadow">
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </form>

      <div className="glass rounded-2xl p-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display font-semibold mb-1">Export &amp; Print</h3>
          <p className="text-sm text-slate-500">Export your current risk data or print a summary view.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-slate-200 text-sm font-medium hover:bg-white/10 transition-colors">
            <Download size={15} /> Export JSON
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-slate-200 text-sm font-medium hover:bg-white/10 transition-colors">
            <Printer size={15} /> Print
          </button>
        </div>
      </div>
    </div>
  );
}
