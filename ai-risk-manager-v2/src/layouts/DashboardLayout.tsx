import { type ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ListChecks,
  Grid3x3,
  Activity,
  FileSearch,
  ClipboardList,
  Bell,
  Settings as SettingsIcon,
  Users,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRiskStore } from "../context/RiskStoreContext";

const NAV_BY_ROLE: Record<string, Array<{ to: string; label: string; icon: any }>> = {
  analyst: [
    { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/risks", label: "Risks", icon: ListChecks },
    { to: "/app/heatmap", label: "Risk Heatmap", icon: Grid3x3 },
    { to: "/app/monitor", label: "Risk Monitor", icon: Activity },
    { to: "/app/evidence", label: "Evidence", icon: FileSearch },
    { to: "/app/mitigation", label: "Mitigation", icon: ClipboardList },
    { to: "/app/notifications", label: "Notifications", icon: Bell },
    { to: "/app/settings", label: "Settings", icon: SettingsIcon },
  ],
  manager: [
    { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/risks", label: "Risks", icon: ListChecks },
    { to: "/app/heatmap", label: "Risk Heatmap", icon: Grid3x3 },
    { to: "/app/monitor", label: "Risk Monitor", icon: Activity },
    { to: "/app/mitigation", label: "Mitigation", icon: ClipboardList },
    { to: "/app/notifications", label: "Notifications", icon: Bell },
    { to: "/app/settings", label: "Settings", icon: SettingsIcon },
  ],
  admin: [
    { to: "/app/dashboard", label: "Admin Overview", icon: LayoutDashboard },
    { to: "/app/risks", label: "Risks", icon: ListChecks },
    { to: "/app/users", label: "User Management", icon: Users },
    { to: "/app/notifications", label: "Notifications", icon: Bell },
    { to: "/app/settings", label: "Settings", icon: SettingsIcon },
  ],
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { notifications } = useRiskStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const unread = notifications.filter((n) => !n.isRead).length;
  const items = NAV_BY_ROLE[user?.role || "analyst"];

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#060a16] noise-radial grid-bg flex">
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 glass-strong flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-teal-400" size={22} />
          <span className="font-display font-semibold">AI Risk Manager</span>
        </div>
        <button onClick={() => setMobileOpen((o) => !o)} className="text-slate-300">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 glass-strong border-r border-white/5 flex flex-col z-30 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="px-6 py-6 flex items-center gap-2 border-b border-white/5">
          <div className="relative">
            <ShieldCheck className="text-teal-400" size={24} />
            <div className="absolute inset-0 blur-md bg-teal-400/40 rounded-full" />
          </div>
          <span className="font-display font-semibold text-base tracking-tight">AI Risk Manager</span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                `flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500/15 to-blue-500/10 text-teal-300 border border-teal-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                }`
              }
            >
              <span className="flex items-center gap-3">
                <Icon size={17} />
                {label}
              </span>
              {label === "Notifications" && unread > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {unread}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-indigo-500 flex items-center justify-center text-sm font-semibold shrink-0">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-200 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setMobileOpen(false)} />}

      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-4 md:px-8 py-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
