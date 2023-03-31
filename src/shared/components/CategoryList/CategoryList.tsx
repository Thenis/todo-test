import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  styled,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useListCategoriesContext } from "src/context/list-categories.context";
import { ListItemStyle } from "../Navigation/Navigation.style";

const ListSubheaderStyle = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  margin: "4px 8px",
  textTransform: "capitalize",
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
          <ListItemButton>
            <ListItemText>
              <Link to={`/category/${category.id}`}>{category.title}</Link>
            </ListItemText>
          </ListItemButton>
        </ListItemStyle>
      ))}
    </List>
  );
});

export default CategoryList;
