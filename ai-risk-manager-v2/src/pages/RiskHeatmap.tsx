import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRiskStore } from "../context/RiskStoreContext";

const LEVELS = ["Low", "Medium", "High", "Critical"];

function cellColor(pIdx: number, iIdx: number) {
  const total = pIdx + iIdx;
  if (total >= 5) return "bg-red-500/25 border-red-500/40 hover:bg-red-500/35";
  if (total >= 3) return "bg-amber-500/20 border-amber-500/35 hover:bg-amber-500/30";
  if (total >= 1) return "bg-blue-500/15 border-blue-500/30 hover:bg-blue-500/25";
  return "bg-emerald-500/15 border-emerald-500/30 hover:bg-emerald-500/25";
}

export default function RiskHeatmap() {
  const { risks } = useRiskStore();
  const navigate = useNavigate();
  const [selectedCell, setSelectedCell] = useState<{ p: string; i: string } | null>(null);

  const grid = LEVELS.slice().reverse().map((p) =>
    LEVELS.map((i) => ({
      probability: p,
      impact: i,
      risks: risks.filter((r) => r.probability === p && r.impact === i),
    }))
  );

  const cellRisks = selectedCell ? risks.filter((r) => r.probability === selectedCell.p && r.impact === selectedCell.i) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Risk Heatmap</h1>
        <p className="text-sm text-slate-500 mt-1">Interactive probability × impact matrix. Click a cell to see the risks inside it.</p>
      </div>

      <div className="glass rounded-2xl p-6 overflow-x-auto">
        <div className="min-w-[560px]">
          <div className="flex">
            <div className="w-28 shrink-0" />
            <div className="flex-1 grid grid-cols-4 gap-2 mb-2">
              {LEVELS.map((i) => (
                <div key={i} className="text-center text-xs text-slate-500 font-mono uppercase">{i} Impact</div>
              ))}
            </div>
          </div>
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex items-stretch gap-2 mb-2">
              <div className="w-28 shrink-0 flex items-center justify-end pr-3 text-xs text-slate-500 font-mono uppercase">
                {row[0].probability} Prob.
              </div>
              <div className="flex-1 grid grid-cols-4 gap-2">
                {row.map((cell, cIdx) => {
                  const pIdx = LEVELS.indexOf(cell.probability);
                  const iIdx = LEVELS.indexOf(cell.impact);
                  return (
                    <motion.button
                      key={cIdx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedCell({ p: cell.probability, i: cell.impact })}
                      className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-colors ${cellColor(pIdx, iIdx)}`}
                    >
                      <span className="font-display text-xl font-semibold text-slate-100">{cell.risks.length}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">risk{cell.risks.length === 1 ? "" : "s"}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 mt-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/40" /> Low</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/40" /> Medium</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/40" /> High</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/40" /> Critical</span>
        </div>
      </div>

      {selectedCell && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4">
            {selectedCell.p} Probability × {selectedCell.i} Impact ({cellRisks.length})
          </h3>
          {cellRisks.length === 0 && <p className="text-sm text-slate-500">No risks currently fall in this cell.</p>}
          <div className="space-y-2">
            {cellRisks.map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(`/app/risks/${r.id}`)}
                className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
              >
                <div>
                  <p className="text-sm text-slate-200">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.category} · Score {r.score}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
