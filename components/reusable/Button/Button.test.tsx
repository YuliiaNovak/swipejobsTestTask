import { render, screen } from "@testing-library/react-native";
import { Button } from "./Button";

describe("Button", () => {
  it("displays button name", () => {
    render(
      <Button
        buttonText="Button"
        buttonAction={jest.fn()}
        isActionLoading={false}
      />
    );

    expect(screen.getByRole("text", { name: "Button" })).toBeVisible();
  });

  it("renders loading indicator when isActionLoading is passed", () => {
    render(
      <Button
        buttonText="Button"
        buttonAction={jest.fn()}
        isActionLoading={true}
      />
    );

    expect(screen.getByLabelText("Loading")).toBeVisible();
  });
});
