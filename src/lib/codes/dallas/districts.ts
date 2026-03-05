import { ZoningDistrict } from "../types";

const COMMON_SPECIAL_CONDITIONS = [
  {
    id: "th-spacing",
    category: "spacing" as const,
    description:
      "Minimum 15-foot spacing between groups of 8 attached units",
    codeReference: "Sec. 51A-4.114",
    checkLogic:
      "If proposal has groups of attached townhome units, verify minimum 15-foot spacing between groups and maximum 8 units per group.",
  },
  {
    id: "th-parking-location",
    category: "parking" as const,
    description: "Off-street parking must be at or below ground level",
    codeReference: "Sec. 51A-4.114",
    checkLogic:
      "Verify that all off-street parking is provided at ground level or below. Above-grade parking structures are not permitted.",
  },
];

export const TH_1A: ZoningDistrict = {
  id: "th-1a",
  name: "TH-1(A)",
  description: "Townhouse District - lowest density",
  applicableUses: ["single-family", "townhouse"],
  dimensionalStandards: {
    frontYardMin: {
      value: 15,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: [
        "May be increased if abutting residential district with greater requirement per Sec. 51A-4.401",
      ],
    },
    sideYardMin: {
      value: 5,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: ["No minimum for single family structures"],
    },
    rearYardMin: {
      value: 10,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: ["No minimum for single family structures"],
    },
    heightMax: {
      value: 36,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: [],
    },
    storiesMax: null,
    lotCoverageMax: {
      value: 60,
      unit: "percent",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: [
        "80% individual lot if project total <=60% with 40% open space",
      ],
    },
    projectCoverageMax: {
      value: 60,
      unit: "percent",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: [],
    },
    densityMax: {
      value: 8,
      unit: "dwelling units per acre",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: [],
    },
    lotAreaMin: {
      value: 3000,
      unit: "square feet",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: [],
    },
    lotWidthMin: {
      value: 20,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(a)",
      exceptions: [],
    },
    floorAreaRatioMax: null,
    parkingSpacesMin: {
      spacesPerUnit: 2,
      codeReference: "Sec. 51A-4.301",
      transitExemption:
        "No minimum within 2,640 ft of light rail station",
    },
  },
  specialConditions: COMMON_SPECIAL_CONDITIONS,
};

export const TH_2A: ZoningDistrict = {
  id: "th-2a",
  name: "TH-2(A)",
  description: "Townhouse District - medium density",
  applicableUses: ["single-family", "duplex", "townhouse"],
  dimensionalStandards: {
    frontYardMin: null,
    sideYardMin: {
      value: 5,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(b)",
      exceptions: [
        "No minimum for single family structures",
        "10 feet for non-residential structures",
      ],
    },
    rearYardMin: {
      value: 10,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(b)",
      exceptions: ["No minimum for single family structures"],
    },
    heightMax: {
      value: 36,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(b)",
      exceptions: [],
    },
    storiesMax: null,
    lotCoverageMax: {
      value: 60,
      unit: "percent",
      codeReference: "Sec. 51A-4.114(b)",
      exceptions: [
        "80% individual lot if project total <=60% with 40% open space",
      ],
    },
    projectCoverageMax: {
      value: 60,
      unit: "percent",
      codeReference: "Sec. 51A-4.114(b)",
      exceptions: [],
    },
    densityMax: {
      value: 9,
      unit: "dwelling units per acre",
      codeReference: "Sec. 51A-4.114(b)",
      exceptions: [],
    },
    lotAreaMin: {
      value: 2000,
      unit: "square feet",
      codeReference: "Sec. 51A-4.114(b)",
      exceptions: ["6,000 sq ft for duplex"],
    },
    lotWidthMin: {
      value: 20,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(b)",
      exceptions: [],
    },
    floorAreaRatioMax: null,
    parkingSpacesMin: {
      spacesPerUnit: 2,
      codeReference: "Sec. 51A-4.301",
      transitExemption:
        "No minimum within 2,640 ft of light rail station",
    },
  },
  specialConditions: COMMON_SPECIAL_CONDITIONS,
};

export const TH_3A: ZoningDistrict = {
  id: "th-3a",
  name: "TH-3(A)",
  description: "Townhouse District - highest density",
  applicableUses: ["single-family", "duplex", "townhouse"],
  dimensionalStandards: {
    frontYardMin: null,
    sideYardMin: {
      value: 5,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(c)",
      exceptions: ["No minimum for single family structures"],
    },
    rearYardMin: {
      value: 10,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(c)",
      exceptions: ["No minimum for single family structures"],
    },
    heightMax: {
      value: 36,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(c)",
      exceptions: [],
    },
    storiesMax: null,
    lotCoverageMax: {
      value: 60,
      unit: "percent",
      codeReference: "Sec. 51A-4.114(c)",
      exceptions: [
        "80% individual lot if project total <=60% with 40% open space",
      ],
    },
    projectCoverageMax: {
      value: 60,
      unit: "percent",
      codeReference: "Sec. 51A-4.114(c)",
      exceptions: [],
    },
    densityMax: {
      value: 12,
      unit: "dwelling units per acre",
      codeReference: "Sec. 51A-4.114(c)",
      exceptions: [],
    },
    lotAreaMin: {
      value: 1500,
      unit: "square feet",
      codeReference: "Sec. 51A-4.114(c)",
      exceptions: [],
    },
    lotWidthMin: {
      value: 16,
      unit: "feet",
      codeReference: "Sec. 51A-4.114(c)",
      exceptions: [],
    },
    floorAreaRatioMax: null,
    parkingSpacesMin: {
      spacesPerUnit: 2,
      codeReference: "Sec. 51A-4.301",
      transitExemption:
        "No minimum within 2,640 ft of light rail station",
    },
  },
  specialConditions: COMMON_SPECIAL_CONDITIONS,
};
