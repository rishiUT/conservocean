import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Home from "./Home";
import Hit from "./HomeSearch";

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

//Tests the Home Page
it("Renders Home Page", () => {
  act(() => {
    render(<Home />, container);
  });
  expect(container.textContent).not.toBe(null);
});

//Tests a search Hit
it("Renders Search Hit", () => {
  act(() => {
    const test: any = {
      model: "fish",
      match: { params: { id: 1 } },
    };
    render(<Hit hit={test} />, container);
  });
  expect(container.textContent).not.toBe(null);
});
