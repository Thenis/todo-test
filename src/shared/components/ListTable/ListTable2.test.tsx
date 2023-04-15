import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListTable2 from "./ListTable2";

const mockRows = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Doe", age: 30 },
];

const mockColumns = [
  { headerName: "Name", field: "name", width: 200 },
  { headerName: "Age", field: "age", width: 100 },
];

const mockRowCount = 2;

describe("ListTable2", () => {
  test("displays loading indicator when loading prop is true", async () => {
    render(
      <ListTable2
        rows={mockRows}
        columns={mockColumns}
        rowCount={mockRowCount}
        loading={true}
        onPageChange={() => {}}
        pageSize={50}
      />
    );

    const loadingIndicator = screen.getByTestId("loading-indicator");
    expect(loadingIndicator).toBeInTheDocument();
  });

  test("displays correct column headers", async () => {
    render(
      <ListTable2
        rows={mockRows}
        columns={mockColumns}
        rowCount={mockRowCount}
        loading={false}
        onPageChange={() => {}}
        pageSize={50}
      />
    );

    const nameHeader = screen.getByText("Name");
    const ageHeader = screen.getByText("Age");

    expect(nameHeader).toBeInTheDocument();
    expect(ageHeader).toBeInTheDocument();
  });

  test("renders rows correctly", async () => {
    render(
      <ListTable2
        rows={mockRows}
        columns={mockColumns}
        rowCount={mockRowCount}
        loading={false}
        onPageChange={() => {}}
        pageSize={50}
      />
    );

    const row1 = screen.getByText("John Doe");
    const row2 = screen.getByText("Jane Doe");

    expect(row1).toBeInTheDocument();
    expect(row2).toBeInTheDocument();
  });

  test("handles pagination correctly", async () => {
    const onPageChange = jest.fn();
    render(
      <ListTable2
        rows={mockRows}
        columns={mockColumns}
        rowCount={mockRowCount}
        loading={false}
        onPageChange={onPageChange}
        pageSize={1}
      />
    );

    const page2Button = await screen.findByRole("button", {
      name: "Go to next page",
    });

    userEvent.click(page2Button);

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
