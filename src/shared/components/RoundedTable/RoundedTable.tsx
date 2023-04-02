import { styled } from "@mui/material";
import ListTable from "../ListTable/ListTable";

const RoundedTable = styled(ListTable)(({ theme }) => {
  return `
      border: 0;

      .MuiDataGrid-cell {
        color: ${theme.palette.grey[700]};
        padding-left: 16px;
      }

      .MuiDataGrid-columnHeader {
        color: ${theme.palette.grey[600]};
        text-transform: uppercase;
        padding-left: 16px;
      }

      .MuiDataGrid-columnSeparator {
        display: none;
      }

      .MuiDataGrid-cell:focus-within, .MuiDataGrid-cell:focus {
        outline: none;
      }

      .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-columnHeader:focus {
        outline: none;
      }
  `;
});

export default RoundedTable;
