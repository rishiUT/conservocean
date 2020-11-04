import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import About from './pages/About/About'
import UserCard from './pages/About/AboutUsers'

import Home from './pages/Home/Home'
import Hit from './pages/Home/HomeSearch'

import Species from './pages/Species/Species'
import SpeciesCard from './pages/Species/SpeciesCard';
import SpeciesGrid from './pages/Species/SpeciesGrid';

//import WaterBody from './pages/WaterBodies/WaterBodies'
import WBCard from './pages/WaterBodies/WaterBodyCard';
//import WaterBodies from './pages/WaterBodies/WaterBodyGrid';

//import Impact from './pages/Impact/ImpactInstance'
//import Impacts from './pages/Impact/Impacts'

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

it("Renders SpeciesGrid", () => {
  act(() => {
    render(<SpeciesGrid />, container);
  });
  expect(container.textContent).not.toBe(null);
})


it("Renders SpeciesCard", () => {
  act(() => {
    render(<SpeciesCard />, container);
  });
  expect(container.textContent).not.toBe(null);
})

it("Renders WBCard", () => {
  act(() => {
    render(<WBCard />, container);
  });
  expect(container.textContent).not.toBe(null);
})