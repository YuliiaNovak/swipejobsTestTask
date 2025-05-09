import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { ReportTo } from "../ReportTo";

describe("ReportTo", () => {
  const mockName = "John Doe";
  const mockPhone = "1234567890";

  it("renders name and formatted phone when phone is provided", () => {
    render(<ReportTo reportTo={{ name: mockName, phone: mockPhone }} />);

    expect(
      screen.getByText(`${mockName} ${formatPhoneNumber(mockPhone)}`)
    ).toBeVisible();
  });

  it("renders only name when phone is not provided", async () => {
    render(<ReportTo reportTo={{ name: mockName }} />);

    expect(screen.getByText(mockName)).toBeVisible();
    expect(screen.queryByText(formatPhoneNumber(mockPhone))).not.toBeVisible();
  });
});
