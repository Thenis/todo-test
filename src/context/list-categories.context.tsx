import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import type { IListCategoriesStore } from "src/infrastructure/stores/list-categories.store";
import { container } from "tsyringe";

const ListCategoriesContext = createContext<{
  listCategoriesStore: IListCategoriesStore;
}>({} as any);

export const ListCategoriesProvider = ({ children }: PropsWithChildren) => {
  const listCategoriesStore = useRef(
    container.resolve<IListCategoriesStore>(SERVICE_KEYS.LIST_CATEGORY_STORE)
  );

  return (
    <ListCategoriesContext.Provider
      value={{
        listCategoriesStore: listCategoriesStore.current,
      }}
    >
      {children}
    </ListCategoriesContext.Provider>
  );
};

export const useListCategoriesContext = () => {
  const context = useContext(ListCategoriesContext);

  if (!context) {
    throw new Error(
      "useListCategoriesContext must be used within a ListCategoriesProvider"
    );
  }

  return context;
};
