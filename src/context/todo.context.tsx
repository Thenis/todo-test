import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { ITodoStore } from "src/infrastructure/interfaces/todo-store.interface";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { container } from "tsyringe";

const TodoContext = createContext<{
  todoStore: ITodoStore;
}>({} as any);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const todoStore = useRef(
    container.resolve<ITodoStore>(SERVICE_KEYS.TODO_STORE)
  );

  return (
    <TodoContext.Provider value={{ todoStore: todoStore.current }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("Todo context is not found");
  }

  return context;
};
