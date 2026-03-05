"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProposalInputSchema, type ProposalInput } from "@/lib/schemas/proposal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProposalFormProps {
  onSubmit: (data: ProposalInput) => void;
  loading?: boolean;
  defaultValues?: Partial<ProposalInput>;
}

function SectionTitle({ numeral, title }: { numeral: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="font-serif text-lg text-stone-300">{numeral}.</span>
      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-900">
        {title}
      </h3>
      <div className="h-px flex-1 bg-stone-200" />
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
        {label}
      </Label>
      {children}
      {error && <p className="text-[11px] text-red-800">{error}</p>}
    </div>
  );
}

const inputClass =
  "border-stone-200 bg-white text-stone-900 placeholder:text-stone-300 focus:border-stone-400 focus:ring-stone-400/20";

export function ProposalForm({
  onSubmit,
  loading,
  defaultValues,
}: ProposalFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProposalInput>({
    resolver: zodResolver(ProposalInputSchema),
    defaultValues: {
      jurisdiction: "dallas-tx",
      zoningDistrict: "th-2a",
      ...defaultValues,
    },
  });

  const nearLightRail = watch("nearLightRail");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border border-stone-200 bg-white">
        {/* Section 1 */}
        <div className="p-8">
          <SectionTitle numeral="I" title="Jurisdiction & Project" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Jurisdiction">
              <Select
                defaultValue="dallas-tx"
                onValueChange={(v) => setValue("jurisdiction", v)}
              >
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dallas-tx">Dallas, TX</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Zoning District">
              <Select
                defaultValue={defaultValues?.zoningDistrict || "th-2a"}
                onValueChange={(v) => setValue("zoningDistrict", v)}
              >
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="th-1a">TH-1(A) — Low Density</SelectItem>
                  <SelectItem value="th-2a">TH-2(A) — Medium Density</SelectItem>
                  <SelectItem value="th-3a">TH-3(A) — High Density</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Project Name" error={errors.projectName?.message}>
                <Input
                  {...register("projectName")}
                  placeholder="Oak Lawn Townhomes"
                  className={inputClass}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Address">
                <Input
                  {...register("projectAddress")}
                  placeholder="1234 Main St, Dallas, TX"
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="rule-line" />

        {/* Section 2 */}
        <div className="p-8">
          <SectionTitle numeral="II" title="Dimensions" />
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Lot Area (sq ft)" error={errors.lotArea?.message}>
              <Input
                type="number"
                {...register("lotArea", { valueAsNumber: true })}
                placeholder="15,000"
                className={inputClass}
              />
            </Field>
            <Field label="Lot Width (ft)" error={errors.lotWidth?.message}>
              <Input
                type="number"
                {...register("lotWidth", { valueAsNumber: true })}
                placeholder="50"
                className={inputClass}
              />
            </Field>
            <Field label="Number of Units" error={errors.numberOfUnits?.message}>
              <Input
                type="number"
                {...register("numberOfUnits", { valueAsNumber: true })}
                placeholder="6"
                className={inputClass}
              />
            </Field>
            <Field label="Building Height (ft)" error={errors.buildingHeight?.message}>
              <Input
                type="number"
                {...register("buildingHeight", { valueAsNumber: true })}
                placeholder="32"
                className={inputClass}
              />
            </Field>
            <Field label="Stories" error={errors.numberOfStories?.message}>
              <Input
                type="number"
                {...register("numberOfStories", { valueAsNumber: true })}
                placeholder="3"
                className={inputClass}
              />
            </Field>
            <Field label="Footprint (sq ft)" error={errors.buildingFootprint?.message}>
              <Input
                type="number"
                {...register("buildingFootprint", { valueAsNumber: true })}
                placeholder="7,500"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-6">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-stone-400">
              Setbacks
            </p>
            <div className="grid grid-cols-3 gap-5">
              <Field label="Front (ft)">
                <Input
                  type="number"
                  {...register("frontYardSetback", { valueAsNumber: true })}
                  placeholder="15"
                  className={inputClass}
                />
              </Field>
              <Field label="Side (ft)">
                <Input
                  type="number"
                  {...register("sideYardSetback", { valueAsNumber: true })}
                  placeholder="5"
                  className={inputClass}
                />
              </Field>
              <Field label="Rear (ft)">
                <Input
                  type="number"
                  {...register("rearYardSetback", { valueAsNumber: true })}
                  placeholder="10"
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="rule-line" />

        {/* Section 3 */}
        <div className="p-8">
          <SectionTitle numeral="III" title="Parking & Remarks" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Parking Spaces" error={errors.parkingSpaces?.message}>
              <Input
                type="number"
                {...register("parkingSpaces", { valueAsNumber: true })}
                placeholder="12"
                className={inputClass}
              />
            </Field>
            <Field label="Parking Location">
              <Select
                onValueChange={(v) =>
                  setValue("parkingLocation", v as ProposalInput["parkingLocation"])
                }
              >
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surface">Surface</SelectItem>
                  <SelectItem value="ground-level">Ground Level</SelectItem>
                  <SelectItem value="below-grade">Below Grade</SelectItem>
                  <SelectItem value="above-grade">Above Grade</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex items-center gap-2.5 sm:col-span-2">
              <Checkbox
                id="nearLightRail"
                onCheckedChange={(checked) => setValue("nearLightRail", checked === true)}
              />
              <Label htmlFor="nearLightRail" className="text-[12px] text-stone-500">
                Within 2,640 ft of a DART light rail station
              </Label>
            </div>
            {nearLightRail && (
              <Field label="Distance to Rail (ft)">
                <Input
                  type="number"
                  {...register("distanceToLightRail", { valueAsNumber: true })}
                  placeholder="2,000"
                  className={inputClass}
                />
              </Field>
            )}
            <div className="sm:col-span-2">
              <Field label="Additional Remarks">
                <Textarea
                  {...register("additionalNotes")}
                  placeholder="Any additional context regarding the proposal..."
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full border border-stone-900 bg-stone-900 py-3.5 text-[12px] font-medium uppercase tracking-wider text-stone-50 transition-colors hover:bg-stone-800 disabled:opacity-40"
      >
        {loading ? "Analyzing..." : "Submit for Analysis"}
      </button>
    </form>
  );
}
