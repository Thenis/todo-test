import {
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableProps,
  TableRow,
} from "@mui/material";
import { GridArrowDownwardIcon, GridArrowUpwardIcon } from "@mui/x-data-grid";
import { ChangeEvent, useState } from "react";

export type SelectChangeType = "checked" | "unchecked";

export type SelectPayload = { rowId: number; checked: boolean };

interface ListTable2Props extends TableProps {
  rows: any[];
  columns: { headerName: string; field: string; width: number }[];
  rowCount: number;
  loading: boolean;
  pageSize: number;
  checkboxes?: boolean;
  selectedRows?: number[];
  disableCheckboxIds?: number[];
  onPageChange: (page: number) => void;
  collapseContent?: (row: any) => JSX.Element;
  rowCheckedChange?: (payload: SelectPayload, detail: SelectChangeType) => void;
}

const AppBackdrop = styled(Backdrop)(({ theme }) => {
  return `
      position: absolute;
      z-index: ${theme.zIndex.drawer + 1};
      color: ${theme.palette.primary.main};
`;
});

const AppRow = ({
  columns,
  row,
  collapseContent,
  checkboxes = false,
  selectedRows = [],
  rowCheckedChange,
  disabledCheckbox = false,
}: {
  columns: any[];
  row: any;
  checkboxes?: boolean;
  selectedRows?: number[];
  disabledCheckbox?: boolean;
  collapseContent?: (row: any) => JSX.Element;
  rowCheckedChange?: (payload: SelectPayload, detail: SelectChangeType) => void;
}) => {
  const [open, setOpen] = useState(false);

  const isRowSelected = (rowId: number) =>
    selectedRows.some((id) => {
      return id === rowId;
    });

  const rowSelectionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked)
      rowCheckedChange?.(
        { rowId: row.id, checked: event.target.checked },
        "checked"
      );
    else
      rowCheckedChange?.(
        { rowId: row.id, checked: event.target.checked },
        "unchecked"
      );
  };

  const rowSelected = isRowSelected(row.id);

  return (
    <>
      <TableRow>
        {checkboxes ? (
          <TableCell padding="checkbox">
            <Checkbox
              onChange={rowSelectionChange}
              color="primary"
              checked={rowSelected}
              disabled={disabledCheckbox}
            />
          </TableCell>
        ) : (
          <></>
        )}

        {collapseContent ? (
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <GridArrowUpwardIcon /> : <GridArrowDownwardIcon />}
            </IconButton>
          </TableCell>
        ) : (
          <></>
        )}

        {columns.map(({ field, renderCell }, index) => {
          return (
            <TableCell align={index !== 0 ? "left" : "inherit"} key={field}>
              {renderCell?.(row) ?? row[field]}
            </TableCell>
          );
        })}
      </TableRow>
      {collapseContent ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {collapseContent?.(row) ?? <>No content</>}
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </>
  );
};

const ListTable2 = ({
  rows,
  columns,
  rowCount,
  loading,
  onPageChange,
  collapseContent,
  pageSize = 50,
  checkboxes = false,
  selectedRows = [],
  rowCheckedChange,
  disableCheckboxIds = [],
}: ListTable2Props) => {
  const [page, setPage] = useState(0);

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    setPage(page);
    onPageChange(page);
  };

  return (
    <>
      <TableContainer
        style={{
          height: "calc(100vh - 300px)",
          width: "100%",
          marginTop: "24px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {checkboxes ? <TableCell padding="checkbox" /> : <></>}

              {collapseContent ? <TableCell padding="checkbox" /> : <></>}
              {columns.map((column, index) => (
                <TableCell
                  width={column.width}
                  align={index !== 0 ? "left" : "inherit"}
                  key={column.field}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} rowSpan={10} height="100%">
                  <Box position="relative">
                    <AppBackdrop open={loading}>
                      <CircularProgress size={50} color="inherit" />
                    </AppBackdrop>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const isDisabled = disableCheckboxIds.some(
                  (id) => row.id === id
                );
                return (
                  <AppRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    collapseContent={collapseContent}
                    checkboxes={checkboxes}
                    selectedRows={selectedRows}
                    rowCheckedChange={rowCheckedChange}
                    disabledCheckbox={isDisabled}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[pageSize]}
        component="div"
        count={rowCount}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ListTable2;
