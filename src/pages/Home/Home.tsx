import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { AppPaper } from "src/shared/components/AppPaper/AppPaper";
import { useState } from "react";
import CreateCategoryDialog from "./components/CreateCategoryDialog";
import { useCreateCategoryContext } from "src/context/create-category.context";

const Home = observer(() => {
  const { createCategoryService } = useCreateCategoryContext();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCategory = async (title: string) => {
    await createCategoryService.create(title);
  };

  return (
    <>
      <Box
        mb={4}
        component="header"
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h4">Link Categories</Typography>
        <Button variant="contained" endIcon={<Add />} onClick={handleOpen}>
          Create Category
        </Button>
      </Box>

      <AppPaper elevation={8}></AppPaper>

      <CreateCategoryDialog
        isOpen={open}
        close={handleClose}
        createCategory={handleCreateCategory}
      />
    </>
  );
});

export default Home;
