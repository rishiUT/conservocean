import React from 'react';
import TestRenderer from 'react-test-renderer';
import Impact from './pages/Impacts'
import Home from './pages/Home/Home'

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";


/*
it('renders without crashing', () => {
  TestRenderer.create(<larry/>);
}); */

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