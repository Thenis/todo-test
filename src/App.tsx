import "./App.css";
import TodoContainer from "./containers/TodoContainer";
import { TodoProvider } from "./context/todo.context";

const App = () => {
  return (
    <div className="App">
      <TodoProvider>
        <TodoContainer />
      </TodoProvider>
    </div>
  );
};

export default App;
