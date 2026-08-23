import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Risk, Notification, MitigationStatus, RiskStatus } from "../types";
import { RISKS as SEED_RISKS } from "../data/risks";
import { NOTIFICATIONS as SEED_NOTIFICATIONS } from "../data/misc";

const RISKS_KEY = "arm_risks";
const NOTIFS_KEY = "arm_notifications";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

interface StoreValue {
  risks: Risk[];
  notifications: Notification[];
  updateRiskStatus: (id: string, status: RiskStatus) => void;
  updateMitigationStatus: (riskId: string, actionId: string, status: MitigationStatus, progress?: number) => void;
  addMitigationAction: (riskId: string, action: { action: string; owner: string; priority: string; dueDate: string }) => void;
  assignOwner: (riskId: string, owner: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  createRisk: (partial: Partial<Risk> & { title: string; category: string; description: string }) => Risk;
}

const StoreContext = createContext<StoreValue | null>(null);

export function RiskStoreProvider({ children }: { children: ReactNode }) {
  const [risks, setRisks] = useState<Risk[]>(() => load(RISKS_KEY, SEED_RISKS));
  const [notifications, setNotifications] = useState<Notification[]>(() => load(NOTIFS_KEY, SEED_NOTIFICATIONS));

  useEffect(() => localStorage.setItem(RISKS_KEY, JSON.stringify(risks)), [risks]);
  useEffect(() => localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifications)), [notifications]);

  function updateRiskStatus(id: string, status: RiskStatus) {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              updatedAt: new Date().toISOString(),
              timeline: [...r.timeline, { id: `t${Date.now()}`, date: new Date().toISOString(), event: `Status changed to ${status}`, actor: "You" }],
            }
          : r
      )
    );
  }

  function updateMitigationStatus(riskId: string, actionId: string, status: MitigationStatus, progress?: number) {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === riskId
          ? {
              ...r,
              updatedAt: new Date().toISOString(),
              mitigationActions: r.mitigationActions.map((a) =>
                a.id === actionId ? { ...a, status, progress: progress ?? (status === "Completed" ? 100 : a.progress) } : a
              ),
              timeline: [...r.timeline, { id: `t${Date.now()}`, date: new Date().toISOString(), event: `Mitigation action updated to ${status}`, actor: "You" }],
            }
          : r
      )
    );
  }

  function addMitigationAction(riskId: string, action: { action: string; owner: string; priority: string; dueDate: string }) {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === riskId
          ? {
              ...r,
              mitigationActions: [
                ...r.mitigationActions,
                {
                  id: `m${Date.now()}`,
                  action: action.action,
                  owner: action.owner || "Unassigned",
                  priority: (action.priority as any) || "Medium",
                  dueDate: action.dueDate || new Date().toISOString().slice(0, 10),
                  status: "Not Started" as MitigationStatus,
                  progress: 0,
                },
              ],
              timeline: [...r.timeline, { id: `t${Date.now()}`, date: new Date().toISOString(), event: `New mitigation action added: ${action.action}`, actor: "You" }],
            }
          : r
      )
    );
  }

  function assignOwner(riskId: string, owner: string) {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === riskId
          ? {
              ...r,
              owner,
              updatedAt: new Date().toISOString(),
              timeline: [...r.timeline, { id: `t${Date.now()}`, date: new Date().toISOString(), event: `Ownership assigned to ${owner}`, actor: "You" }],
            }
          : r
      )
    );
  }

  function markNotificationRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  function createRisk(partial: Partial<Risk> & { title: string; category: string; description: string }): Risk {
    const id = `RSK-${1000 + risks.length + 1}`;
    const probability = (partial.probability as any) || "Medium";
    const impact = (partial.impact as any) || "Medium";
    const map: Record<string, number> = { Low: 1, Medium: 2, High: 3, Critical: 4 };
    const scoreVal = Math.round(((map[probability] * map[impact]) / 16) * 100);
    const severity = scoreVal >= 80 ? "Critical" : scoreVal >= 60 ? "High" : scoreVal >= 35 ? "Medium" : "Low";
    const now = new Date().toISOString();
    const newRisk: Risk = {
      id,
      title: partial.title,
      category: partial.category,
      description: partial.description,
      probability,
      impact,
      severity: severity as any,
      score: scoreVal,
      confidence: 70,
      status: "New",
      owner: partial.owner || "Unassigned",
      createdAt: now,
      updatedAt: now,
      evidence: partial.evidence || [],
      aiInsight: {
        summary: "This risk was manually logged and is pending AI enrichment.",
        whyItMatters: "Manual entry — review required to confirm impact and urgency.",
        keyIndicators: [],
        confidence: 70,
      },
      recommendations: partial.recommendations || ["Review and enrich this risk with supporting evidence"],
      contributingFactors: partial.contributingFactors || [],
      potentialImpact: partial.potentialImpact || "Pending assessment.",
      mitigationActions: [],
      timeline: [{ id: `t${Date.now()}`, date: now, event: "Risk manually created", actor: "You" }],
    };
    setRisks((prev) => [newRisk, ...prev]);
    return newRisk;
  }

  return (
    <StoreContext.Provider
      value={{
        risks,
        notifications,
        updateRiskStatus,
        updateMitigationStatus,
        addMitigationAction,
        assignOwner,
        markNotificationRead,
        markAllNotificationsRead,
        createRisk,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useRiskStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useRiskStore must be used within RiskStoreProvider");
  return ctx;
}
