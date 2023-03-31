import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { AppPaper } from "src/shared/components/AppPaper/AppPaper";

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
      </Box>

      <AppPaper elevation={8}></AppPaper>
    </>
  );
});

export default Home;
