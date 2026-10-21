import { describe, expect, it } from "vitest";
import { formatNumberWithCommas } from "./numbers";

describe("formatNumberWithCommas", () => {
  it("should leave value as it is when < 1000", () => {
    expect(formatNumberWithCommas(300)).toBe("300");
  });

  it("should add a comma when 999 < value < 999,999", () => {
    expect(formatNumberWithCommas(1000)).toBe("1,000");

    expect(formatNumberWithCommas(999999)).toBe("999,999");
  });

  it("should add multiple commas when value > 999,999", () => {
    expect(formatNumberWithCommas(1000000)).toBe("1,000,000");

    expect(formatNumberWithCommas(1000000000)).toBe("1,000,000,000");
  });

  it("preserves decimal places", () => {
    expect(formatNumberWithCommas(1234.98)).toBe("1,234.98");
  });
});
