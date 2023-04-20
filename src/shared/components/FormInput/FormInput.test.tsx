import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormInput, { FormInputProps } from "./FormInput";
import { useController } from "react-hook-form";
import userEvent from "@testing-library/user-event";

interface TestFormValues {
  testInput: string;
}

const mockUseController = useController as jest.Mock;

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useController: jest.fn(),
}));

const mockControl = {
  register: jest.fn(),
  unregister: jest.fn(),
  setValue: jest.fn(),
  trigger: jest.fn(),
  formState: {
    isDirty: false,
    isSubmitted: false,
    isSubmitting: false,
    isValid: false,
    isValidating: false,
  },
  getValues: jest.fn(),
  handleSubmit: jest.fn(),
  watch: jest.fn(),
  reset: jest.fn(),
  clearErrors: jest.fn(),
  setError: jest.fn(),
};

const TestComponent: React.FC<FormInputProps<TestFormValues>> = (props) => (
  <FormInput<TestFormValues> {...props} control={mockControl as any} />
);

describe("FormInput", () => {
  beforeEach(() => {
    mockUseController.mockImplementation(({ name }) => ({
      field: {
        onChange: jest.fn(),
        onBlur: jest.fn(),
        value: name === "testInputWithValue" ? "A value" : "",
        ref: jest.fn(),
      },
      fieldState: {
        error: undefined,
      },
    }));
  });

  // test("renders input", () => {
  //   render(<TestComponent name="testInput" />);
  //   expect(screen.getByRole("textbox")).toBeInTheDocument();
  // });

  test("renders label", () => {
    render(<TestComponent name="testInput" label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders infoText tooltip", async () => {
    const infoText = "This is a test infoText";
    render(
      <TestComponent label="Test label" name="testInput" infoText={infoText} />
    );
    const helpIcon = screen.getByTestId("help-icon");
    userEvent.hover(helpIcon);

    // Wait for the tooltip to appear
    const tooltipTextElement = await screen.findByText(infoText);
    expect(tooltipTextElement).toBeInTheDocument();
  });

  test("renders clear button when showClear is true", () => {
    render(
      <TestComponent
        name="testInputWithValue"
        showClear={true}
        clearClick={() => {}}
      />
    );
    expect(screen.getByTestId("clear-icon")).toBeInTheDocument();
  });

  test("does not render clear button when showClear is false", () => {
    render(<TestComponent name="testInputWithValue" />);
    expect(screen.queryByTestId("clear-icon")).not.toBeInTheDocument();
  });

  test("calls clearClick when clear button is clicked", () => {
    const clearClickMock = jest.fn();
    render(
      <TestComponent
        name="testInputWithValue"
        showClear={true}
        clearClick={clearClickMock}
      />
    );
    fireEvent.click(screen.getByTestId("clear-icon"));
    expect(clearClickMock).toHaveBeenCalledTimes(1);
  });
});
