import { Link } from "react-router-dom";
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, BellOff } from "lucide-react";
import { useRiskStore } from "../context/RiskStoreContext";
const SEVERITY_CFG = {
  critical: { icon: ShieldAlert, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  warning: { icon: AlertTriangle, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  info: { icon: Info, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" }
};
function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useRiskStore();
  const unread = notifications.filter((n) => !n.isRead).length;
  const sorted = [...notifications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold flex items-center gap-3">
            Notifications
            {unread > 0 && <span className="text-xs font-mono bg-red-500 text-white rounded-full px-2.5 py-1">{unread} unread</span>}
          </h1>
          <p className="text-sm text-slate-500 mt-1">Alerts for escalations, score changes, and overdue actions.</p>
        </div>
        {unread > 0 && <button onClick={markAllNotificationsRead} className="text-sm px-4 py-2 rounded-xl glass text-teal-300 hover:bg-white/10 transition-colors">
            Mark all as read
          </button>}
      </div>

      <div className="space-y-3">
        {sorted.length === 0 && <div className="glass rounded-2xl p-16 text-center">
            <BellOff size={32} className="mx-auto text-slate-700 mb-3" />
            <p className="text-slate-500 text-sm">No notifications yet.</p>
          </div>}
        {sorted.map((n) => {
    const cfg = SEVERITY_CFG[n.severity];
    const Icon = cfg.icon;
    return <div key={n.id} className={`glass rounded-2xl p-5 flex items-start gap-4 transition-colors ${!n.isRead ? "border-teal-500/20 bg-teal-500/[0.03]" : ""}`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${cfg.color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-200">{n.title}</p>
                  {!n.isRead && <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-1.5" />}
                </div>
                <p className="text-sm text-slate-500 mt-1">{n.message}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-slate-600">{new Date(n.createdAt).toLocaleString()}</span>
                  {n.riskId && <Link to={`/app/risks/${n.riskId}`} className="text-xs text-teal-400 hover:text-teal-300 font-medium">View Risk</Link>}
                  {!n.isRead && <button onClick={() => markNotificationRead(n.id)} className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Mark as read
                    </button>}
                </div>
              </div>
            </div>;
  })}
      </div>
    </div>;
}
export {
  Notifications as default
};
