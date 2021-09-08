import { render } from "@testing-library/react";
// import { ContextDetailsProvider } from "../context/OrderDetails";

const renderWithContext = (ui, options) => {
  return render(ui, { wrapper: ContextProvider, ...options });
};

//re-export everything
export * from "@testing-library/react";
export { renderWithContext as render };
