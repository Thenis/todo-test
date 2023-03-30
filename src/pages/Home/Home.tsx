import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { AppPaper } from "src/shared/components/AppPaper/AppPaper";
import { Link } from "react-router-dom";

const Home = observer(() => {
  return (
    <>
      <Box
        mb={4}
        component="header"
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h4">Link Categories</Typography>
        <Button
          variant="contained"
          to="create"
          component={Link}
          endIcon={<Add />}
        >
          Create Category
        </Button>
      </Box>

      <AppPaper elevation={8}></AppPaper>
    </>
  );
});

export default Home;
