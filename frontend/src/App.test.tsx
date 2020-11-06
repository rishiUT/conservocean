import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

//Tests the entire app to ensure it renders something
it("Renders the App as a Whole", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.textContent).not.toBe(null);
});
