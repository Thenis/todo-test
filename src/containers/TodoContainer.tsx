import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useTodo } from "src/context/todo.context";

const TodoContainer = observer(() => {
  const { todoStore } = useTodo();

  useEffect(() => {
    todoStore.fetch();
  }, [todoStore]);

  const refetchTodo = () => {
    todoStore.fetch();
  };

  return (
    <>
      {/* <div>
        {todoStore.viewModel?.content} -
        {todoStore.viewModel?.completed.toString()}
        <button onClick={() => todoStore.viewModel?.toggleComplete()}>
          Toggle Todo
        </button>
      </div>

      <button style={{ margin: "8px" }} onClick={refetchTodo}>
        Refetch Todo
      </button> */}
    </>
  );
});

export default TodoContainer;
