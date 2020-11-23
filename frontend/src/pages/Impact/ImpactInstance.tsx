import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "../../parts/Map";
import { roundFloat } from "../../util/format";
import PPHM from "../Media/PlasticPollutionHeatMap.png";
import PageContainer from "../../parts/PageContainer";

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
  imageurl?: string;

  location?: any[];
  fish?: any[];
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

  const details = [
    { label: "Name", value: impact.name },
    { label: "Category", value: impact.category },
    { label: "Subcategory", value: impact.subcategory },
    { label: "Description", value: impact.description },
    { label: "Date", value: impact.date },
    { label: "Latitude", value: roundFloat(String(impact.latitude), 3) },
    { label: "Longitude", value: roundFloat(String(impact.longitude), 2) },
    { label: "Oil Spilled", value: impact.oil_amount, unit: " gallons" },
    {
      label: "0.33-1.00mm pieces of plastic per km²",
      value: impact.count_density_1,
    },
    {
      label: "1.01-4.75mm pieces of plastic per km²",
      value: impact.count_density_2,
    },
    {
      label: "4.76-200mm pieces of plastic per km²",
      value: impact.count_density_3,
    },
    {
      label: "200+ mm pieces of plastic per km²",
      value: impact.count_density_4,
    },
    { label: "Plant Rating", value: impact.plant_rating },
    { label: "Plant Location", value: impact.plant_location },
    { label: "Plant Water Source", value: impact.plant_water_source },
  ];

  return impact ? (
    <PageContainer>
      <h1 className="text-center">{impact.name} </h1>

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

      <div className="row my-2">
        <div className="col-md my-2">
          {impact.subcategory === "plastic_pollution" ? (
            <img
              className="rounded"
              src={PPHM}
              alt="Plastic Pollution Heat Map"
              width="100%"
            />
          ) : (
            <img className="rounded" src={impact.imageurl} alt={impact.name} />
          )}
        </div>
        <div className="col-md py-2">
          <h3>Impact Details</h3>
          <ul>
            {details.map((attribute) => {
              if (attribute.value) {
                return (
                  <li key={attribute.label}>
                    {attribute.label + ": "}
                    {attribute.value}
                    {attribute.unit}
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>

      <div className="related-items">
        {impact.location && impact.location.length > 0 ? (
          <div className="related-locations">
            <h4 style={{ textAlign: "center" }} className="pt-5 pb-3">
              Impacted Locations:
            </h4>
            <div className="card-columns">
              {impact.location?.map((waterBody: any) => (
                <div
                  key={waterBody.id}
                  className="card bg-dark"
                  style={{ color: "white" }}
                >
                  <a
                    href={`/water-bodies/${waterBody.id}`}
                    className="card-link"
                  >
                    <span
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        zIndex: 1,
                      }}
                    ></span>
                  </a>
                  <img className="card-img" src={waterBody.image} alt="Card" />
                  <div
                    className="card-img-overlay"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(255, 255, 255, 0), rgba(56, 126, 159, 0.5)",
                    }}
                  >
                    <h5 className="card-title">{waterBody.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {impact.fish && impact.fish.length > 0 ? (
          <div className="related-locations">
            <h4 style={{ textAlign: "center" }} className="pt-5 pb-3">
              Impacted Species:
            </h4>
            <div className="card-columns">
              {impact.fish?.map((species: any) => (
                <div
                  key={species.id}
                  className="card bg-dark"
                  style={{ color: "white" }}
                >
                  <a href={`/species/${species.id}`} className="card-link">
                    <span
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        zIndex: 1,
                      }}
                    ></span>
                  </a>
                  <img className="card-img" src={species.image} alt="Card" />
                  <div
                    className="card-img-overlay"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(255, 255, 255, 0), rgba(56, 126, 159, 0.5)",
                    }}
                  >
                    <h5 className="card-title">{species.scientific_name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </PageContainer>
  ) : (
    <div>Loading... </div>
  );
}

export default Impact;
