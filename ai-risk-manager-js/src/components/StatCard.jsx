import { motion } from "framer-motion";
const ACCENTS = {
  teal: "from-teal-500/20 to-teal-500/5 text-teal-300 border-teal-500/20",
  blue: "from-blue-500/20 to-blue-500/5 text-blue-300 border-blue-500/20",
  red: "from-red-500/20 to-red-500/5 text-red-300 border-red-500/20",
  amber: "from-amber-500/20 to-amber-500/5 text-amber-300 border-amber-500/20",
  emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-300 border-emerald-500/20",
  indigo: "from-indigo-500/20 to-indigo-500/5 text-indigo-300 border-indigo-500/20"
};
function StatCard({
  label,
  value,
  suffix = "",
  icon: Icon,
  accent = "teal",
  delay = 0
}) {
  return <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3 }}
    className="glass rounded-2xl p-5"
  >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-mono">{label}</p>
        {Icon && <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ACCENTS[accent]} border flex items-center justify-center`}>
            <Icon size={15} />
          </div>}
      </div>
      <p className="font-display text-3xl font-semibold text-slate-100">
        {value}
        {suffix}
      </p>
    </motion.div>;
}
export {
  StatCard as default
};
