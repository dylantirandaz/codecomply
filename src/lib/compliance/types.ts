export type CheckCategory =
  | "setback"
  | "height"
  | "density"
  | "lot-coverage"
  | "parking"
  | "lot-size"
  | "lot-width"
  | "open-space"
  | "floor-area-ratio"
  | "use-permission"
  | "spacing"
  | "general";

export type Severity = "pass" | "warning" | "violation";

export interface CheckItem {
  category: CheckCategory;
  ruleName: string;
  codeReference: string;
  required: string;
  proposed: string;
  compliant: boolean;
  severity: Severity;
  explanation: string;
}

export interface JurisdictionContact {
  name: string;
  lastVerified: string;
  contactPhone: string;
  contactDepartment: string;
  contactNote: string;
  stale: boolean;
}

export interface ComplianceResult {
  overallCompliant: boolean;
  confidence: "high" | "medium" | "low";
  summary: string;
  checks: CheckItem[];
  warnings: string[];
  recommendations: string[];
  jurisdiction?: JurisdictionContact;
}

export interface StoredResult {
  id: string;
  input: Record<string, unknown>;
  result: ComplianceResult;
  createdAt: Date;
}
