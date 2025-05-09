import { formatShift } from "../formatShift";

describe("formatShift", () => {
  it("formats a valid date range in default timezone (America/Los_Angeles)", () => {
    const result = formatShift("2025-05-08T09:00:00Z", "2025-05-08T17:00:00Z");
    expect(result).toBe("May 8, Thu 2:00am - 10:00am PDT");
  });

  it("formats a date range in a different timezone", () => {
    const result = formatShift(
      "2025-05-08T09:00:00Z",
      "2025-05-08T17:00:00Z",
      "America/New_York"
    );
    expect(result).toBe("May 8, Thu 5:00am - 1:00pm EDT");
  });

  it("handles midnight to morning shifts", () => {
    const result = formatShift(
      "2025-05-08T05:00:00Z",
      "2025-05-08T09:00:00Z",
      "America/Chicago"
    );
    expect(result).toBe("May 8, Thu 12:00am - 4:00am CDT");
  });

  it("returns the same format when dates are the same", () => {
    const result = formatShift(
      "2025-05-08T12:00:00Z",
      "2025-05-08T17:00:00Z",
      "America/Los_Angeles"
    );
    expect(result).toBe("May 8, Thu 5:00am - 10:00am PDT");
  });

  it("handles invalid timezones gracefully", () => {
    expect(() =>
      formatShift(
        "2025-05-08T09:00:00Z",
        "2025-05-08T17:00:00Z",
        "Invalid/Zone"
      )
    ).toThrow();
  });
});
