import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import About from "./About";
import UserCard from "./AboutUsers";
import ToolCard from "./AboutTools";

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
});

it("Renders a User Card", () => {
  act(() => {
    const user: any = {
      name: "test",
      id: "test",
      commits: 12,
      issues: 12,
      unitTests: 15,
      image: "string",
    };
    render(<UserCard user />, container);
  });
  expect(container.textContent).not.toBe(null);
});

it("Renders a Tool Card", () => {
  act(() => {
    const tool: any = {
      name: "test",
      id: "test",
      commits: 0,
      issues: 12,
      unitTests: 15,
      image: "string",
    };
    render(<ToolCard tool />, container);
  });
  expect(container.textContent).not.toBe(null);
});
