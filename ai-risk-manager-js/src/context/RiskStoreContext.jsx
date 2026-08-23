import { createContext, useContext, useEffect, useState } from "react";
import { RISKS as SEED_RISKS } from "../data/risks";
import { NOTIFICATIONS as SEED_NOTIFICATIONS } from "../data/misc";
const RISKS_KEY = "arm_risks";
const NOTIFS_KEY = "arm_notifications";
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
const StoreContext = createContext(null);
function RiskStoreProvider({ children }) {
  const [risks, setRisks] = useState(() => load(RISKS_KEY, SEED_RISKS));
  const [notifications, setNotifications] = useState(() => load(NOTIFS_KEY, SEED_NOTIFICATIONS));
  useEffect(() => localStorage.setItem(RISKS_KEY, JSON.stringify(risks)), [risks]);
  useEffect(() => localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifications)), [notifications]);
  function updateRiskStatus(id, status) {
    setRisks(
      (prev) => prev.map(
        (r) => r.id === id ? {
          ...r,
          status,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          timeline: [...r.timeline, { id: `t${Date.now()}`, date: (/* @__PURE__ */ new Date()).toISOString(), event: `Status changed to ${status}`, actor: "You" }]
        } : r
      )
    );
  }
  function updateMitigationStatus(riskId, actionId, status, progress) {
    setRisks(
      (prev) => prev.map(
        (r) => r.id === riskId ? {
          ...r,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          mitigationActions: r.mitigationActions.map(
            (a) => a.id === actionId ? { ...a, status, progress: progress ?? (status === "Completed" ? 100 : a.progress) } : a
          ),
          timeline: [...r.timeline, { id: `t${Date.now()}`, date: (/* @__PURE__ */ new Date()).toISOString(), event: `Mitigation action updated to ${status}`, actor: "You" }]
        } : r
      )
    );
  }
  function addMitigationAction(riskId, action) {
    setRisks(
      (prev) => prev.map(
        (r) => r.id === riskId ? {
          ...r,
          mitigationActions: [
            ...r.mitigationActions,
            {
              id: `m${Date.now()}`,
              action: action.action,
              owner: action.owner || "Unassigned",
              priority: action.priority || "Medium",
              dueDate: action.dueDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              status: "Not Started",
              progress: 0
            }
          ],
          timeline: [...r.timeline, { id: `t${Date.now()}`, date: (/* @__PURE__ */ new Date()).toISOString(), event: `New mitigation action added: ${action.action}`, actor: "You" }]
        } : r
      )
    );
  }
  function assignOwner(riskId, owner) {
    setRisks(
      (prev) => prev.map(
        (r) => r.id === riskId ? {
          ...r,
          owner,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          timeline: [...r.timeline, { id: `t${Date.now()}`, date: (/* @__PURE__ */ new Date()).toISOString(), event: `Ownership assigned to ${owner}`, actor: "You" }]
        } : r
      )
    );
  }
  function markNotificationRead(id) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  }
  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }
  function createRisk(partial) {
    const id = `RSK-${1e3 + risks.length + 1}`;
    const probability = partial.probability || "Medium";
    const impact = partial.impact || "Medium";
    const map = { Low: 1, Medium: 2, High: 3, Critical: 4 };
    const scoreVal = Math.round(map[probability] * map[impact] / 16 * 100);
    const severity = scoreVal >= 80 ? "Critical" : scoreVal >= 60 ? "High" : scoreVal >= 35 ? "Medium" : "Low";
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newRisk = {
      id,
      title: partial.title,
      category: partial.category,
      description: partial.description,
      probability,
      impact,
      severity,
      score: scoreVal,
      confidence: 70,
      status: "New",
      owner: partial.owner || "Unassigned",
      createdAt: now,
      updatedAt: now,
      evidence: partial.evidence || [],
      aiInsight: {
        summary: "This risk was manually logged and is pending AI enrichment.",
        whyItMatters: "Manual entry \u2014 review required to confirm impact and urgency.",
        keyIndicators: [],
        confidence: 70
      },
      recommendations: partial.recommendations || ["Review and enrich this risk with supporting evidence"],
      contributingFactors: partial.contributingFactors || [],
      potentialImpact: partial.potentialImpact || "Pending assessment.",
      mitigationActions: [],
      timeline: [{ id: `t${Date.now()}`, date: now, event: "Risk manually created", actor: "You" }]
    };
    setRisks((prev) => [newRisk, ...prev]);
    return newRisk;
  }
  return <StoreContext.Provider
    value={{
      risks,
      notifications,
      updateRiskStatus,
      updateMitigationStatus,
      addMitigationAction,
      assignOwner,
      markNotificationRead,
      markAllNotificationsRead,
      createRisk
    }}
  >
      {children}
    </StoreContext.Provider>;
}
function useRiskStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useRiskStore must be used within RiskStoreProvider");
  return ctx;
}
export {
  RiskStoreProvider,
  useRiskStore
};
