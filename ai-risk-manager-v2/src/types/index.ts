export type Role = "analyst" | "manager" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type Severity = "Low" | "Medium" | "High" | "Critical";
export type Likelihood = "Low" | "Medium" | "High" | "Critical";
export type RiskStatus = "New" | "Under Review" | "Mitigating" | "Monitoring" | "Resolved";
export type MitigationStatus = "Not Started" | "In Progress" | "Blocked" | "Completed";
export type MitigationPriority = "Low" | "Medium" | "High" | "Urgent";

export interface MitigationAction {
  id: string;
  action: string;
  owner: string;
  priority: MitigationPriority;
  dueDate: string;
  status: MitigationStatus;
  progress: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  actor: string;
}

export interface Risk {
  id: string;
  title: string;
  category: string;
  description: string;
  severity: Severity;
  probability: Likelihood;
  impact: Severity;
  score: number;
  confidence: number;
  status: RiskStatus;
  owner: string;
  createdAt: string;
  updatedAt: string;
  evidence: string[];
  aiInsight: {
    summary: string;
    whyItMatters: string;
    keyIndicators: string[];
    confidence: number;
  };
  recommendations: string[];
  contributingFactors: string[];
  potentialImpact: string;
  mitigationActions: MitigationAction[];
  timeline: TimelineEvent[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "critical";
  isRead: boolean;
  createdAt: string;
  riskId?: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Invited" | "Disabled";
}
