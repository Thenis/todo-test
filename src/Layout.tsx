import { AppBar, Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navigation from "./shared/components/Navigation/Navigation";

const tabs = [
  {
    label: "Create Category",
    link: "/category/create",
  },
] as any;

const Layout = () => {
  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgb( 0, 45, 36)",
        }}
      >
        <Toolbar />
      </AppBar>

      <Navigation tabs={tabs} />

      <Box flexGrow={1} height="100vh" p={4} component="main">
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
