const SEVERITY_STYLES = {
  Critical: "bg-red-500/15 text-red-400 border-red-500/30",
  High: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Medium: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
};
const STATUS_STYLES = {
  New: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  "Under Review": "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Mitigating: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Monitoring: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Not Started": "bg-slate-500/15 text-slate-400 border-slate-500/30",
  "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Blocked: "bg-red-500/15 text-red-400 border-red-500/30",
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
};
const PRIORITY_STYLES = {
  Urgent: "bg-red-500/15 text-red-400 border-red-500/30",
  High: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Medium: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Low: "bg-slate-500/15 text-slate-400 border-slate-500/30"
};
function SeverityBadge({ severity, className = "" }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${SEVERITY_STYLES[severity] || SEVERITY_STYLES.Low} ${className}`}>
      {severity}
    </span>;
}
function StatusBadge({ status, className = "" }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[status] || STATUS_STYLES.New} ${className}`}>
      {status}
    </span>;
}
function PriorityBadge({ priority, className = "" }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.Medium} ${className}`}>
      {priority}
    </span>;
}
export {
  PriorityBadge,
  SeverityBadge,
  StatusBadge
};
