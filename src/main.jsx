import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import Comments from "./Components/Comments";

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <App />
  </Provider>
  
);
