import { alpha, Drawer, ListItem, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const SideDrawer = styled(Drawer)`
  width: 220px;
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: 220px;
    box-sizing: border-box;
    background-color: inherit;
    border-right-style: dashed;
    padding: 12px;
    overflow-x: hidden;
  }
`;

export const DrawerNavLink = styled(NavLink)(({ theme }) => {
  return `
      text-decoration: none;
      color: ${theme.palette.text.primary};

      &.active {
        font-weight: bold;
      }
`;
});

export const ListItemStyle = styled("div")(({ theme }) => {
  return `
    width: 100%;
    position: relative;
    text-transform: capitalize;
    color: ${theme.palette.text.secondary};
    margin: 4px 8px;

    & :hover {
        border-radius: ${theme.shape.borderRadius}px;
    }

    & a {
      font-weight: ${theme.typography.fontWeightRegular};
      font-size: ${theme.typography.body2.fontSize};
      line-height ${theme.typography.body2.lineHeight};
      padding-top: 14px;
      padding-bottom: 14px;
    }

     & a.active {
      border-radius: ${theme.shape.borderRadius}px;
      color: ${theme.palette.primary.main};
      background-color:  ${alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      )};
    },
  `;
});

export const ListItemUsername = styled(ListItem)(({ theme }) => {
  return `
    color: ${theme.palette.text.secondary};
    margin: 4px 0;
    text-align: center;
    font-weight: ${theme.typography.fontWeightRegular};
    font-size: ${theme.typography.body2.fontSize};
    line-height ${theme.typography.body2.lineHeight};
    padding-top: 14px;
    padding-bottom: 14px;
  `;
});
