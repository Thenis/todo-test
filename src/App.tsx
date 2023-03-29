import { useMemo } from "react";
import { Box, LinearProgress } from "@mui/material";

import "./App.css";
import TodoContainer from "./containers/TodoContainer";
import { usePendingRequest } from "./context/pending-request.context";
import { TodoProvider } from "./context/todo.context";
import { observer } from "mobx-react-lite";
import { useAuth } from "./context/auth.context";

const App = observer(() => {
  const { pendingRequestStore } = usePendingRequest();
  const { authStore } = useAuth();

  const showLoader = useMemo(
    () => pendingRequestStore.pendingRequestList.length > 0,
    [pendingRequestStore.pendingRequestList.length]
  );

  console.log(pendingRequestStore.pendingRequestList);

  return (
    <div className="App">
      <Box width="100vw" position="fixed" zIndex={12001}>
        <LinearProgress
          sx={{
            visibility: showLoader ? "visible" : "hidden",
            zIndex: 12001,
          }}
        />
      </Box>

      <button onClick={() => authStore.login()}>Login</button>

      <TodoProvider>
        <TodoContainer />
      </TodoProvider>
    </div>
  );
});

export default App;
