import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { IListLinkStore } from "src/infrastructure/stores/list-link.store";
import { container } from "tsyringe";

const ListLinksContext = createContext<{
  listLinksStore: IListLinkStore;
}>({} as any);

export const ListLinksProvider = ({ children }: PropsWithChildren) => {
  const listLinksStore = useRef(
    container.resolve<IListLinkStore>(SERVICE_KEYS.LIST_LINK_STORE)
  );

  return (
    <ListLinksContext.Provider
      value={{
        listLinksStore: listLinksStore.current,
      }}
    >
      {children}
    </ListLinksContext.Provider>
  );
};

export const useListLinksContext = () => {
  return useContext(ListLinksContext);
};
