import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DialogWithCancel, { DialogWithCancelProps } from "./DialogWithCancel";
import { DialogContent } from "@mui/material";

const TestComponent: React.FC<DialogWithCancelProps> = (props) => (
  <DialogWithCancel {...props}>
    <div>Test content</div>
  </DialogWithCancel>
);

describe("DialogWithCancel", () => {
  const handleClose = jest.fn();

  test("renders closed dialog by default", () => {
    render(<TestComponent isOpen={false} close={handleClose} />);
    expect(screen.queryByText("Test content")).not.toBeInTheDocument();
  });

  test("renders open dialog with content", () => {
    render(<TestComponent isOpen={true} close={handleClose} />);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("closes dialog when Close button is clicked", () => {
    render(<TestComponent isOpen={true} close={handleClose} />);
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("closes dialog when Escape key is pressed", () => {
    render(<TestComponent isOpen={true} close={handleClose} />);
    const dialogContent = screen.getByTestId("dialog-content");
    fireEvent.keyDown(dialogContent, { key: "Escape", code: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
