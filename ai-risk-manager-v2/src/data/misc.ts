import type { Notification, ManagedUser } from "../types";

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Critical risk detected", message: "Third-Party Data Exposure was escalated to Critical severity.", severity: "critical", isRead: false, createdAt: "2026-08-21T16:40:00Z", riskId: "RSK-1001" },
  { id: "n2", title: "Risk score increased", message: "Cloud Configuration Risk score increased from 61 to 78.", severity: "warning", isRead: false, createdAt: "2026-08-20T10:15:00Z", riskId: "RSK-1002" },
  { id: "n3", title: "Mitigation action overdue", message: "\"Split create/approve permissions\" for Financial Control Risk is now overdue.", severity: "warning", isRead: false, createdAt: "2026-08-19T18:00:00Z", riskId: "RSK-1010" },
  { id: "n4", title: "New critical risk detected", message: "AI Risk Engine flagged a new potential critical risk pending review.", severity: "critical", isRead: true, createdAt: "2026-08-19T09:00:00Z" },
  { id: "n5", title: "Mitigation completed", message: "Credential rotation for Third-Party Data Exposure was completed.", severity: "info", isRead: true, createdAt: "2026-08-21T16:00:00Z", riskId: "RSK-1001" },
  { id: "n6", title: "Risk resolved", message: "A previously monitored Low severity risk was marked Resolved.", severity: "info", isRead: true, createdAt: "2026-08-17T12:00:00Z" },
  { id: "n7", title: "Emerging risk pattern detected", message: "AI identified a cluster of access anomalies that may indicate an emerging risk.", severity: "warning", isRead: true, createdAt: "2026-08-16T08:30:00Z" },
];

export const USERS: ManagedUser[] = [
  { id: "u1", name: "Riley Chen", email: "risk@demo.com", role: "analyst", status: "Active" },
  { id: "u2", name: "Morgan Blake", email: "manager@demo.com", role: "manager", status: "Active" },
  { id: "u3", name: "Admin User", email: "admin@demo.com", role: "admin", status: "Active" },
  { id: "u4", name: "Priya Nair", email: "priya.nair@company.com", role: "analyst", status: "Active" },
  { id: "u5", name: "David Kim", email: "david.kim@company.com", role: "analyst", status: "Active" },
  { id: "u6", name: "Sofia Ramirez", email: "sofia.ramirez@company.com", role: "analyst", status: "Active" },
  { id: "u7", name: "James Whitfield", email: "james.whitfield@company.com", role: "manager", status: "Active" },
  { id: "u8", name: "Elena Rossi", email: "elena.rossi@company.com", role: "analyst", status: "Invited" },
];
