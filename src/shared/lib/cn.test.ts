import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("combines class names", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("merges conflicting Tailwind classes", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("merges conflicting custom text preset classes", () => {
    expect(cn("text-preset-1", "text-preset-2", "text-red-500")).toBe(
      "text-preset-2 text-red-500",
    );
  });
});
