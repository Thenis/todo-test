import { Add, Summarize } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useListLinksContext } from "src/context/list-links.context";
import { AppPaper } from "src/shared/components/AppPaper/AppPaper";
import CreateNewLink from "../components/CreateNewLink";
import RoundedTable from "src/shared/components/RoundedTable/RoundedTable";
import { GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { useSummaryContext } from "src/context/summary.context";

const linkColumnDefs: GridColumns = [
  {
    field: "link",
    headerName: "Link",
    sortable: false,
    flex: 1,
  },
  {
    type: "actions",
    field: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<Summarize color="primary" fontSize="large" />}
        label="Summarize"
      />,
    ],
  },
];

const ListCategory = observer(() => {
  const { id: categoryId } = useParams();
  const { listLinksStore } = useListLinksContext();
  const { summaryService } = useSummaryContext();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    listLinksStore.getAll(categoryId as string);
  }, [listLinksStore, categoryId]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateLink = async (link: string) => {
    await listLinksStore.create(categoryId as string, link);
    setIsOpen(false);
  };

  const linkColumnDefs: GridColumns = useMemo(
    () => [
      {
        field: "link",
        headerName: "Link",
        sortable: false,
        flex: 1,
      },
      {
        type: "actions",
        field: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            onClick={() => summaryService.getSummary()}
            icon={<Summarize color="primary" fontSize="large" />}
            label="Summarize"
          />,
        ],
      },
    ],
    [summaryService]
  );

  return (
    <>
      <Box
        component="header"
        mb={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">Links</Typography>

        <Box display="flex">
          <Button onClick={handleOpen} variant="contained" endIcon={<Add />}>
            Create Link
          </Button>
        </Box>
      </Box>

      <AppPaper elevation={8}>
        <RoundedTable
          loading={listLinksStore.loading}
          paginationMode="client"
          rows={listLinksStore.links}
          pageSize={listLinksStore.links.length}
          columns={linkColumnDefs}
          hideFooter
          autoHeight
          height="auto"
          disableSelectionOnClick
          getRowHeight={() => 70}
        />
      </AppPaper>

      <CreateNewLink
        isOpen={isOpen}
        createLink={handleCreateLink}
        close={handleClose}
      />
    </>
  );
});

export default ListCategory;
