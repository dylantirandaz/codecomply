import { ComplianceResult } from "./compliance/types";

interface StoredCheck {
  id: string;
  input: Record<string, unknown>;
  result: ComplianceResult;
  createdAt: Date;
}

const results = new Map<string, StoredCheck>();

export const store = {
  set(id: string, input: Record<string, unknown>, result: ComplianceResult) {
    results.set(id, { id, input, result, createdAt: new Date() });
  },

  get(id: string): StoredCheck | undefined {
    return results.get(id);
  },
};
