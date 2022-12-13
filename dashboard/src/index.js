import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { ContextProvider } from './context/Context';
import { Routes, Route} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <ContextProvider>
          <App />
      </ContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
