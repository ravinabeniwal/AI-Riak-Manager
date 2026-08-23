import { useState } from "react";
import { USERS as SEED_USERS } from "../data/misc";
const ROLE_COLORS = {
  analyst: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  manager: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  admin: "bg-teal-500/15 text-teal-400 border-teal-500/30"
};
const STATUS_COLORS = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Invited: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Disabled: "bg-slate-500/15 text-slate-400 border-slate-500/30"
};
function Users() {
  const [users, setUsers] = useState(SEED_USERS);
  function toggleStatus(id) {
    setUsers(
      (prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u)
    );
  }
  return <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">User Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage analysts, managers, and admin accounts.</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs text-slate-500 uppercase font-mono tracking-wide">
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Email</th>
                <th className="px-5 py-3.5 font-medium">Role</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                  <td className="px-5 py-3.5 text-slate-200 font-medium">{u.name}</td>
                  <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${ROLE_COLORS[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleStatus(u.id)} className="text-xs text-teal-400 hover:text-teal-300">
                      {u.status === "Active" ? "Disable" : "Activate"}
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
export {
  Users as default
};
