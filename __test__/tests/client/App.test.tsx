import { render, screen } from "./../../utils/testing-library-utils";
import App from "../../../src/client/App";
import * as React from "react";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom/extend-expect";

/**
 * @jest-environment jsdom
 */

describe("App.tsx Suite: UI & Context", () => {
  let AppHeader;
  let Button;
  beforeEach(() => {
    render(<App />);
    AppHeader = screen.getByRole("heading", {
      name: /placeholder header/i,
    });
    Button = screen.getByRole("button", { name: /click for async/i });
  });
  test("checks if inner HTML of App component matches Placeholder Div", () => {
    expect(AppHeader).toHaveTextContent("Placeholder Header");
  });
  test("checks if the provider is working", () => {
    const contextOne = screen.getByText(/one/i);
    const contextTwo = screen.getByText(/two/i);

    expect(contextOne).toBeInTheDocument();
    expect(contextTwo).toBeInTheDocument();
  });
  test("checks if the button renders", () => {
    expect(Button).toBeInTheDocument();
  });
});

describe("App.tsx Suite: Async", () => {
  let Button;
  let AsyncComp;
  beforeEach(() => {
    render(<App />);
    Button = screen.getByRole("button", { name: /click for async/i });
    AsyncComp = screen.getByText(/^test: /i);
  });

  test("checks if initial async state is false by checking the rendered text", () => {
    expect(AsyncComp).toHaveTextContent(/test: false/i);
  });

  test("checks if state updates to true after click", async () => {
    userEvent.click(Button);
    const AsyncCompUpdate = await screen.findByText("TEST: TRUE");
    expect(AsyncCompUpdate).toHaveTextContent(/test: true/i);
  });
});
