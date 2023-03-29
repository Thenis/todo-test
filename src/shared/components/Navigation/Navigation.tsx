import { Box, Button, ListItem, ListItemButton, Toolbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useAuth } from "src/context/auth.context";
import RenderIf from "../RenderIf/RenderIf";
import {
  DrawerNavLink,
  ListItemStyle,
  ListItemUsername,
  SideDrawer,
} from "./Navigation.style";

interface NavigationProps {
  tabs: { label: string; link: string }[];
}

const Navigation = observer(({ tabs }: NavigationProps) => {
  const { authStore } = useAuth();

  const renderTabs = tabs.map(({ label, link }) => (
    <ListItem disablePadding>
      <ListItemStyle>
        <ListItemButton to={link} component={DrawerNavLink} end>
          {label}
        </ListItemButton>
      </ListItemStyle>
    </ListItem>
  ));

  return (
    <SideDrawer
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 220, boxSizing: "border-box" },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />

      <RenderIf condition={authStore.isAuth}>{renderTabs}</RenderIf>

      <RenderIf condition={authStore.isAuth}>
        <ListItemUsername sx={{ marginTop: "auto" }}>
          {authStore.user?.email}
        </ListItemUsername>
      </RenderIf>

      <RenderIf condition={authStore.isAuth}>
        <Box width="100%" display="flex" justifyContent="center">
          <Button
            sx={{ width: "100%" }}
            onClick={() => authStore.logout()}
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </RenderIf>
    </SideDrawer>
  );
});

export default Navigation;
