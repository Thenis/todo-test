import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormElement, { FormElementProps } from "./FormElement";

const TestComponent: React.FC<FormElementProps> = (props) => (
  <FormElement {...props}>
    <input data-testid="test-input" />
  </FormElement>
);

describe("FormElement", () => {
  test("renders children", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("test-input")).toBeInTheDocument();
  });

  test("renders label", () => {
    render(<TestComponent label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders infoText tooltip", async () => {
    const infoText = "This is a test infoText";
    render(
      <FormElement label="Test Label" infoText={infoText}>
        <input data-testid="test-input" />
      </FormElement>
    );

    const helpIcon = screen.getByTestId("help-icon");
    userEvent.hover(helpIcon);

    // Wait for the tooltip to appear
    const tooltipTextElement = await screen.findByText(infoText);
    expect(tooltipTextElement).toBeInTheDocument();
  });

  test("renders error message", () => {
    render(<TestComponent errorMessage="Test error message" />);
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  test("does not render error message when not provided", () => {
    render(<TestComponent />);
    expect(screen.queryByText("Test error message")).not.toBeInTheDocument();
  });
});
