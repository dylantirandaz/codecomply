import { ZoningDistrict } from "../codes/types";
import { ProposalInput } from "../schemas/proposal";
import { CheckItem } from "./types";

export function runPreChecks(
  district: ZoningDistrict,
  input: ProposalInput
): CheckItem[] {
  const checks: CheckItem[] = [];
  const ds = district.dimensionalStandards;

  // Height
  checks.push({
    category: "height",
    ruleName: "Maximum Building Height",
    codeReference: ds.heightMax.codeReference,
    required: `Maximum ${ds.heightMax.value} ${ds.heightMax.unit}`,
    proposed: `${input.buildingHeight} feet`,
    compliant: input.buildingHeight <= ds.heightMax.value,
    severity: input.buildingHeight <= ds.heightMax.value ? "pass" : "violation",
    explanation:
      input.buildingHeight <= ds.heightMax.value
        ? "Proposed height is within the maximum allowed."
        : `Exceeds maximum by ${input.buildingHeight - ds.heightMax.value} feet.`,
  });

  // Front yard setback
  if (ds.frontYardMin) {
    checks.push({
      category: "setback",
      ruleName: "Minimum Front Yard Setback",
      codeReference: ds.frontYardMin.codeReference,
      required: `Minimum ${ds.frontYardMin.value} ${ds.frontYardMin.unit}`,
      proposed: `${input.frontYardSetback} feet`,
      compliant: input.frontYardSetback >= ds.frontYardMin.value,
      severity:
        input.frontYardSetback >= ds.frontYardMin.value ? "pass" : "violation",
      explanation:
        input.frontYardSetback >= ds.frontYardMin.value
          ? "Front yard setback meets minimum requirement."
          : `Short by ${ds.frontYardMin.value - input.frontYardSetback} feet.`,
    });
  }

  // Side yard setback
  if (ds.sideYardMin) {
    checks.push({
      category: "setback",
      ruleName: "Minimum Side Yard Setback",
      codeReference: ds.sideYardMin.codeReference,
      required: `Minimum ${ds.sideYardMin.value} ${ds.sideYardMin.unit}`,
      proposed: `${input.sideYardSetback} feet`,
      compliant: input.sideYardSetback >= ds.sideYardMin.value,
      severity:
        input.sideYardSetback >= ds.sideYardMin.value ? "pass" : "violation",
      explanation:
        input.sideYardSetback >= ds.sideYardMin.value
          ? "Side yard setback meets minimum requirement."
          : `Short by ${ds.sideYardMin.value - input.sideYardSetback} feet.`,
    });
  }

  // Rear yard setback
  if (ds.rearYardMin) {
    checks.push({
      category: "setback",
      ruleName: "Minimum Rear Yard Setback",
      codeReference: ds.rearYardMin.codeReference,
      required: `Minimum ${ds.rearYardMin.value} ${ds.rearYardMin.unit}`,
      proposed: `${input.rearYardSetback} feet`,
      compliant: input.rearYardSetback >= ds.rearYardMin.value,
      severity:
        input.rearYardSetback >= ds.rearYardMin.value ? "pass" : "violation",
      explanation:
        input.rearYardSetback >= ds.rearYardMin.value
          ? "Rear yard setback meets minimum requirement."
          : `Short by ${ds.rearYardMin.value - input.rearYardSetback} feet.`,
    });
  }

  // Lot area
  checks.push({
    category: "lot-size",
    ruleName: "Minimum Lot Area",
    codeReference: ds.lotAreaMin.codeReference,
    required: `Minimum ${ds.lotAreaMin.value.toLocaleString()} ${ds.lotAreaMin.unit}`,
    proposed: `${input.lotArea.toLocaleString()} square feet`,
    compliant: input.lotArea >= ds.lotAreaMin.value,
    severity: input.lotArea >= ds.lotAreaMin.value ? "pass" : "violation",
    explanation:
      input.lotArea >= ds.lotAreaMin.value
        ? "Lot area meets minimum requirement."
        : `${(ds.lotAreaMin.value - input.lotArea).toLocaleString()} sq ft below minimum.`,
  });

  // Lot width
  if (ds.lotWidthMin) {
    checks.push({
      category: "lot-width",
      ruleName: "Minimum Lot Width",
      codeReference: ds.lotWidthMin.codeReference,
      required: `Minimum ${ds.lotWidthMin.value} ${ds.lotWidthMin.unit}`,
      proposed: `${input.lotWidth} feet`,
      compliant: input.lotWidth >= ds.lotWidthMin.value,
      severity: input.lotWidth >= ds.lotWidthMin.value ? "pass" : "violation",
      explanation:
        input.lotWidth >= ds.lotWidthMin.value
          ? "Lot width meets minimum requirement."
          : `${ds.lotWidthMin.value - input.lotWidth} feet below minimum.`,
    });
  }

  // Lot coverage
  const lotCoverage =
    input.lotCoveragePercent ??
    (input.buildingFootprint / input.lotArea) * 100;
  checks.push({
    category: "lot-coverage",
    ruleName: "Maximum Lot Coverage",
    codeReference: ds.lotCoverageMax.codeReference,
    required: `Maximum ${ds.lotCoverageMax.value}%`,
    proposed: `${lotCoverage.toFixed(1)}%`,
    compliant: lotCoverage <= ds.lotCoverageMax.value,
    severity: lotCoverage <= ds.lotCoverageMax.value ? "pass" : "violation",
    explanation:
      lotCoverage <= ds.lotCoverageMax.value
        ? "Lot coverage is within the maximum allowed."
        : `Exceeds maximum by ${(lotCoverage - ds.lotCoverageMax.value).toFixed(1)}%.`,
  });

  // Density
  const acres = input.lotArea / 43560;
  const density = input.numberOfUnits / acres;
  checks.push({
    category: "density",
    ruleName: "Maximum Density",
    codeReference: ds.densityMax.codeReference,
    required: `Maximum ${ds.densityMax.value} ${ds.densityMax.unit}`,
    proposed: `${density.toFixed(1)} dwelling units per acre`,
    compliant: density <= ds.densityMax.value,
    severity: density <= ds.densityMax.value ? "pass" : "violation",
    explanation:
      density <= ds.densityMax.value
        ? "Proposed density is within the maximum allowed."
        : `Exceeds maximum density by ${(density - ds.densityMax.value).toFixed(1)} du/acre.`,
  });

  // Parking
  const requiredSpaces = input.numberOfUnits * ds.parkingSpacesMin.spacesPerUnit;
  const transitExempt =
    input.nearLightRail &&
    input.distanceToLightRail !== undefined &&
    input.distanceToLightRail <= 2640;
  checks.push({
    category: "parking",
    ruleName: "Minimum Parking Spaces",
    codeReference: ds.parkingSpacesMin.codeReference,
    required: transitExempt
      ? "Exempt (within 2,640 ft of light rail)"
      : `Minimum ${requiredSpaces} spaces (${ds.parkingSpacesMin.spacesPerUnit}/unit)`,
    proposed: `${input.parkingSpaces} spaces`,
    compliant: transitExempt || input.parkingSpaces >= requiredSpaces,
    severity:
      transitExempt || input.parkingSpaces >= requiredSpaces
        ? "pass"
        : "violation",
    explanation: transitExempt
      ? "Parking minimum waived due to proximity to light rail station."
      : input.parkingSpaces >= requiredSpaces
        ? "Parking meets minimum requirement."
        : `${requiredSpaces - input.parkingSpaces} spaces short of minimum.`,
  });

  return checks;
}
