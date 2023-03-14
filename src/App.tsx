import { useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react-lite";
import { TodoStore } from "./infrastructure/stores/todo.store";

const todoStore = new TodoStore();

const App = observer(() => {
  useEffect(() => {
    todoStore.fetch();
  }, []);

  return (
    <div className="App">
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
    </div>
  );
});

export default App;
