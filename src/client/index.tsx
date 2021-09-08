import * as React from "react";
import { render } from "react-dom";
import "./../assets/index.scss";
import App from "./App";
import { MainContextProvider } from "./context/MainContext";

// console.log("index test");

render(
  <MainContextProvider testProp={"testProp"}>
    <App />
  </MainContextProvider>,
  document.getElementById("root")
);
