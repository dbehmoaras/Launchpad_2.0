import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

const MainContext = createContext({});

export function useMainContext() {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
}

export function MainContextProvider(props) {
  const [loginState, setLoginState] = useState({
    status: false,
    userId: "",
  });
  const [stateOne, setStateOne] = useState({
    main: "ONE",
    details: "ONE_DETAILS_DEFAULT",
  });
  const [stateTwo, setStateTwo] = useState({
    main: "TWO",
    details: "TWO_DETAILS_DEFAULT",
  });
  const [forceEffect, triggerForceEffect] = useState(false);

  useEffect(() => {
    //insert logic for re-render on useEffect
    console.log("***** MAIN CONTEXT useEffect triggered by forceEffect *****");
  }, [forceEffect]);

  //optimization that keeps state memoized so lifecycle only runs on changes
  const value = useMemo(() => {
    const updateLoginState = (newUserId) => {
      const newLoginState = { ...loginState };
      newLoginState.userId = newUserId;
      if (newUserId.length > 0) newLoginState[status] = true;
      else newLoginState[status] = false;
      setLoginState(newLoginState);
    };
    const updateStateOne = (key, value) => {
      const newStateOne = { ...stateOne };
      newStateOne[key] = value;
      setStateOne(newStateOne);
    };
    const updateStateTwo = (key, value) => {
      const newStateTwo = { ...stateTwo };
      newStateTwo[key] = value;
      setStateTwo(newStateTwo);
    };
    const updateForceEffect = () => {
      triggerForceEffect(!forceEffect);
    };

    const updateFunctions = {
      updateLoginState,
      updateStateOne,
      updateStateTwo,
      updateForceEffect,
    };

    return [
      { ...loginState, ...stateOne, ...stateTwo, forceEffect },
      updateFunctions,
    ];
  }, [loginState, stateOne, stateTwo, forceEffect]);
  return <MainContext.Provider value={value} {...props} />;
}
