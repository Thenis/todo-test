import { createContext, PropsWithChildren, useContext } from "react";
import { ITodoStore } from "src/infrastructure/interfaces/todo-store.interface";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { container } from "tsyringe";

const todoStore = container.resolve<ITodoStore>(SERVICE_KEYS.TODO_STORE);

const TodoContext = createContext<{
  todoStore: ITodoStore;
}>({ todoStore });

export const TodoProvider = ({ children }: PropsWithChildren) => {
  return (
    <TodoContext.Provider value={{ todoStore }}>
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
