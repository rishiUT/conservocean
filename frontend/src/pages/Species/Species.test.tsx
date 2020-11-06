import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Species from "./Species";
import SpeciesCard from "./SpeciesCard";
import SpeciesGrid from "./SpeciesGrid";

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

//Tests a species instance to make sure it renders something
it("Renders Species Instance", () => {
  act(() => {
    render(<Species />, container);
  });
  expect(container.textContent).not.toBe(null);
});