import React, { useState, useEffect } from "react";
import axios from "axios";

import Map from "../../parts/Map";

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
      const { data }: any = await axios.get(
        `/api/water/${props.match.params.id}/`
      );
      // Update state
      setWaterBody(data.data);
    };
    // Invoke the async function
    getWaterBody();

    // Let the linter know that there are no dependencies that will require
    // calling this function again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return data
  return body ? (
    <div className="bg-light full-height">
      <main className="container py-5" style={{ height: "100%" }}>
        <h1 className="text-center">{body.name} </h1>
        <div className="container" style={{ width: "80%" }}>
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

          <h3>Region Data</h3>
          <ul>
            {body.name ? <li>Name: {body.name}</li> : null}
            {body.type ? <li>Type: {body.type}</li> : null}
            {body.latitude ? <li>Latitude: {body.latitude}</li> : null}
            {body.longitude ? <li>Longitude: {body.longitude}</li> : null}
            {body.water_temp ? (
              <li>Water Temperature: {body.water_temp}°C</li>
            ) : null}
            {body.salinity ? (
              <li>Salinity: {body.salinity} g salt per kg water</li>
            ) : null}
            {/* (fish: body.fish) => (
                      <li><Link to=`species/${fish.id}` className="card-link"> 
                          {fish.scientific_name}</Link><li>
                    ) */}
          </ul>
        </div>
      </main>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default WaterBody;
