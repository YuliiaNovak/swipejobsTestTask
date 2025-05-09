import * as formatUtils from "@/utils/formatShift";
import { render, screen, userEvent } from "@testing-library/react-native";
import React from "react";
import { ShiftList } from "../ShiftList";

const user = userEvent.setup();

jest.mock("@/utils/formatShift", () => ({
  formatShift: jest.fn(),
}));

describe("ShiftList", () => {
  const mockShifts = [
    { startDate: "2025-05-09T10:00:00Z", endDate: "2025-05-09T14:00:00Z" },
    { startDate: "2025-05-10T12:00:00Z", endDate: "2025-05-10T16:00:00Z" },
    { startDate: "2025-05-11T09:00:00Z", endDate: "2025-05-11T13:00:00Z" },
  ];

  beforeEach(() => {
    (formatUtils.formatShift as jest.Mock).mockImplementation(
      (start, end) => `${start} - ${end}`
    );
  });

  it("renders up to two shifts by default", () => {
    render(<ShiftList shifts={mockShifts} />);

    expect(screen.getByText("Shift Dates")).toBeVisible();
    expect(
      screen.getByText(`${mockShifts[0].startDate} - ${mockShifts[0].endDate}`)
    ).toBeVisible();
    expect(
      screen.getByText(`${mockShifts[1].startDate} - ${mockShifts[1].endDate}`)
    ).toBeVisible();
    expect(
      screen.queryByText(
        `${mockShifts[2].startDate} - ${mockShifts[2].endDate}`
      )
    ).not.toBeVisible();
    expect(screen.getByText("Show More")).toBeVisible();
  });

  it("expands to show all shifts when 'Show More' is pressed", () => {
    render(<ShiftList shifts={mockShifts} />);

    user.press(screen.getByText("Show More"));

    expect(
      screen.getByText(`${mockShifts[2].startDate} - ${mockShifts[2].endDate}`)
    ).toBeVisible();
    expect(screen.getByText("Show Less")).toBeVisible();
  });

  it("collapses when 'Show Less' is pressed", () => {
    render(<ShiftList shifts={mockShifts} />);

    user.press(screen.getByText("Show More"));
    user.press(screen.getByText("Show Less"));

    expect(
      screen.queryByText(
        `${mockShifts[2].startDate} - ${mockShifts[2].endDate}`
      )
    ).not.toBeVisible();
    expect(screen.getByText("Show More")).toBeVisible();
  });

  it("renders all shifts if there are two or fewer", () => {
    const shortList = mockShifts.slice(0, 2);
    render(<ShiftList shifts={shortList} />);

    expect(
      screen.getByText(`${shortList[0].startDate} - ${shortList[0].endDate}`)
    ).toBeVisible();
    expect(
      screen.getByText(`${shortList[1].startDate} - ${shortList[1].endDate}`)
    ).toBeVisible();
    expect(screen.queryByText("Show More")).not.toBeVisible();
  });
});
