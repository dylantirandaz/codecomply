import { z } from "zod";

export const CheckItemSchema = z.object({
  category: z.enum([
    "setback",
    "height",
    "density",
    "lot-coverage",
    "parking",
    "lot-size",
    "lot-width",
    "open-space",
    "floor-area-ratio",
    "use-permission",
    "spacing",
    "general",
  ]),
  ruleName: z.string(),
  codeReference: z.string(),
  required: z.string(),
  proposed: z.string(),
  compliant: z.boolean(),
  severity: z.enum(["pass", "warning", "violation"]),
  explanation: z.string(),
});

export const ComplianceResultSchema = z.object({
  overallCompliant: z.boolean(),
  confidence: z.enum(["high", "medium", "low"]),
  summary: z.string(),
  checks: z.array(CheckItemSchema),
  warnings: z.array(z.string()),
  recommendations: z.array(z.string()),
});
