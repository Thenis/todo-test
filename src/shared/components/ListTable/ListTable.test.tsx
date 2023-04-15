import { render, screen } from "@testing-library/react";
import ListTable, { ListTableProps } from "./ListTable";

const props: ListTableProps = {
  columns: [{ field: "name", headerName: "Name", width: 150 }],
  rows: [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
  ],
  rowCount: 2,
  pageSize: 5,
  onPageChange: jest.fn(),
  getRowId: (row: any) => row.id,
  loading: false,
  checkboxSelection: false,
  onSelectionModelChange: jest.fn(),
  selectionModel: [],
};

describe("ListTable", () => {
  test("renders without error", async () => {
    render(<ListTable {...props} />);
    expect(await screen.findByTestId("mock-datagrid")).toBeInTheDocument();
  });

  test("displays correct number of rows", () => {
    render(<ListTable {...props} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(props.rows.length + 1); // add 1 for header row
  });

  test("displays correct column headers", () => {
    render(<ListTable {...props} />);
    const headerRow = screen.getByRole("rowgroup");
    props.columns.forEach((col) => {
      const columnHeader = screen.getByRole("columnheader", {
        name: col.headerName,
      });
      expect(columnHeader).toBeInTheDocument();
      expect(headerRow).toContainElement(columnHeader);
    });
  });

  test("displays loading indicator when loading prop is true", () => {
    render(<ListTable {...props} loading />);
    expect(screen.getByTestId("mock-datagrid-loading")).toBeInTheDocument();
  });

  test("hides pagination when hideFooterPagination prop is true", () => {
    render(<ListTable {...props} hideFooterPagination />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
