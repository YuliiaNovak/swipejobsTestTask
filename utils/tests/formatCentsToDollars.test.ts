import { formatCentsToDollars } from "../formatCentsToDollars";

describe("formatCentsToDollars", () => {
  it("formats typical values correctly", () => {
    expect(formatCentsToDollars(100)).toBe("$1.00");
    expect(formatCentsToDollars(12345)).toBe("$123.45");
    expect(formatCentsToDollars(1)).toBe("$0.01");
  });

  it("formats values ending in 0s correctly", () => {
    expect(formatCentsToDollars(5000)).toBe("$50.00");
  });

  it("handles large values correctly", () => {
    expect(formatCentsToDollars(1000000)).toBe("$10000.00");
  });
});
