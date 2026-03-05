import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const client = new Anthropic();

export async function callClaudeStructured<T>(
  prompt: string,
  schema: z.ZodType<T>
): Promise<T> {
  const jsonSchema = z.toJSONSchema(schema);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6-20250514",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
    tool_choice: { type: "tool", name: "compliance_check" },
    tools: [
      {
        name: "compliance_check",
        description: "Return the compliance check result as structured data",
        input_schema: jsonSchema as Anthropic.Tool["input_schema"],
      },
    ],
  });

  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
  );

  if (!toolUse) {
    throw new Error("Claude did not return a structured response");
  }

  return schema.parse(toolUse.input);
}

export async function callClaude(prompt: string): Promise<string> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6-20250514",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content.find(
    (block): block is Anthropic.TextBlock => block.type === "text"
  );

  return text?.text ?? "";
}
