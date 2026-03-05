import { Jurisdiction, ZoningDistrict } from "./types";
import { dallas } from "./dallas";

const jurisdictions: Record<string, Jurisdiction> = {
  "dallas-tx": dallas,
};

export function getJurisdiction(id: string): Jurisdiction | undefined {
  return jurisdictions[id];
}

export function getDistrict(
  jurisdictionId: string,
  districtId: string
): ZoningDistrict | undefined {
  const jurisdiction = jurisdictions[jurisdictionId];
  if (!jurisdiction) return undefined;
  return jurisdiction.districts.find((d) => d.id === districtId);
}

export function isDataStale(jurisdiction: Jurisdiction): boolean {
  const verified = new Date(jurisdiction.lastVerified);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  return verified < sixMonthsAgo;
}

export function listJurisdictions() {
  return Object.values(jurisdictions).map((j) => ({
    id: j.id,
    name: j.name,
    lastVerified: j.lastVerified,
    contactPhone: j.contactPhone,
    contactDepartment: j.contactDepartment,
    contactNote: j.contactNote,
    stale: isDataStale(j),
    districts: j.districts.map((d) => ({
      id: d.id,
      name: d.name,
      description: d.description,
    })),
  }));
}
