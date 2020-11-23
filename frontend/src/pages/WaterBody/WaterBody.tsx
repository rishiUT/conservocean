import React, { useState, useEffect } from "react";
import axios from "axios";

import { roundFloat } from "../../util/format";

import Map from "../../parts/Map";
import PageContainer from "../../parts/PageContainer";

// Interface defines what information to expect in waterbody object
interface waterBody {
  id?: number;
  latitude?: string;
  longitude?: string;
  max_latitude?: string;
  max_longitude?: string;
  min_latitude?: string;
  min_longitude?: string;
  name?: string;
  salinity?: string;
  size?: number;
  type?: string;
  water_temp?: string;
  wind_speedkmph?: string;
  locationname?: string;
  imageurl?: string;

  fish?: any[];
  human_impact_ids?: any[];
}

// Display data page on a particular body of water
function WaterBody(props: any) {
  // Set initial state
  const initialWaterState: waterBody = {};

  // Getter and setter for species state
  const [body, setWaterBody] = useState(initialWaterState);

  // Use useEffect to retrieve data from API
  useEffect(() => {
    const getWaterBody = async () => {
      // Pass param to the API call
      //const { data }: any = await useAxios(
      const { data }: any = await axios(`/api/water/${props.match.params.id}/`);
      // Update state
      setWaterBody(data.data);
    };
    // Invoke the async function
    getWaterBody();

    // Let the linter know that there are no dependencies that will require
    // calling this function again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const details = body
    ? [
        { label: "Name", value: body.name },
        { label: "Location", value: body.locationname },
        { label: "Type", value: body.type },
        { label: "Latitude", value: roundFloat(String(body.latitude), 3) },
        { label: "Longitude", value: roundFloat(String(body.longitude), 3) },
        {
          label: "Size",
          value: roundFloat(String(body.size), 3),
          unit: " sq. km",
        },
        {
          label: "Water Temperature",
          value: body.water_temp,
          unit: "°C",
        },
        {
          label: "Average Wind Speed",
          value: body.wind_speedkmph,
          unit: " km/h",
        },
      ]
    : [];

  // Return data
  return body ? (
    <PageContainer>
      <h1 className="text-center">{body.name} </h1>
      {body.latitude && body.longitude ? (
        <div style={{ width: "100%", height: "500px" }}>
          <Map
            lat={Number(body.latitude)}
            lng={Number(body.longitude)}
            zoom={4}
          />
        </div>
      ) : (
        <div></div>
      )}

      <div className="row my-2">
        <div className="col-md my-2">
          <img
            className="rounded"
            src={body.imageurl}
            alt={body.name}
            width="100%"
          />
        </div>
        <div className="col-md py-2">
          <h3>Region Data</h3>
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
        {body.fish && body.fish.length > 0 ? (
          <div className="related-fish">
            <h4 style={{ textAlign: "center" }} className="pt-5 pb-3">
              Related Species:
            </h4>
            <div className="card-columns">
              {body.fish?.map((species: any) => (
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
                    <h5 className="card-title">{species.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {body.human_impact_ids && body.human_impact_ids.length > 0 ? (
          <div className="related-impacts">
            <h4 style={{ textAlign: "center" }} className="pt-5 pb-3">
              Related Impacts:
            </h4>
            <div className="card-columns">
              {body.human_impact_ids?.map((impact: any) => (
                <div
                  key={impact.id}
                  className="card bg-dark"
                  style={{ color: "white" }}
                >
                  <a href={`/impacts/${impact.id}`} className="card-link">
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
                  <img className="card-img" src={impact.image} alt="Card" />
                  <div
                    className="card-img-overlay"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(255, 255, 255, 0), rgba(56, 126, 159, 0.5)",
                    }}
                  >
                    <h5 className="card-title">
                      {impact.name
                        ? impact.name
                        : "Plastic Pollution Sample #" + impact.id}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </PageContainer>
  ) : (
    <div>Loading...</div>
  );
}

export default WaterBody;
