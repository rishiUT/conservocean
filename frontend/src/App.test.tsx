import React from 'react';
import TestRenderer from 'react-test-renderer';
import Larry from './pages/larry'
import Impact from './pages/Impact/Impacts'

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

it("renders with or without a name", () => {
  act(() => {
    render(<Larry />, container);
  });
  expect(container.textContent).toBe("Larry");
})
