import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Species from "../src/pages/Species/Species";
import Impacts from "../src/pages/Impact/Impacts";
import WaterBodies from "../src/pages/WaterBodies";
import About from "../src/pages/WaterBodies";
import Home from "../src/pages/Home/Home";

describe("Home Function", () => {
  // test stuff
  test("it should return html for the home page", () => {
    expect(Home()).toEqual(!null);
  });
});
