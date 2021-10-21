import ReactDOM from "react-dom";
import "./styles/bootstrap.min.css";
import "./styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
