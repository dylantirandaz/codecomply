import { nanoid } from "nanoid";
import { getJurisdiction, getDistrict, isDataStale } from "../codes/loader";
import { ProposalInput } from "../schemas/proposal";
import { ComplianceResultSchema } from "../schemas/compliance-result";
import { callClaudeStructured } from "../anthropic";
import { runPreChecks } from "./pre-check";
import { buildCompliancePrompt } from "./prompt-builder";
import { ComplianceResult } from "./types";
import { store } from "../store";

export async function runComplianceCheck(
  input: ProposalInput
): Promise<{ id: string; result: ComplianceResult }> {
  const jurisdiction = getJurisdiction(input.jurisdiction);
  if (!jurisdiction) {
    throw new Error(`Unknown jurisdiction: ${input.jurisdiction}`);
  }

  const district = getDistrict(input.jurisdiction, input.zoningDistrict);
  if (!district) {
    throw new Error(
      `Unknown district: ${input.zoningDistrict} in ${input.jurisdiction}`
    );
  }

  // Check data freshness
  const stale = isDataStale(jurisdiction);

  // Run arithmetic pre-checks (instant)
  const preChecks = runPreChecks(district, input);

  // Build staleness/verification warnings
  const dataWarnings: string[] = [];
  if (stale) {
    dataWarnings.push(
      `Code data was last verified on ${jurisdiction.lastVerified} — over 6 months ago. Rules may have changed. Call ${jurisdiction.contactDepartment} at ${jurisdiction.contactPhone} to confirm current requirements.`
    );
  }
  dataWarnings.push(
    `This is an automated analysis, not a legal determination. Always verify with ${jurisdiction.contactDepartment} (${jurisdiction.contactPhone}) before submitting permits.`
  );

  // Check if all pre-checks pass and no special conditions need evaluation
  const allPass = preChecks.every((c) => c.compliant);
  const hasSpecialConditions = district.specialConditions.length > 0;

  if (allPass && !hasSpecialConditions) {
    const result: ComplianceResult = {
      overallCompliant: true,
      confidence: stale ? "medium" : "high",
      summary:
        "All dimensional and zoning requirements are met. No special conditions apply.",
      checks: preChecks,
      warnings: dataWarnings,
      recommendations: [],
      jurisdiction: {
        name: jurisdiction.name,
        lastVerified: jurisdiction.lastVerified,
        contactPhone: jurisdiction.contactPhone,
        contactDepartment: jurisdiction.contactDepartment,
        contactNote: jurisdiction.contactNote,
        stale,
      },
    };

    const id = nanoid(10);
    store.set(id, input as unknown as Record<string, unknown>, result);
    return { id, result };
  }

  // Build prompt and call Claude for exception/special condition analysis
  const prompt = buildCompliancePrompt(
    district,
    jurisdiction.generalRules,
    input,
    preChecks
  );

  const claudeResult = await callClaudeStructured(
    prompt,
    ComplianceResultSchema
  );

  // Merge: keep pre-check arithmetic results, add Claude's additional checks
  const preCheckCategories = new Set(
    preChecks.map((c) => `${c.category}-${c.ruleName}`)
  );
  const additionalChecks = claudeResult.checks.filter(
    (c) => !preCheckCategories.has(`${c.category}-${c.ruleName}`)
  );

  const allChecks = [...preChecks, ...additionalChecks];
  const hasViolation = allChecks.some((c) => !c.compliant);

  // Downgrade confidence if data is stale
  let confidence = claudeResult.confidence;
  if (stale && confidence === "high") {
    confidence = "medium";
  }

  const result: ComplianceResult = {
    overallCompliant: !hasViolation,
    confidence,
    summary: claudeResult.summary,
    checks: allChecks,
    warnings: [...dataWarnings, ...claudeResult.warnings],
    recommendations: claudeResult.recommendations,
    jurisdiction: {
      name: jurisdiction.name,
      lastVerified: jurisdiction.lastVerified,
      contactPhone: jurisdiction.contactPhone,
      contactDepartment: jurisdiction.contactDepartment,
      contactNote: jurisdiction.contactNote,
      stale,
    },
  };

  const id = nanoid(10);
  store.set(id, input as unknown as Record<string, unknown>, result);
  return { id, result };
}
