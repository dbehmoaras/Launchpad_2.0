import { render } from "@testing-library/react";
import { MainContextProvider } from "../../src/client/context/MainContext";

const renderWithContext = (ui, options) => {
  return render(ui, { wrapper: MainContextProvider, ...options });
};

//re-export everything
export * from "@testing-library/react";
export * from "@testing-library/jest-dom";
export { renderWithContext as render };
