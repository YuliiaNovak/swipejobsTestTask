import { useGetJobListingsQuery } from "@/api/queries/jobsApi";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { useRouter } from "expo-router";
import React from "react";
import { JobsList } from "../JobsList";

jest.mock("@/api/queries/jobsApi", () => ({
  useGetJobListingsQuery: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

const user = userEvent.setup();

describe("JobsList", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  it("shows loading spinner when loading", async () => {
    (useGetJobListingsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<JobsList />);

    expect(screen.getByLabelText("Loading")).toBeVisible();
  });

  it("shows error text when query fails", () => {
    (useGetJobListingsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(<JobsList />);

    expect(
      screen.getByText("Couldn't fetch jobs. Please try again.")
    ).toBeVisible();
  });

  it("shows job listings when data is available", () => {
    (useGetJobListingsQuery as jest.Mock).mockReturnValue({
      data: [
        {
          jobId: "job-1",
          jobTitle: { name: "Chef", imageUrl: "https://example.com/chef.jpg" },
          company: {
            name: "Kitchen Inc.",
            address: { formattedAddress: "123 Main St" },
          },
          milesToTravel: 5,
          wagePerHourInCents: 2000,
        },
      ],
      error: null,
      isLoading: false,
    });

    render(<JobsList />);

    expect(screen.getByText("Job Listings")).toBeVisible();
    expect(screen.getByText("Chef")).toBeVisible();
    expect(screen.getByText("Kitchen Inc.")).toBeVisible();
  });

  it("shows no jobs text when job listings array is empty", () => {
    (useGetJobListingsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });

    render(<JobsList />);

    expect(screen.queryByText("Job Listings")).not.toBeVisible();
    expect(screen.getByText("No jobs found.")).toBeVisible();
  });

  it("navigates to job details on press", async () => {
    (useGetJobListingsQuery as jest.Mock).mockReturnValue({
      data: [
        {
          jobId: "job-2",
          jobTitle: {
            name: "Driver",
            imageUrl: "https://example.com/driver.jpg",
          },
          company: {
            name: "Transport LLC",
            address: { formattedAddress: "456 Drive Ave" },
          },
          milesToTravel: 10,
          wagePerHourInCents: 2500,
        },
      ],
      error: null,
      isLoading: false,
    });

    render(<JobsList />);
    user.press(screen.getByText("See details"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/jobDetails/job-2");
    });
  });
});
