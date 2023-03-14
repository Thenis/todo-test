import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useTodo } from "src/context/todo.context";

const TodoContainer = observer(() => {
  const { todoStore } = useTodo();

  useEffect(() => {
    todoStore.fetch();
  }, [todoStore]);

  return (
    <>
      {todoStore.viewModel.map((viewModel) => {
        return (
          <div>
            {viewModel.content} - {viewModel.completed.toString()}
            <button onClick={() => viewModel.toggleComplete()}>
              Toggle Todo
            </button>
          </div>
        );
      })}
    </>
  );
});

export default TodoContainer;
