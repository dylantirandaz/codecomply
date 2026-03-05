import { ZoningDistrict, CodeRule, DimensionalStandards } from "../codes/types";
import { ProposalInput } from "../schemas/proposal";
import { CheckItem } from "./types";

function formatDimensionalStandards(ds: DimensionalStandards): string {
  const lines: string[] = [];

  if (ds.frontYardMin) {
    lines.push(
      `- Front Yard: min ${ds.frontYardMin.value} ft (${ds.frontYardMin.codeReference})${ds.frontYardMin.exceptions.length ? ` [Exceptions: ${ds.frontYardMin.exceptions.join("; ")}]` : ""}`
    );
  } else {
    lines.push("- Front Yard: No minimum");
  }

  if (ds.sideYardMin) {
    lines.push(
      `- Side Yard: min ${ds.sideYardMin.value} ft (${ds.sideYardMin.codeReference})${ds.sideYardMin.exceptions.length ? ` [Exceptions: ${ds.sideYardMin.exceptions.join("; ")}]` : ""}`
    );
  }

  if (ds.rearYardMin) {
    lines.push(
      `- Rear Yard: min ${ds.rearYardMin.value} ft (${ds.rearYardMin.codeReference})${ds.rearYardMin.exceptions.length ? ` [Exceptions: ${ds.rearYardMin.exceptions.join("; ")}]` : ""}`
    );
  }

  lines.push(
    `- Height: max ${ds.heightMax.value} ft (${ds.heightMax.codeReference})`
  );
  lines.push(
    `- Lot Coverage: max ${ds.lotCoverageMax.value}% (${ds.lotCoverageMax.codeReference})${ds.lotCoverageMax.exceptions.length ? ` [Exceptions: ${ds.lotCoverageMax.exceptions.join("; ")}]` : ""}`
  );
  lines.push(
    `- Density: max ${ds.densityMax.value} du/acre (${ds.densityMax.codeReference})`
  );
  lines.push(
    `- Lot Area: min ${ds.lotAreaMin.value.toLocaleString()} sf (${ds.lotAreaMin.codeReference})`
  );

  if (ds.lotWidthMin) {
    lines.push(
      `- Lot Width: min ${ds.lotWidthMin.value} ft (${ds.lotWidthMin.codeReference})`
    );
  }

  lines.push(
    `- Parking: ${ds.parkingSpacesMin.spacesPerUnit} spaces/unit (${ds.parkingSpacesMin.codeReference})${ds.parkingSpacesMin.transitExemption ? ` [Transit: ${ds.parkingSpacesMin.transitExemption}]` : ""}`
  );

  return lines.join("\n");
}

function formatProposal(input: ProposalInput): string {
  const acres = input.lotArea / 43560;
  const coverage = input.lotCoveragePercent ?? (input.buildingFootprint / input.lotArea) * 100;
  const density = input.numberOfUnits / acres;

  return `- Project: ${input.projectName}${input.projectAddress ? ` at ${input.projectAddress}` : ""}
- Lot Area: ${input.lotArea.toLocaleString()} sf (${acres.toFixed(2)} acres)
- Lot Width: ${input.lotWidth} ft
- Units: ${input.numberOfUnits}${input.numberOfBuildings ? `, ${input.numberOfBuildings} buildings` : ""}${input.unitsPerBuilding ? `, ${input.unitsPerBuilding} units/building` : ""}
- Height: ${input.buildingHeight} ft, ${input.numberOfStories} stories
- Setbacks: front ${input.frontYardSetback} ft, side ${input.sideYardSetback} ft, rear ${input.rearYardSetback} ft
- Footprint: ${input.buildingFootprint.toLocaleString()} sf
- Coverage: ${coverage.toFixed(1)}%
- Density: ${density.toFixed(1)} du/acre
- Parking: ${input.parkingSpaces} spaces${input.parkingLocation ? ` (${input.parkingLocation})` : ""}${input.nearLightRail ? `, near light rail (${input.distanceToLightRail ?? "unknown"} ft)` : ""}${input.additionalNotes ? `\n- Notes: ${input.additionalNotes}` : ""}`;
}

export function buildCompliancePrompt(
  district: ZoningDistrict,
  generalRules: CodeRule[],
  input: ProposalInput,
  preCheckResults: CheckItem[]
): string {
  const preCheckSummary = preCheckResults
    .map(
      (c) =>
        `- ${c.ruleName}: ${c.compliant ? "PASS" : "FAIL"} (required: ${c.required}, proposed: ${c.proposed})`
    )
    .join("\n");

  return `You are a building code compliance analyst for ${district.name} district in Dallas, TX.

## ZONING REGULATIONS (${district.name} - ${district.description})
Code: Dallas Development Code, Chapter 51A, Section 51A-4.114

### Dimensional Standards
${formatDimensionalStandards(district.dimensionalStandards)}

### Special Conditions
${district.specialConditions.map((c) => `- ${c.description} (${c.codeReference}): ${c.checkLogic}`).join("\n")}

### General Rules
${generalRules.map((r) => `- ${r.description} (${r.codeReference})`).join("\n")}

## PROPOSED DEVELOPMENT
${formatProposal(input)}

## PRE-COMPUTED CHECKS (already verified)
${preCheckSummary}

## INSTRUCTIONS
The arithmetic checks above are already done. Your job:
1. Evaluate any EXCEPTIONS that might change a failing check to passing (e.g., transit exemptions, individual lot coverage exceptions)
2. Check SPECIAL CONDITIONS (unit grouping/spacing, parking location)
3. Check GENERAL RULES (use permission, lot access)
4. Provide an overall compliance determination, summary, warnings, and recommendations

Keep explanations to 1-2 sentences. Be precise with code references.
If information is missing to determine a rule, note it in warnings and set confidence to "low".
Do not invent requirements not listed above.`;
}
