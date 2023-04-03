import { List, ListItemButton, ListSubheader, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useListCategoriesContext } from "src/context/list-categories.context";
import { DrawerNavLink, ListItemStyle } from "../Navigation/Navigation.style";

const ListSubheaderStyle = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  margin: "12px 16px",
  textTransform: "capitalize",

  ".MuiListSubheader-root": {
    backgroundColor: "transparent",
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    textAlign: "left",
    paddingLeft: "4px",
    fontSize: `${theme.typography.body1.fontSize}`,
  },
}));

const CategoryList = observer(() => {
  const { listCategoriesStore } = useListCategoriesContext();

  useEffect(() => {
    listCategoriesStore.getAll();
  }, [listCategoriesStore]);

  return (
    <List
      subheader={
        <ListSubheaderStyle>
          <ListSubheader component="div" id="list-subheader">
            Categories
          </ListSubheader>
        </ListSubheaderStyle>
      }
    >
      {listCategoriesStore.viewModel.map((category) => (
        <ListItemStyle key={category.id}>
          <ListItemButton
            component={DrawerNavLink}
            to={`/category/${category.id}`}
            end
          >
            {category.title}
          </ListItemButton>
        </ListItemStyle>
      ))}
    </List>
  );
});

export default CategoryList;
