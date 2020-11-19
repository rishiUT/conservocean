import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Species from "./Species";
import SpeciesCard from "./SpeciesCard";
import SpeciesGrid from "./SpeciesGrid";

let container: any = null;
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

//Tests a species instance to make sure it renders something
it("Renders Species Instance", () => {
  act(() => {
    const test: any = { params: { id: 1 } };
    render(<Species match={test} />, container);
  });
  expect(container.textContent).not.toBe(null);
});

it("Renders a Species Card", () => {
  act(() => {
    const test: any = { params: { id: 1 } };
    render(<SpeciesCard sp={<Species match={test} />} />, container);
  });
  expect(container.textContent).not.toBe(null);
});

/*
it("Renders a Species Grid", () => {
  act(() => {
    render(<SpeciesGrid />, container);
  });
  //switch inside router
  expect(container.textContent).not.toBe(null);
});
*/
