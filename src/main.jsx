import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import appStore from "./store/appStore";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
