import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { ICreateCategoryService } from "src/infrastructure/services/category/create-category.service";
import { container } from "tsyringe";

const CreateCategoryContext = createContext<{
  createCategoryService: ICreateCategoryService;
}>({} as any);

export const CreateCategoryProvider = ({ children }: PropsWithChildren) => {
  const createCategoryService = useRef(
    container.resolve<ICreateCategoryService>(
      SERVICE_KEYS.CREATE_CATEGORY_SERVICE
    )
  );

  return (
    <CreateCategoryContext.Provider
      value={{ createCategoryService: createCategoryService.current }}
    >
      {children}
    </CreateCategoryContext.Provider>
  );
};

export const useCreateCategoryContext = () => {
  return useContext(CreateCategoryContext);
};
