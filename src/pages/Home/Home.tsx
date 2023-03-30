import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { AppPaper } from "src/shared/components/AppPaper/AppPaper";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateCategoryDialog from "./components/CreateCategoryDialog";

const Home = observer(() => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

      <CreateCategoryDialog isOpen={open} close={handleClose} />
    </>
  );
});

export default Home;
