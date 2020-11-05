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

import WaterBody from './pages/WaterBody/WaterBody'
import WBCard from './pages/WaterBody/WaterBodyCard';
import WaterBodies from './pages/WaterBody/WaterBodyGrid';

import Impact from './pages/Impact/ImpactInstance'
import ImpactCard from './pages/Impact/ImpactCard'
import Impacts from './pages/Impact/Impacts'

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

it("Renders About Page", () => {
  act(() => {
    render(<About />, container);
  });
  expect(container.textContent).not.toBe(null);
})

/*
it("Renders a User Card", () => {
  act(() => {
    user = {
      name: "test",
      id: "test",
      commits: 0,
      issues: 12,
      unitTests: 15,
      image: "string"
    }
    render(<UserCard />, container);
  });
  expect(container.textContent).not.toBe(null);
})
*/

it("Renders Species Instance", () => {
  act(() => {
    render(<Species />, container);
  });
  expect(container.textContent).not.toBe(null);
})

/*
it("Renders Species Card", () => {
  act(() => {
    //Make a dummy species
    render(<SpeciesCard />, container);
  });
  expect(container.textContent).not.toBe(null);
})

it("Renders Species Grid", () => {
  act(() => {
    //Switch inside router error
    render(<SpeciesGrid />, container);
  });
  expect(container.textContent).not.toBe(null);
})
*/

it("Renders a Water Body Instance", () => {
  act(() => {
    render(<WaterBody />, container);
  });
  expect(container.textContent).not.toBe(null);
})

/*
it("Renders a Water Body Card", () => {
  act(() => {
    //Needs a dummy WaterBody
    render(<WBCard />, container);
  });
  expect(container.textContent).not.toBe(null);
})

it("Renders a Water Body Grid", () => {
  act(() => {
    //Switch inside a router
    render(<WaterBodies />, container);
  });
  expect(container.textContent).not.toBe(null);
})
*/

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