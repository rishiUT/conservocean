import React from 'react';
import TestRenderer from 'react-test-renderer';
import About from './pages/About'
import Home from './pages/Home/Home'
import Species from './pages/Species/Species'
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

it("Renders About Page", () => {
  act(() => {
    render(<About />, container);
  });
  expect(container.textContent).not.toBe(null);
})

it("Renders Home Page", () => {
  act(() => {
    render(<Home />, container);
  });
  expect(container.textContent).not.toBe(null);
})

it("Renders Impacts Page", () => {
  act(() => {
    render(<Species />, container);
  });
  expect(container.textContent).not.toBe(null);
})