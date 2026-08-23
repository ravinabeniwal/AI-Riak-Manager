const SEVERITY_STYLES: Record<string, string> = {
  Critical: "bg-red-500/15 text-red-400 border-red-500/30",
  High: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Medium: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const STATUS_STYLES: Record<string, string> = {
  New: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  "Under Review": "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Mitigating: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Monitoring: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Not Started": "bg-slate-500/15 text-slate-400 border-slate-500/30",
  "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Blocked: "bg-red-500/15 text-red-400 border-red-500/30",
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const PRIORITY_STYLES: Record<string, string> = {
  Urgent: "bg-red-500/15 text-red-400 border-red-500/30",
  High: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Medium: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Low: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export function SeverityBadge({ severity, className = "" }: { severity: string; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${SEVERITY_STYLES[severity] || SEVERITY_STYLES.Low} ${className}`}>
      {severity}
    </span>
  );
}

export function StatusBadge({ status, className = "" }: { status: string; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[status] || STATUS_STYLES.New} ${className}`}>
      {status}
    </span>
  );
}

export function PriorityBadge({ priority, className = "" }: { priority: string; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.Medium} ${className}`}>
      {priority}
    </span>
  );
}
