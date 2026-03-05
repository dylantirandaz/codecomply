import { Jurisdiction } from "../types";
import { TH_1A, TH_2A, TH_3A } from "./districts";

export const dallas: Jurisdiction = {
  id: "dallas-tx",
  name: "Dallas, TX",
  codeSource: "Chapter 51A, Dallas Development Code",
  lastUpdated: "2025-01-15",
  lastVerified: "2025-01-15",
  contactPhone: "(214) 670-4209",
  contactDepartment: "City of Dallas - Building Inspection Division",
  contactNote:
    "Call to verify current zoning requirements before submitting permits. Online codes may not reflect recent amendments or PD overlays.",
  districts: [TH_1A, TH_2A, TH_3A],
  generalRules: [
    {
      id: "dallas-use-permit",
      category: "use-permission",
      description:
        "Townhouse use must be permitted in the designated zoning district",
      codeReference: "Sec. 51A-4.114",
      checkLogic:
        "Verify the proposed use (townhouse, single-family, duplex) is listed as a permitted use in the selected zoning district.",
    },
    {
      id: "dallas-lot-access",
      category: "general",
      description:
        "Each lot must have direct access to a public or private street",
      codeReference: "Sec. 51A-4.114",
      checkLogic:
        "Verify the proposal indicates street access for each lot.",
    },
  ],
};
