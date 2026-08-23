import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
function IntroAnimation({ onDone }) {
  return <motion.div
    className="fixed inset-0 z-[200] bg-[#060a16] flex items-center justify-center noise-radial"
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
    onAnimationComplete={() => {
    }}
  >
      <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    onAnimationComplete={() => {
      setTimeout(onDone, 850);
    }}
  >
        <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="relative mb-6"
  >
          <ShieldCheck className="text-teal-400" size={44} strokeWidth={1.5} />
          <motion.div
    className="absolute inset-0 blur-2xl bg-teal-400/50 rounded-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.9, 0.4] }}
    transition={{ duration: 1.4, ease: "easeOut" }}
  />
        </motion.div>
        <motion.h1
    initial={{ opacity: 0, y: 14, letterSpacing: "0.15em" }}
    animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
    transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    className="font-display text-3xl sm:text-4xl font-semibold text-slate-100"
  >
          AI Risk Manager
        </motion.h1>
        <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.7, delay: 0.55 }}
    className="mt-3 text-xs sm:text-sm text-slate-500 font-mono uppercase tracking-[0.25em]"
  >
          Risk Intelligence, Illuminated
        </motion.p>
      </motion.div>
    </motion.div>;
}
export {
  IntroAnimation as default
};
