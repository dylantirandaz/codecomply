export interface Jurisdiction {
  id: string;
  name: string;
  codeSource: string;
  lastUpdated: string;
  lastVerified: string;
  contactPhone: string;
  contactDepartment: string;
  contactNote: string;
  districts: ZoningDistrict[];
  generalRules: CodeRule[];
}

export interface ZoningDistrict {
  id: string;
  name: string;
  description: string;
  applicableUses: string[];
  dimensionalStandards: DimensionalStandards;
  specialConditions: CodeRule[];
}

export interface DimensionalStandards {
  frontYardMin: NumericRule | null;
  sideYardMin: NumericRule | null;
  rearYardMin: NumericRule | null;
  heightMax: NumericRule;
  storiesMax: NumericRule | null;
  lotCoverageMax: NumericRule;
  projectCoverageMax: NumericRule | null;
  densityMax: NumericRule;
  lotAreaMin: NumericRule;
  lotWidthMin: NumericRule | null;
  floorAreaRatioMax: NumericRule | null;
  parkingSpacesMin: ParkingRule;
}

export interface NumericRule {
  value: number;
  unit: string;
  codeReference: string;
  exceptions: string[];
}

export interface ParkingRule {
  spacesPerUnit: number;
  codeReference: string;
  transitExemption: string | null;
}

export interface CodeRule {
  id: string;
  category: CodeCategory;
  description: string;
  codeReference: string;
  checkLogic: string;
}

export type CodeCategory =
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
