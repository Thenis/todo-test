import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListLinksContext } from "src/context/list-links.context";

const ListCategory = observer(() => {
  const { id: categoryId } = useParams();

  const { listLinksStore } = useListLinksContext();

  useEffect(() => {
    listLinksStore.getAll(categoryId as string);
  }, [listLinksStore, categoryId]);

  console.log(listLinksStore.viewModel);

  return <>Test</>;
});

export default ListCategory;
