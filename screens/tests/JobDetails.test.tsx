import * as jobApiHooks from "@/api/queries/jobsApi";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import * as router from "expo-router";
import React from "react";
import { Alert } from "react-native";
import * as redux from "react-redux";
import { JobDetails } from "../JobDetails";

jest.mock("@/common/constants/User", () => ({
  USER_ID: "1",
}));
jest.mock("@/api/queries/jobsApi");
jest.spyOn(Alert, "alert");

const mockJobId = "job-123";
const mockJobDetails = {
  jobId: mockJobId,
  jobTitle: { name: "Software Engineer" },
  company: {
    name: "Tech Corp",
    address: { formattedAddress: "123 Tech Street" },
    reportTo: { name: "Jane Doe", phone: "123456789" },
  },
  milesToTravel: 10,
  wagePerHourInCents: 4000,
  shifts: [],
  requirements: [],
  branch: "NY Branch",
  branchPhoneNumber: "987654321",
};

const user = userEvent.setup();

describe("JobDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(router, "useLocalSearchParams")
      .mockReturnValue({ jobId: mockJobId });

    jest.spyOn(redux, "useSelector").mockImplementation((selectorFn) =>
      selectorFn({
        jobs: [mockJobDetails],
      })
    );
  });

  test("calls acceptJobTrigger and handles success", async () => {
    const unwrapMock = jest.fn().mockResolvedValue({ success: true });
    const acceptMock = jest.fn().mockReturnValue({ unwrap: unwrapMock });

    (jobApiHooks.useLazyAcceptJobQuery as jest.Mock).mockReturnValue([
      acceptMock,
      { isFetching: false },
    ]);
    (jobApiHooks.useLazyRejectJobQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { isFetching: false },
    ]);

    render(<JobDetails />);
    user.press(screen.getByText("I'll Take It"));

    await waitFor(() => {
      expect(acceptMock).toHaveBeenCalledWith({
        workerId: "1",
        jobId: mockJobId,
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "The job is almost yours! Our manager will contact you soon."
      );
    });
  });

  test("calls acceptJobTrigger and handles failure with message", async () => {
    const unwrapMock = jest.fn().mockResolvedValue({
      success: false,
      message: "Sorry, this role was no longer available",
      errorCode: "FAIL-101",
    });
    const acceptMock = jest.fn().mockReturnValue({ unwrap: unwrapMock });

    (jobApiHooks.useLazyAcceptJobQuery as jest.Mock).mockReturnValue([
      acceptMock,
      { isFetching: false },
    ]);
    (jobApiHooks.useLazyRejectJobQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { isFetching: false },
    ]);

    render(<JobDetails />);
    user.press(screen.getByText("I'll Take It"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Sorry, this role was no longer available"
      );
    });
  });

  test("calls rejectJobTrigger and handles success", async () => {
    const unwrapMock = jest.fn().mockResolvedValue({ success: true });
    const rejectMock = jest.fn().mockReturnValue({ unwrap: unwrapMock });

    (jobApiHooks.useLazyAcceptJobQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { isFetching: false },
    ]);
    (jobApiHooks.useLazyRejectJobQuery as jest.Mock).mockReturnValue([
      rejectMock,
      { isFetching: false },
    ]);

    render(<JobDetails />);
    user.press(screen.getByText("No Thanks"));

    await waitFor(() => {
      expect(rejectMock).toHaveBeenCalledWith({
        workerId: "1",
        jobId: mockJobId,
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "The job was successfully rejected!"
      );
    });
  });

  test("calls rejectJobTrigger and handles failure with message", async () => {
    const unwrapMock = jest.fn().mockResolvedValue({
      success: false,
      message: "Sorry, this role was no longer available",
      errorCode: "FAIL-101",
    });
    const rejectMock = jest.fn().mockReturnValue({ unwrap: unwrapMock });
    (jobApiHooks.useLazyAcceptJobQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { isFetching: false },
    ]);
    (jobApiHooks.useLazyRejectJobQuery as jest.Mock).mockReturnValue([
      rejectMock,
      { isFetching: false },
    ]);

    render(<JobDetails />);
    user.press(screen.getByText("No Thanks"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Sorry, this role was no longer available"
      );
    });
  });

  test("displays fallback text when jobDetails are missing", () => {
    jest
      .spyOn(redux, "useSelector")
      .mockImplementation((selectorFn) => selectorFn({ jobs: [] }));

    render(<JobDetails />);
    expect(
      screen.getByText("Failed to get job info. Please try again.")
    ).toBeVisible();
  });
});
