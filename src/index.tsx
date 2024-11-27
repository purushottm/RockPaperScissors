import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { store } from "./shared/store";
import { theme } from "./shared/styles/theme";
import { GlobalStyles } from "./shared/styles/globalStyles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
