import "reflect-metadata";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./infrastructure/container";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PendingRequestProvider } from "./context/pending-request.context";
import AppThemeProvider from "./shared/theme";
import { container } from "tsyringe";
import { SERVICE_KEYS } from "./infrastructure/service-keys";

container.resolve(SERVICE_KEYS.TRACKING_SERVICE);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppThemeProvider>
    <PendingRequestProvider>
      <App />
    </PendingRequestProvider>
  </AppThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
