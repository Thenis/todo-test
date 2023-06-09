import { Box } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

export interface ListTableProps extends DataGridProps {
  height?: string;
  pageSize: number;
}

const ListTable = ({
  loading,
  rows,
  columns,
  rowCount,
  onPageChange,
  checkboxSelection,
  onSelectionModelChange,
  getRowId,
  selectionModel,
  pagination = true,
  paginationMode = "server",
  height = "calc(100vh - 300px)",
  pageSize,
  hideFooterPagination = false,
  ...props
}: ListTableProps) => {
  return (
    <Box
      mt={4}
      style={{
        height: height,
        width: "100%",
      }}
      data-testid="mock-datagrid"
    >
      <DataGrid
        disableColumnFilter
        disableColumnMenu
        hideFooterSelectedRowCount
        checkboxSelection={checkboxSelection}
        onSelectionModelChange={onSelectionModelChange}
        pagination={pagination}
        paginationMode={paginationMode}
        loading={loading}
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        onPageChange={onPageChange}
        pageSize={pageSize}
        getRowId={getRowId}
        rowsPerPageOptions={[pageSize]}
        selectionModel={selectionModel}
        hideFooterPagination={hideFooterPagination}
        {...props}
      />
      {loading && <div data-testid="mock-datagrid-loading"></div>}
    </Box>
  );
};

export default ListTable;
