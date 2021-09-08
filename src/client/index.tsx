import * as React from "react";
import { render } from "react-dom";
import "./../assets/index.scss";
import App from "./App";
import { MainContextProvider } from "./context/MainContext";

// console.log("index test");
// <MainContextProvider testProp={"testProp"}>
// </MainContextProvider>,

render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./App.tsx", () => {
    console.log("***** HMR: module.hot.accept(./App.tsx)");
  });
}
