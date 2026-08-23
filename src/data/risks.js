function score(probability, impact) {
  const map = { Low: 1, Medium: 2, High: 3, Critical: 4 };
  const raw = map[probability] * map[impact] / 16;
  return Math.round(raw * 100);
}
function severityFromScore(s) {
  if (s >= 80) return "Critical";
  if (s >= 60) return "High";
  if (s >= 35) return "Medium";
  return "Low";
}
function mkTimeline(events) {
  return events.map(([date, event, actor], i) => ({ id: `t${i}`, date, event, actor }));
}
function mkActions(actions) {
  return actions.map((a) => ({
    owner: "Unassigned",
    priority: "Medium",
    dueDate: "2026-09-15",
    status: "Not Started",
    progress: 0,
    ...a
  }));
}
const RAW = [
  {
    id: "RSK-1001",
    title: "Third-Party Data Exposure",
    category: "Vendor & Third-Party",
    description: "A key analytics vendor's misconfigured storage bucket may have exposed customer usage logs, including partial account identifiers, for an estimated 11-day window.",
    probability: "High",
    impact: "Critical",
    confidence: 92,
    status: "Mitigating",
    owner: "Priya Nair",
    createdAt: "2026-08-02T09:14:00Z",
    updatedAt: "2026-08-21T16:40:00Z",
    evidence: [
      "Vendor security bulletin VB-2291 confirming bucket misconfiguration",
      "Internal log correlation showing 4,812 affected account identifiers",
      "Vendor SOC 2 gap noted in Q2 review, access-control section"
    ],
    aiInsight: {
      summary: "This risk was escalated after cross-referencing the vendor's disclosure with internal access logs, which independently confirmed unauthorized read access during the disclosed window.",
      whyItMatters: "Customer trust and regulatory notification obligations are directly at stake; several affected accounts fall under GDPR scope.",
      keyIndicators: [
        "Vendor disclosure combined with independent log confirmation",
        "Affected record count crosses the mandatory-notification threshold",
        "Vendor has an open SOC 2 access-control finding from last quarter"
      ],
      confidence: 92
    },
    recommendations: [
      "Trigger the vendor incident response clause and request a full forensic report",
      "Begin regulatory notification assessment with legal and compliance",
      "Rotate any credentials or tokens that may have been exposed in the logs"
    ],
    contributingFactors: [
      "Vendor lacked bucket-level encryption at rest",
      "No automated exposure scanning on vendor-managed storage",
      "Contractual audit rights were not exercised in the last 12 months"
    ],
    potentialImpact: "Regulatory fines, mandatory breach notifications in multiple jurisdictions, and reputational damage affecting customer retention.",
    mitigationActions: mkActions([
      { id: "m1", action: "Request full forensic report from vendor", owner: "Priya Nair", priority: "Urgent", dueDate: "2026-08-25", status: "In Progress", progress: 60 },
      { id: "m2", action: "Rotate exposed credentials and tokens", owner: "Marcus Lee", priority: "Urgent", dueDate: "2026-08-24", status: "Completed", progress: 100 },
      { id: "m3", action: "Complete regulatory notification assessment", owner: "Legal Team", priority: "High", dueDate: "2026-08-30", status: "Not Started", progress: 0 }
    ]),
    timeline: mkTimeline([
      ["2026-08-02T09:14:00Z", "Risk detected via vendor security bulletin", "AI Risk Engine"],
      ["2026-08-03T11:00:00Z", "Escalated to Critical after log correlation", "AI Risk Engine"],
      ["2026-08-05T14:20:00Z", "Assigned to Priya Nair", "System"],
      ["2026-08-21T16:40:00Z", "Credential rotation completed", "Marcus Lee"]
    ])
  },
  {
    id: "RSK-1002",
    title: "Cloud Configuration Risk",
    category: "Infrastructure",
    description: "Several production storage buckets in the primary cloud account were found with overly permissive IAM policies, allowing broader read access than required by any current workload.",
    probability: "Medium",
    impact: "High",
    confidence: 87,
    status: "Under Review",
    owner: "David Kim",
    createdAt: "2026-08-10T08:00:00Z",
    updatedAt: "2026-08-20T10:15:00Z",
    evidence: [
      "Cloud posture scan flagged 7 buckets with wildcard read policies",
      "No workload dependency found for 4 of the 7 buckets"
    ],
    aiInsight: {
      summary: "Automated posture scanning identified a drift from the organization's least-privilege baseline across multiple storage resources.",
      whyItMatters: "Overly broad access increases the blast radius of any single compromised credential.",
      keyIndicators: [
        "7 buckets exceed least-privilege baseline",
        "4 buckets show no active workload usage",
        "Drift introduced within the last provisioning cycle"
      ],
      confidence: 87
    },
    recommendations: [
      "Apply least-privilege IAM policies to all flagged buckets",
      "Enable continuous configuration drift detection",
      "Decommission unused buckets identified during review"
    ],
    contributingFactors: ["Manual provisioning process without policy templates", "No automated drift detection in place until this scan"],
    potentialImpact: "Increased exposure surface for data exfiltration if any single credential is compromised.",
    mitigationActions: mkActions([
      { id: "m1", action: "Apply least-privilege policy templates", owner: "David Kim", priority: "High", dueDate: "2026-08-28", status: "In Progress", progress: 40 },
      { id: "m2", action: "Enable drift detection alerts", owner: "Platform Team", priority: "Medium", dueDate: "2026-09-05", status: "Not Started", progress: 0 }
    ]),
    timeline: mkTimeline([
      ["2026-08-10T08:00:00Z", "Detected via automated cloud posture scan", "AI Risk Engine"],
      ["2026-08-12T09:30:00Z", "Assigned to David Kim for review", "System"]
    ])
  },
  {
    id: "RSK-1003",
    title: "Regulatory Compliance Gap",
    category: "Compliance",
    description: "An internal audit identified that data retention practices in the EU region do not fully align with updated regulatory guidance issued this quarter.",
    probability: "Medium",
    impact: "High",
    confidence: 81,
    status: "New",
    owner: "Unassigned",
    createdAt: "2026-08-18T13:00:00Z",
    updatedAt: "2026-08-18T13:00:00Z",
    evidence: ["Internal audit report AR-118, section 4.2", "Updated regulatory guidance published 2026-07-01"],
    aiInsight: {
      summary: "Comparison of internal retention policy documents against the latest published guidance surfaced a gap in three data categories.",
      whyItMatters: "Non-compliance can result in regulatory penalties and mandated operational changes on short notice.",
      keyIndicators: ["3 data categories exceed updated retention limits", "No documented remediation plan on file"],
      confidence: 81
    },
    recommendations: ["Assign a compliance owner within 5 business days", "Draft an updated retention schedule for the affected data categories"],
    contributingFactors: ["Policy review cadence did not catch the guidance update in time"],
    potentialImpact: "Regulatory penalties and required operational changes to data handling processes.",
    mitigationActions: mkActions([
      { id: "m1", action: "Draft updated retention schedule", priority: "High", dueDate: "2026-09-01", status: "Not Started" }
    ]),
    timeline: mkTimeline([["2026-08-18T13:00:00Z", "Risk logged from internal audit findings", "Compliance Team"]])
  },
  {
    id: "RSK-1004",
    title: "Unauthorized Access Risk",
    category: "Access Control",
    description: "Access review detected several dormant privileged accounts that were never deprovisioned after role changes over the past two quarters.",
    probability: "High",
    impact: "Medium",
    confidence: 88,
    status: "Mitigating",
    owner: "Sofia Ramirez",
    createdAt: "2026-07-28T10:00:00Z",
    updatedAt: "2026-08-19T09:00:00Z",
    evidence: ["Quarterly access review Q3-2026", "12 privileged accounts flagged as dormant for 60+ days"],
    aiInsight: {
      summary: "Pattern analysis of the access review data shows deprovisioning consistently lags role changes by 30-45 days on average.",
      whyItMatters: "Dormant privileged accounts are a common target for credential-based attacks and lateral movement.",
      keyIndicators: ["12 dormant privileged accounts", "Average deprovisioning lag of 38 days", "3 accounts tied to former contractors"],
      confidence: 88
    },
    recommendations: ["Immediately disable the 12 flagged accounts", "Automate deprovisioning as part of the offboarding workflow"],
    contributingFactors: ["Offboarding workflow is partially manual", "No automated dormant-account alerting"],
    potentialImpact: "Increased risk of unauthorized access via stale, unmonitored credentials.",
    mitigationActions: mkActions([
      { id: "m1", action: "Disable all flagged dormant accounts", owner: "Sofia Ramirez", priority: "Urgent", dueDate: "2026-08-22", status: "Completed", progress: 100 },
      { id: "m2", action: "Automate offboarding deprovisioning", owner: "IT Ops", priority: "High", dueDate: "2026-09-10", status: "In Progress", progress: 25 }
    ]),
    timeline: mkTimeline([
      ["2026-07-28T10:00:00Z", "Detected during quarterly access review", "Sofia Ramirez"],
      ["2026-08-19T09:00:00Z", "Flagged accounts disabled", "Sofia Ramirez"]
    ])
  },
  {
    id: "RSK-1005",
    title: "Vendor Dependency Risk",
    category: "Vendor & Third-Party",
    description: "A critical payment processing vendor has no contractually guaranteed failover partner, creating a single point of failure for transaction processing.",
    probability: "Low",
    impact: "Critical",
    confidence: 74,
    status: "Monitoring",
    owner: "James Whitfield",
    createdAt: "2026-06-15T12:00:00Z",
    updatedAt: "2026-08-14T11:00:00Z",
    evidence: ["Vendor contract review, no failover SLA clause found", "Vendor uptime history: 99.95% over trailing 12 months"],
    aiInsight: {
      summary: "Contract analysis found no secondary processing arrangement, despite this vendor handling over 70% of transaction volume.",
      whyItMatters: "An outage at this vendor would halt a majority of revenue-generating transactions with no immediate fallback.",
      keyIndicators: ["70% of transaction volume routed through a single vendor", "No failover clause in current contract"],
      confidence: 74
    },
    recommendations: ["Negotiate a failover SLA in the next contract renewal", "Evaluate a secondary processor for partial traffic routing"],
    contributingFactors: ["Original contract predates current transaction volume", "No secondary vendor relationship established"],
    potentialImpact: "Revenue loss and customer-facing outage during any vendor disruption.",
    mitigationActions: mkActions([
      { id: "m1", action: "Evaluate secondary payment processor", owner: "James Whitfield", priority: "Medium", dueDate: "2026-10-01", status: "In Progress", progress: 15 }
    ]),
    timeline: mkTimeline([["2026-06-15T12:00:00Z", "Identified during vendor contract review", "James Whitfield"]])
  },
  {
    id: "RSK-1006",
    title: "Data Privacy Risk",
    category: "Privacy",
    description: "A newly launched feature collects device location data with consent language that may not meet updated regional privacy disclosure requirements.",
    probability: "Medium",
    impact: "Medium",
    confidence: 79,
    status: "Under Review",
    owner: "Aisha Bello",
    createdAt: "2026-08-12T15:30:00Z",
    updatedAt: "2026-08-19T08:00:00Z",
    evidence: ["Legal review memo LM-402", "Consent flow screenshots from current production build"],
    aiInsight: {
      summary: "Consent language comparison against the updated regional framework shows missing disclosure of data-sharing partners.",
      whyItMatters: "Insufficient consent disclosures can invalidate lawful basis for processing in the affected region.",
      keyIndicators: ["Missing third-party sharing disclosure", "Consent flow last updated before framework change"],
      confidence: 79
    },
    recommendations: ["Update consent flow copy to include all data-sharing partners", "Re-obtain consent from existing users in the affected region"],
    contributingFactors: ["Consent flow not reviewed after framework update", "Feature shipped ahead of legal sign-off"],
    potentialImpact: "Regulatory scrutiny and required user re-consent campaign.",
    mitigationActions: mkActions([
      { id: "m1", action: "Update consent flow copy", owner: "Aisha Bello", priority: "High", dueDate: "2026-08-29", status: "In Progress", progress: 50 }
    ]),
    timeline: mkTimeline([["2026-08-12T15:30:00Z", "Flagged during legal review", "Aisha Bello"]])
  },
  {
    id: "RSK-1007",
    title: "Operational Continuity Risk",
    category: "Operations",
    description: "The primary data center region lacks a tested failover runbook for a full regional outage scenario; the last full failover drill was over 18 months ago.",
    probability: "Low",
    impact: "High",
    confidence: 70,
    status: "New",
    owner: "Unassigned",
    createdAt: "2026-08-15T09:00:00Z",
    updatedAt: "2026-08-15T09:00:00Z",
    evidence: ["Disaster recovery runbook, last tested 2025-02", "Infrastructure inventory showing single-region dependency for 2 core services"],
    aiInsight: {
      summary: "Runbook staleness combined with two core services lacking multi-region redundancy elevates recovery time risk.",
      whyItMatters: "An untested failover plan increases the likelihood of extended downtime during a regional outage.",
      keyIndicators: ["Last drill 18+ months ago", "2 core services single-region only"],
      confidence: 70
    },
    recommendations: ["Schedule a full failover drill within 30 days", "Prioritize multi-region redundancy for the 2 flagged services"],
    contributingFactors: ["Drill cadence not enforced by policy", "Redundancy work deprioritized against feature roadmap"],
    potentialImpact: "Extended downtime and SLA breaches during a regional infrastructure outage.",
    mitigationActions: mkActions([{ id: "m1", action: "Schedule full failover drill", priority: "Medium", dueDate: "2026-09-20", status: "Not Started" }]),
    timeline: mkTimeline([["2026-08-15T09:00:00Z", "Identified during infrastructure resilience review", "AI Risk Engine"]])
  },
  {
    id: "RSK-1008",
    title: "Supply Chain Risk",
    category: "Supply Chain",
    description: "A dependency scan identified a widely-used open-source package in the build pipeline with a maintainer inactivity pattern consistent with abandonment risk.",
    probability: "Medium",
    impact: "Medium",
    confidence: 76,
    status: "Monitoring",
    owner: "Tom Baxter",
    createdAt: "2026-08-05T10:00:00Z",
    updatedAt: "2026-08-17T13:00:00Z",
    evidence: ["Dependency scan report DS-887", "No maintainer commits in 9 months", "2 open unpatched CVEs of low severity"],
    aiInsight: {
      summary: "Maintainer activity pattern analysis flags this package as at elevated risk of going unmaintained, with two unpatched low-severity CVEs already open.",
      whyItMatters: "Unmaintained dependencies in the build pipeline can become unpatched attack vectors over time.",
      keyIndicators: ["9 months without maintainer commits", "2 open low-severity CVEs", "Package used in 6 internal services"],
      confidence: 76
    },
    recommendations: ["Evaluate a maintained fork or alternative package", "Add the package to the deprecation watchlist"],
    contributingFactors: ["No automated maintainer-activity monitoring prior to this scan"],
    potentialImpact: "Accumulating unpatched vulnerabilities in production build artifacts.",
    mitigationActions: mkActions([{ id: "m1", action: "Evaluate maintained alternative package", owner: "Tom Baxter", priority: "Low", dueDate: "2026-10-10", status: "Not Started" }]),
    timeline: mkTimeline([["2026-08-05T10:00:00Z", "Flagged by dependency scanning", "AI Risk Engine"]])
  },
  {
    id: "RSK-1009",
    title: "Model Governance Risk",
    category: "AI Governance",
    description: "An internally deployed classification model has not undergone bias re-evaluation since a training data refresh three months ago.",
    probability: "Medium",
    impact: "Medium",
    confidence: 83,
    status: "Under Review",
    owner: "Elena Rossi",
    createdAt: "2026-08-08T14:00:00Z",
    updatedAt: "2026-08-18T16:00:00Z",
    evidence: ["Model card last updated 2026-05-01", "Training data refresh log dated 2026-05-20"],
    aiInsight: {
      summary: "Governance policy requires bias re-evaluation after any material training data change; this model is past the required review window.",
      whyItMatters: "Unreviewed model drift can introduce or amplify unfair outcomes in downstream decisions.",
      keyIndicators: ["Review window exceeded by 45 days", "Model influences customer-facing risk tiering"],
      confidence: 83
    },
    recommendations: ["Schedule a bias and drift re-evaluation immediately", "Add automated review-window alerting to the model registry"],
    contributingFactors: ["Model registry lacks automated review reminders"],
    potentialImpact: "Potential for biased or drifted outputs affecting customer-facing decisions.",
    mitigationActions: mkActions([{ id: "m1", action: "Run bias and drift re-evaluation", owner: "Elena Rossi", priority: "High", dueDate: "2026-08-27", status: "In Progress", progress: 30 }]),
    timeline: mkTimeline([["2026-08-08T14:00:00Z", "Flagged by governance policy check", "AI Risk Engine"]])
  },
  {
    id: "RSK-1010",
    title: "Financial Control Risk",
    category: "Finance",
    description: "A segregation-of-duties gap was identified in the vendor payment approval workflow, allowing a single role to both create and approve vendor payments above the standard threshold.",
    probability: "Low",
    impact: "High",
    confidence: 85,
    status: "New",
    owner: "Unassigned",
    createdAt: "2026-08-19T11:00:00Z",
    updatedAt: "2026-08-19T11:00:00Z",
    evidence: ["Internal controls audit ICA-56", "Workflow configuration export showing combined create/approve permission for 2 roles"],
    aiInsight: {
      summary: "Controls audit identified two roles with combined create-and-approve permissions on vendor payments exceeding the standard threshold.",
      whyItMatters: "Segregation-of-duties gaps increase the risk of unauthorized or fraudulent payments going undetected.",
      keyIndicators: ["2 roles with combined create/approve permission", "No compensating control currently in place"],
      confidence: 85
    },
    recommendations: ["Split create and approve permissions across separate roles", "Implement a compensating review control until permissions are split"],
    contributingFactors: ["Workflow permissions not reviewed since system migration"],
    potentialImpact: "Increased exposure to unauthorized or fraudulent vendor payments.",
    mitigationActions: mkActions([{ id: "m1", action: "Split create/approve permissions", priority: "High", dueDate: "2026-09-05", status: "Not Started" }]),
    timeline: mkTimeline([["2026-08-19T11:00:00Z", "Identified during internal controls audit", "Finance Team"]])
  }
];
const RISKS = RAW.map((r) => {
  const s = score(r.probability, r.impact);
  return { ...r, score: s, severity: severityFromScore(s) };
});
function getRiskById(id) {
  return RISKS.find((r) => r.id === id);
}
export {
  RISKS,
  getRiskById
};
