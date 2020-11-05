import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Impact from './ImpactInstance'
import ImpactCard from './ImpactCard'
import Impacts from './Impacts'

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

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));

it("Renders an Impact Instance Page", () => {
  act(() => {
    render(<Impact />, container);
  });
  expect(container.textContent).not.toBe(null);
})

/*
it("Renders an Impact Card", () => {
  act(() => {
    //Needs dummy value
    render(<ImpactCard />, container);
  });
  expect(container.textContent).not.toBe(null);
})

it("Renders an Impact Table", () => {
  act(() => {
    //Switch inside router
    render(<Impacts />, container);
  });
  expect(container.textContent).not.toBe(null);
})
*/