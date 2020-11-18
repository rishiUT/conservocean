import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Impact from "./ImpactInstance";
import ImpactCard from "./ImpactCard";
import Impacts from "./Impacts";

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

//This mocks the map modules, which are not implemented by JSX
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

it("Renders an Impact Instance Page", () => {
  act(() => {
    render(<Impact />, container);
  });
  expect(container.textContent).not.toBe(null);
})


it("Renders an Impact Card", () => {
  act(() => {
    const data : any = {
      "id": 10,
      "category": "pollution",
      "subcategory": "plastic_pollution",
      "latitude": 21.47,
      "longitude": -63.59,
      "date": "10/1/2010",
      "description": null,
      "name": null,
      "oil_amount": null,
      "count_density_1": 4090.58,
      "count_density_2": 5317.76,
      "count_density_3": 409.06,
      "count_density_4": 0.0,
      "plant_rating": null,
      "plant_location": null,
      "plant_water_source": null,
      "locationname": ", ",
      "imageurl": "https://tse2.mm.bing.net/th?id=OIP.bcGOUUqTX-8sSf49VuRd7gHaGx&pid=Api",
      "model": "human_impact",
      "location": [
          {
              "id": 16,
              "name": "Bahía Fosforescénte"
          },
      ],
      "fish": [
          {
              "id": 8,
              "scientific_name": "Abudefduf taurus"
          },
      ]
  }

    //Needs dummy value
    render(<ImpactCard impact={data}/>, container);
  });
  expect(container.textContent).not.toBe(null);
})

/*
it("Renders an Impact Table", () => {
  act(() => {
    //Switch inside router
    render(<Impacts />, container);
  });
  expect(container.textContent).not.toBe(null);
})
*/
