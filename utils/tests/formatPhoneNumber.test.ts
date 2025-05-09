import { formatPhoneNumber } from "../formatPhoneNumber";

describe("formatPhoneNumber", () => {
  it("formats a standard phone number correctly", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123)4567890");
  });

  it("formats exactly 3 digits with empty tail", () => {
    expect(formatPhoneNumber("123")).toBe("(123)");
  });
});
