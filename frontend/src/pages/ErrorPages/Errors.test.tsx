import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Error404 from "./Error404";
import MysteryError from "./NoErrorCode";
import NoResponseError from "./NoResponse";
import ErrorPage from "./UnknownError";

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
it("Renders Error Page for 404", () => {
  act(() => {
    const test: any = { params: { id: 1 } };
    render(<Error404 />, container);
  });
  expect(container.textContent).not.toBe(null);
});

it("Renders Error Page for Unknown Error", () => {
  act(() => {
    const test: any = { params: { id: 1 } };
    render(<MysteryError />, container);
  });
  expect(container.textContent).not.toBe(null);
});

it("Renders Page for No Response", () => {
  act(() => {
    render(<NoResponseError />, container);
  });
  expect(container.textContent).not.toBe(null);
});

//Tests a species instance to make sure it renders something
it("Renders Error Page for Most Error Codes", () => {
  act(() => {
    const test: any = { errorid: 300 };
    render(<ErrorPage test />, container);
  });
  expect(container.textContent).not.toBe(null);
});
