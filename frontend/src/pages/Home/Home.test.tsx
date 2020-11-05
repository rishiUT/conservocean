import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Home from './Home'
import Hit from './HomeSearch'

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

it("Renders Home Page", () => {
  act(() => {
    render(<Home />, container);
  });
  expect(container.textContent).not.toBe(null);
})

/*
it("Renders a Search Hit", () => {
  //Pass in an example prop that has a hit that has a model
  act(() => {
    render(<Hit />, container);
  });
  expect(container.textContent).not.toBe(null);
})
*/