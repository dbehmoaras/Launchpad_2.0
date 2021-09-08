import React, { useState, useEffect } from "react";
import { useMainContext } from "./context/MainContext";
import axios from "axios";
import { Button } from "@material-ui/core";

function App(props) {
  const [mainContext, updateFunctions] = useMainContext();
  const [asyncState, setAsyncState] = useState({ test: false });
  const { updateForceEffect } = updateFunctions;
  const { forceEffect } = mainContext;

  // useEffect(() => {
  //   console.log("hit");
  //   getAsyncState().then((newAsyncState) => {
  //     setAsyncState(newAsyncState);
  //   });
  // }, [forceEffect]);

  const getAsyncState = async () => {
    return axios
      .get("http://localhost:3001/test")
      .then((res) => {
        const testObj = res.data;
        setAsyncState(testObj);
        // return testObj;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const component = asyncState.test ? (
    <div>TEST: TRUE</div>
  ) : (
    <div>TEST: FALSE</div>
  );
  // console.log(asyncState);
  // console.log(forceEffect);

  return (
    <div>
      <h1> Placeholder Header </h1>
      <div>{mainContext.stateOne.main}</div>
      <div>{mainContext.stateTwo.main}</div>
      <Button onClick={getAsyncState} variant="contained" color="primary">
        Click for Async
      </Button>
      {component}
    </div>
  );
}

export default App;
