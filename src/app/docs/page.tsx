import Link from "next/link";

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6 mt-12 first:mt-0">
      <div className="flex items-center gap-3">
        <span className="font-serif text-sm text-stone-400">{number}</span>
        <h2 className="font-serif text-xl font-medium text-stone-900">
          {title}
        </h2>
      </div>
      <div className="rule-line mt-3" />
    </div>
  );
}

function Endpoint({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  const color =
    method === "GET"
      ? "bg-green-800 text-green-50"
      : "bg-amber-800 text-amber-50";
  return (
    <div className="mb-2 flex items-center gap-3">
      <span
        className={`inline-block w-14 px-2 py-0.5 text-center text-[11px] font-semibold uppercase tracking-wider ${color}`}
      >
        {method}
      </span>
      <code className="text-sm font-medium text-stone-900">{path}</code>
      <span className="text-[12px] text-stone-400">&mdash; {description}</span>
    </div>
  );
}

function CodeBlock({ title, children }: { title?: string; children: string }) {
  return (
    <div className="my-4 border border-stone-200 bg-white">
      {title && (
        <div className="border-b border-stone-200 px-4 py-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
            {title}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed text-stone-700">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function ParamTable({
  params,
}: {
  params: { name: string; type: string; required: boolean; desc: string }[];
}) {
  return (
    <div className="my-4 overflow-x-auto border border-stone-200 bg-white">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-stone-200 bg-stone-50/50">
            <th className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              Parameter
            </th>
            <th className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              Type
            </th>
            <th className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              Required
            </th>
            <th className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-stone-100 last:border-0">
              <td className="px-4 py-2">
                <code className="text-[12px] font-medium text-stone-900">
                  {p.name}
                </code>
              </td>
              <td className="px-4 py-2 text-[12px] text-stone-500">{p.type}</td>
              <td className="px-4 py-2">
                {p.required ? (
                  <span className="text-[11px] font-medium text-green-800">
                    Yes
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-400">No</span>
                )}
              </td>
              <td className="px-4 py-2 text-[12px] text-stone-500">
                {p.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Developer Reference
        </p>
        <div className="rule-line mt-3 w-12" />
        <h1 className="mt-4 font-serif text-3xl font-medium text-stone-900">
          API Documentation
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-stone-500">
          Integrate CodeComply into your workflow. Submit proposals
          programmatically, upload building permits, and retrieve compliance
          determinations via our REST API.
        </p>
      </div>

      {/* Base URL */}
      <div className="border border-stone-200 bg-white px-6 py-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
          Base URL
        </p>
        <code className="mt-1 block text-sm font-medium text-stone-900">
          https://codecomply.vercel.app
        </code>
      </div>

      {/* Overview */}
      <div className="mt-8 space-y-2">
        <Endpoint
          method="POST"
          path="/api/check"
          description="Run a compliance check"
        />
        <Endpoint
          method="GET"
          path="/api/check/:id"
          description="Retrieve a stored result"
        />
        <Endpoint
          method="POST"
          path="/api/upload"
          description="Extract data from a PDF permit"
        />
        <Endpoint
          method="GET"
          path="/api/jurisdictions"
          description="List supported jurisdictions"
        />
      </div>

      {/* Section I — Compliance Check */}
      <SectionHeader number="I" title="Run Compliance Check" />

      <Endpoint method="POST" path="/api/check" description="Run a compliance check against zoning and building codes" />

      <p className="mt-2 text-[13px] leading-relaxed text-stone-600">
        Submit a development proposal and receive an instant compliance
        determination. The engine runs arithmetic pre-checks against known
        dimensional standards, then uses AI analysis for edge cases and special
        conditions.
      </p>

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Request Body
      </h3>
      <ParamTable
        params={[
          { name: "jurisdiction", type: "string", required: true, desc: "Jurisdiction ID (e.g. \"dallas-tx\")" },
          { name: "zoningDistrict", type: "string", required: true, desc: "District code (e.g. \"TH-1(A)\", \"TH-2(A)\", \"TH-3(A)\")" },
          { name: "projectName", type: "string", required: true, desc: "Name of the proposed development (1-200 chars)" },
          { name: "projectAddress", type: "string", required: false, desc: "Project street address" },
          { name: "lotArea", type: "number", required: true, desc: "Total lot area in square feet" },
          { name: "lotWidth", type: "number", required: true, desc: "Lot width in feet" },
          { name: "numberOfUnits", type: "number", required: true, desc: "Total number of dwelling units (integer)" },
          { name: "numberOfBuildings", type: "number", required: false, desc: "Number of buildings (integer)" },
          { name: "unitsPerBuilding", type: "number", required: false, desc: "Units per building (integer)" },
          { name: "buildingHeight", type: "number", required: true, desc: "Building height in feet" },
          { name: "numberOfStories", type: "number", required: true, desc: "Number of stories (integer)" },
          { name: "frontYardSetback", type: "number", required: true, desc: "Front yard setback in feet" },
          { name: "sideYardSetback", type: "number", required: true, desc: "Side yard setback in feet" },
          { name: "rearYardSetback", type: "number", required: true, desc: "Rear yard setback in feet" },
          { name: "buildingFootprint", type: "number", required: true, desc: "Building footprint in square feet" },
          { name: "lotCoveragePercent", type: "number", required: false, desc: "Lot coverage as a percentage (0-100)" },
          { name: "openSpacePercent", type: "number", required: false, desc: "Open space as a percentage (0-100)" },
          { name: "parkingSpaces", type: "number", required: true, desc: "Number of off-street parking spaces (integer)" },
          { name: "parkingLocation", type: "string", required: false, desc: "\"surface\" | \"ground-level\" | \"below-grade\" | \"above-grade\"" },
          { name: "nearLightRail", type: "boolean", required: false, desc: "Whether site is near a DART light rail station" },
          { name: "distanceToLightRail", type: "number", required: false, desc: "Distance to nearest light rail station in feet" },
          { name: "additionalNotes", type: "string", required: false, desc: "Additional context or notes (max 2000 chars)" },
        ]}
      />

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Example Request
      </h3>
      <CodeBlock title="curl">{`curl -X POST https://codecomply.vercel.app/api/check \\
  -H "Content-Type: application/json" \\
  -d '{
    "jurisdiction": "dallas-tx",
    "zoningDistrict": "TH-2(A)",
    "projectName": "Oak Lawn Townhomes",
    "lotArea": 12000,
    "lotWidth": 100,
    "numberOfUnits": 6,
    "buildingHeight": 36,
    "numberOfStories": 3,
    "frontYardSetback": 15,
    "sideYardSetback": 5,
    "rearYardSetback": 15,
    "buildingFootprint": 5400,
    "parkingSpaces": 12
  }'`}</CodeBlock>

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Response
      </h3>
      <CodeBlock title="200 OK">{`{
  "id": "abc123xyz",
  "result": {
    "overallCompliant": true,
    "confidence": "high",
    "summary": "The proposed 6-unit townhome development complies with all TH-2(A) dimensional and parking requirements.",
    "checks": [
      {
        "category": "height",
        "ruleName": "Maximum Building Height",
        "codeReference": "§51A-4.400",
        "required": "36 ft maximum",
        "proposed": "36 ft",
        "compliant": true,
        "severity": "pass",
        "explanation": "Building height is within the allowed maximum."
      },
      {
        "category": "setback",
        "ruleName": "Front Yard Setback",
        "codeReference": "§51A-4.400",
        "required": "15 ft minimum",
        "proposed": "15 ft",
        "compliant": true,
        "severity": "pass",
        "explanation": "Front yard setback meets the minimum requirement."
      }
    ],
    "warnings": [
      "Code data was last verified on 2025-01-15. Contact the City of Dallas to confirm current requirements."
    ],
    "recommendations": [
      "Consider verifying PD overlay requirements with the city planning department."
    ],
    "jurisdiction": {
      "name": "Dallas, TX",
      "lastVerified": "2025-01-15",
      "contactPhone": "(214) 670-4209",
      "contactDepartment": "City of Dallas - Building Inspection Division",
      "contactNote": "Call to verify current zoning requirements before submitting permits.",
      "stale": false
    }
  }
}`}</CodeBlock>

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Error Responses
      </h3>
      <CodeBlock title="400 Bad Request">{`{
  "error": "Invalid input",
  "details": [
    {
      "path": ["lotArea"],
      "message": "Number must be greater than 0"
    }
  ]
}`}</CodeBlock>
      <CodeBlock title="500 Internal Server Error">{`{
  "error": "Compliance check failed"
}`}</CodeBlock>

      {/* Section II — Retrieve Result */}
      <SectionHeader number="II" title="Retrieve a Result" />

      <Endpoint method="GET" path="/api/check/:id" description="Retrieve a previously generated compliance report" />

      <p className="mt-2 text-[13px] leading-relaxed text-stone-600">
        Every compliance check returns an <code className="text-[12px] font-medium text-stone-900">id</code>.
        Use it to retrieve the full result later. Results are stored in memory and
        will not persist across server restarts.
      </p>

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Example Request
      </h3>
      <CodeBlock title="curl">{`curl https://codecomply.vercel.app/api/check/abc123xyz`}</CodeBlock>

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Response
      </h3>
      <CodeBlock title="200 OK">{`{
  "id": "abc123xyz",
  "input": { ... },
  "result": { ... },
  "createdAt": "2025-03-05T12:00:00.000Z"
}`}</CodeBlock>
      <CodeBlock title="404 Not Found">{`{
  "error": "Result not found"
}`}</CodeBlock>

      {/* Section III — PDF Upload */}
      <SectionHeader number="III" title="Extract Data from PDF" />

      <Endpoint method="POST" path="/api/upload" description="Upload a building permit PDF for data extraction" />

      <p className="mt-2 text-[13px] leading-relaxed text-stone-600">
        Upload a building permit, site plan, or similar document as a PDF. The
        API extracts the text and uses AI to identify proposal parameters,
        which can then be submitted to the compliance check endpoint.
      </p>

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Request
      </h3>
      <p className="text-[13px] text-stone-600">
        Send as <code className="text-[12px] font-medium text-stone-900">multipart/form-data</code> with
        a <code className="text-[12px] font-medium text-stone-900">file</code> field. PDF only, 10 MB max.
      </p>

      <CodeBlock title="curl">{`curl -X POST https://codecomply.vercel.app/api/upload \\
  -F "file=@building-permit.pdf"`}</CodeBlock>

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Response
      </h3>
      <CodeBlock title="200 OK">{`{
  "extractedData": {
    "projectName": "Oak Lawn Townhomes",
    "projectAddress": "4521 Oak Lawn Ave, Dallas, TX",
    "zoningDistrict": "TH-2(A)",
    "lotArea": 12000,
    "lotWidth": 100,
    "numberOfUnits": 6,
    "numberOfBuildings": 2,
    "buildingHeight": 36,
    "numberOfStories": 3,
    "frontYardSetback": 15,
    "sideYardSetback": 5,
    "rearYardSetback": 15,
    "buildingFootprint": 5400,
    "parkingSpaces": 12
  }
}`}</CodeBlock>

      <p className="mt-3 text-[12px] text-stone-500">
        Fields that could not be determined from the document will be returned
        as <code className="text-[12px] font-medium text-stone-700">null</code>.
      </p>

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        Error Responses
      </h3>
      <div className="my-4 space-y-2 text-[13px] text-stone-600">
        <p><code className="font-medium text-stone-900">400</code> &mdash; No file provided, or file is not a PDF</p>
        <p><code className="font-medium text-stone-900">400</code> &mdash; File exceeds 10 MB limit</p>
        <p><code className="font-medium text-stone-900">422</code> &mdash; Could not extract data from the PDF</p>
        <p><code className="font-medium text-stone-900">500</code> &mdash; PDF processing failed</p>
      </div>

      {/* Section IV — Jurisdictions */}
      <SectionHeader number="IV" title="List Jurisdictions" />

      <Endpoint method="GET" path="/api/jurisdictions" description="List all supported jurisdictions and their contact information" />

      <CodeBlock title="curl">{`curl https://codecomply.vercel.app/api/jurisdictions`}</CodeBlock>

      <CodeBlock title="200 OK">{`{
  "jurisdictions": [
    {
      "id": "dallas-tx",
      "name": "Dallas, TX",
      "codeSource": "Chapter 51A, Dallas Development Code",
      "lastUpdated": "2025-01-15",
      "lastVerified": "2025-01-15",
      "contactPhone": "(214) 670-4209",
      "contactDepartment": "City of Dallas - Building Inspection Division",
      "districts": ["TH-1(A)", "TH-2(A)", "TH-3(A)"]
    }
  ]
}`}</CodeBlock>

      {/* Section V — Response Types */}
      <SectionHeader number="V" title="Response Types" />

      <h3 className="mb-2 mt-4 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        ComplianceResult
      </h3>
      <ParamTable
        params={[
          { name: "overallCompliant", type: "boolean", required: true, desc: "Whether the proposal passes all checks" },
          { name: "confidence", type: "string", required: true, desc: "\"high\" | \"medium\" | \"low\"" },
          { name: "summary", type: "string", required: true, desc: "Plain-language summary of the determination" },
          { name: "checks", type: "CheckItem[]", required: true, desc: "Array of individual compliance checks" },
          { name: "warnings", type: "string[]", required: true, desc: "Advisory warnings (e.g. data staleness)" },
          { name: "recommendations", type: "string[]", required: true, desc: "Suggested next steps" },
          { name: "jurisdiction", type: "object | null", required: false, desc: "Jurisdiction contact info (see below)" },
        ]}
      />

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        CheckItem
      </h3>
      <ParamTable
        params={[
          { name: "category", type: "string", required: true, desc: "\"setback\" | \"height\" | \"density\" | \"lot-coverage\" | \"parking\" | \"lot-size\" | \"lot-width\" | \"open-space\" | \"floor-area-ratio\" | \"use-permission\" | \"spacing\" | \"general\"" },
          { name: "ruleName", type: "string", required: true, desc: "Human-readable name of the rule checked" },
          { name: "codeReference", type: "string", required: true, desc: "Reference to the specific code section" },
          { name: "required", type: "string", required: true, desc: "What the code requires (e.g. \"15 ft minimum\")" },
          { name: "proposed", type: "string", required: true, desc: "What was proposed (e.g. \"12 ft\")" },
          { name: "compliant", type: "boolean", required: true, desc: "Whether the check passed" },
          { name: "severity", type: "string", required: true, desc: "\"pass\" | \"warning\" | \"violation\"" },
          { name: "explanation", type: "string", required: true, desc: "Detailed explanation of the check result" },
        ]}
      />

      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-wider text-stone-500">
        JurisdictionContact
      </h3>
      <ParamTable
        params={[
          { name: "name", type: "string", required: true, desc: "City / jurisdiction name" },
          { name: "lastVerified", type: "string", required: true, desc: "Date code data was last verified (ISO date)" },
          { name: "contactPhone", type: "string", required: true, desc: "Phone number for the building department" },
          { name: "contactDepartment", type: "string", required: true, desc: "Department name" },
          { name: "contactNote", type: "string", required: true, desc: "Verification guidance" },
          { name: "stale", type: "boolean", required: true, desc: "Whether the data is older than 6 months" },
        ]}
      />

      {/* Disclaimer */}
      <div className="mt-12 py-4">
        <div className="rule-line mb-4" />
        <p className="text-center text-[10px] leading-relaxed tracking-wide text-stone-400">
          This API is provided for informational purposes and does not
          constitute a legal determination or building permit approval. Always
          verify requirements with your local building department before filing
          applications.
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/check"
          className="inline-block border border-stone-900 bg-stone-900 px-6 py-2.5 text-[11px] font-medium uppercase tracking-wider text-stone-50 transition-colors hover:bg-stone-800"
        >
          Try It Now
        </Link>
      </div>
    </div>
  );
}
