import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "../../parts/Map";
import PPHM from "../Media/PlasticPollutionHeatMap.png";

interface impact {
  id?: string;
  name?: string;
  category?: string;
  subcategory?: string;
  description?: string;
  date?: string;
  latitude?: string;
  longitude?: string;
  oil_amount?: string;
  count_density_1?: string;
  count_density_2?: string;
  count_density_3?: string;
  count_density_4?: string;
  plant_rating?: string;
  plant_location?: string;
  plant_water_source?: string;

  location?: string;
  capacity?: string;
  mapImgPath?: string;
}

// Display an information page for a specific impact
function Impact(props: any) {
  // Set initial state
  const initialImpactState: impact = {};

  // Getter and setter for impact state
  //impact is an impact, setImpact is a function you can use to change it
  const [impact, setImpact] = useState(initialImpactState);

  // Use useEffect to retrieve data from API
  useEffect(() => {
    const getImpact = async () => {
      const { data }: any = await axios(`/api/human/${props.match.params.id}/`);
      setImpact(data.data);
    };
    getImpact();

    // Let the linter know that there are no dependencies that will require
    // calling this function again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return impact ? (
    <div className="bg-light full-height">
      <main className="container py-5">
        <h1 className="text-center">{impact.name} </h1>
        <div className="container" style={{ width: "80%" }}>
          {impact.latitude && impact.longitude ? (
            <div style={{ width: "100%", height: "500px" }}>
              <Map
                lat={Number(impact.latitude)}
                lng={Number(impact.longitude)}
                zoom={4.75}
              />
            </div>
          ) : (
            <div />
          )}

          {impact.subcategory === "plastic_pollution" ? (
            <img src={PPHM} alt="Plastic Pollution Heat Map" />
          ) : null}

          <h3>Impact Details</h3>
          <ul>
            {impact.name ? <li>Name: {impact.name}</li> : null}
            {impact.category ? <li>Category: {impact.category}</li> : null}
            {impact.subcategory ? (
              <li>Subcategory: {impact.subcategory}</li>
            ) : null}
            {impact.description ? (
              <li>Description: {impact.description}</li>
            ) : null}
            {impact.date ? <li>Date: {impact.date}</li> : null}
            {impact.latitude ? <li>Latitude: {impact.latitude}</li> : null}
            {impact.longitude ? <li>Longitude : {impact.longitude}</li> : null}
            {impact.oil_amount ? (
              <li>Oil Spilled: {impact.oil_amount} gallons</li>
            ) : null}
            {impact.count_density_1 ? (
              <li>
                Num 0.33-1.00mm pieces of plastic per km^2:{" "}
                {impact.count_density_1}
              </li>
            ) : null}
            {impact.count_density_2 ? (
              <li>
                Num 1.01-4.75mm pieces of plastic per km^2:{" "}
                {impact.count_density_2}
              </li>
            ) : null}
            {impact.count_density_3 ? (
              <li>
                Num 4.76-200mm pieces of plastic per km^2:{" "}
                {impact.count_density_3}
              </li>
            ) : null}
            {impact.count_density_4 ? (
              <li>
                Num 200+mm pieces of plastic per km^2: {impact.count_density_4}
              </li>
            ) : null}
            {impact.plant_rating ? (
              <li>Plant Rating: {impact.plant_rating}</li>
            ) : null}
            {impact.plant_location ? (
              <li>Plant Location: {impact.plant_location}</li>
            ) : null}
            {impact.plant_water_source ? (
              <li>Plant Water Source: {impact.plant_water_source}</li>
            ) : null}
          </ul>
        </div>
      </main>
    </div>
  ) : (
    <div>Loading... </div>
  );
}

export default Impact;
