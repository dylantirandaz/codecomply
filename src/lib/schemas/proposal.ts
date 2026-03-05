import { z } from "zod";

export const ProposalInputSchema = z.object({
  jurisdiction: z.string(),
  zoningDistrict: z.string(),

  projectName: z.string().min(1).max(200),
  projectAddress: z.string().optional(),

  lotArea: z.number().positive(),
  lotWidth: z.number().positive(),
  numberOfUnits: z.number().int().positive(),
  numberOfBuildings: z.number().int().positive().optional(),
  unitsPerBuilding: z.number().int().positive().optional(),

  buildingHeight: z.number().positive(),
  numberOfStories: z.number().int().positive(),
  frontYardSetback: z.number().nonnegative(),
  sideYardSetback: z.number().nonnegative(),
  rearYardSetback: z.number().nonnegative(),

  buildingFootprint: z.number().positive(),
  lotCoveragePercent: z.number().min(0).max(100).optional(),
  openSpacePercent: z.number().min(0).max(100).optional(),

  parkingSpaces: z.number().int().nonnegative(),
  parkingLocation: z
    .enum(["surface", "ground-level", "below-grade", "above-grade"])
    .optional(),
  nearLightRail: z.boolean().optional(),
  distanceToLightRail: z.number().nonnegative().optional(),

  additionalNotes: z.string().max(2000).optional(),
});

export type ProposalInput = z.infer<typeof ProposalInputSchema>;
