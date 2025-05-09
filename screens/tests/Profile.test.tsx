import { useGetProfileDataQuery } from "@/api/queries/profileApi";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Profile } from "../Profile";

jest.mock("@/api/queries/profileApi", () => ({
  useGetProfileDataQuery: jest.fn(),
}));

const mockProfileData = {
  address: {
    formattedAddress: "123 Main St, Cityville",
    zoneId: "America/Chicago",
  },
  email: "jim.rose@gmail.com",
  firstName: "Jim",
  lastName: "Rose",
  maxJobDistance: 15,
  phoneNumber: "5096290220",
  workerId: "123",
};

describe("Profile", () => {
  it("shows loading spinner when loading", async () => {
    (useGetProfileDataQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<Profile />);

    expect(screen.getByLabelText("Loading")).toBeVisible();
  });

  it("shows error text when profile fails to load", () => {
    (useGetProfileDataQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(<Profile />);
    expect(
      screen.getByText("Profile data couldn't be fetched. Please try again.")
    ).toBeVisible();
  });

  it("renders profile data correctly", async () => {
    (useGetProfileDataQuery as jest.Mock).mockReturnValue({
      data: mockProfileData,
      error: null,
      isLoading: false,
    });

    render(<Profile />);

    expect(screen.getByText("Jim Rose")).toBeVisible();
    expect(screen.getByText("jim.rose@gmail.com")).toBeVisible();
    expect(screen.getByText("(509)6290220")).toBeVisible();
    expect(screen.getByText("123 Main St, Cityville")).toBeVisible();
    expect(screen.getByText("15 miles")).toBeVisible();
  });
});
