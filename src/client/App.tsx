import * as React from "react";
import { useMainContext } from "./context/MainContext";

function App(props) {
  const [mainContext, updateFunctions] = useMainContext();

  console.log("props", props);
  console.log("mainContext", mainContext);
  console.log("updateFunctions", updateFunctions);

  return <div> HMR Works </div>;
}

export default App;
