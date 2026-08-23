import { Link } from "react-router-dom";
import { FileSearch } from "lucide-react";
import { useRiskStore } from "../context/RiskStoreContext";
import { SeverityBadge } from "../components/Badges";
function Evidence() {
  const { risks } = useRiskStore();
  return <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Evidence</h1>
        <p className="text-sm text-slate-500 mt-1">Supporting evidence behind every AI-flagged risk.</p>
      </div>

      <div className="space-y-4">
        {risks.map((r) => <div key={r.id} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <Link to={`/app/risks/${r.id}`} className="flex items-center gap-2 hover:text-teal-300">
                <FileSearch size={16} className="text-blue-400" />
                <h3 className="font-display font-semibold">{r.title}</h3>
              </Link>
              <SeverityBadge severity={r.severity} />
            </div>
            <ul className="space-y-2">
              {r.evidence.map((e, i) => <li key={i} className="text-sm text-slate-300 bg-white/[0.03] rounded-lg px-3 py-2">{e}</li>)}
            </ul>
          </div>)}
      </div>
    </div>;
}
export {
  Evidence as default
};
