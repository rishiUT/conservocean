import React, { useState, useEffect } from "react";
import axios from "axios";

interface species {
  id?: number;
  scientific_name?: string;
  common_name?: string;
  species?: string;
  genus?: string;
  family?: string;
  habitat?: string;
  endanger_status?: string;
  population_trend?: string;
  average_size?: string;
  picture_url?: string;
  description?: string;
  speccode?: string;
  catch_year?: string;
  catch_rate?: string;
  human_impact_ids?: any;
  location?: any[];

  region?: string;
  fishingRate?: string;
  populationStatus?: string;
  habitatDescription?: string;
  physicalDescription?: string;
  fishingImpacts?: string;
  harvest?: string;
  biology?: string;
  imagePath?: string;
}

// Map each IUCN status code into its text description
const IUCN_STATUS: { [key: string]: string } = {
  NE: "Not evaluated",
  DD: "Data deficient",
  LC: "Least concern",
  NT: "Near threatened",
  VU: "Vulnerable",
  EN: "Endangered",
  CR: "Critically endangered",
  EW: "Extinct in the wild",
  EX: "Extinct",
};

// Map habitat code into text description
const HABITATS: { [key: string]: string } = {
  "-1 -1 -1": "freshwater, brackish water, saltwater",
  "-1 -1 0": "freshwater, brackish water",
  "-1 0 -1": "freshwater, saltwater",
  "-1 0 0": "freshwater",
  "0 -1 -1": "brackish water, saltwater",
  "0 -1 0": "brackish water",
  "0 0 -1": "saltwater",
};

// Display content for an individual species page
function Species(props: any) {
  // Set initial state
  const initialSpeciesState: species = {};

  // Getter and setter for species state
  const [species, setSpecies] = useState(initialSpeciesState);

  // Use useEffect to retrieve data from API
  useEffect(() => {
    const getSpecies = async () => {
      // Pass param to the API call
      const { data }: any = await axios.get(
        `/api/fish/${props.match.params.id}/`
      );
      // Update state
      setSpecies(data.data);
    };
    // Invoke the async function
    getSpecies();

    // Let the linter know that there are no dependencies that will require
    // calling this function again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return data
  return species ? (
    <div className="bg-light full-height">
      <main className="container py-5">
        <h1 className="text-center">{species.common_name} </h1>
        <div className="container" style={{ width: "80%" }}>
          {species.picture_url ? (
            <img
              className="py-5"
              src={species.picture_url}
              width="100%"
              alt={species.common_name}
            ></img>
          ) : null}

          <h3>Species Details</h3>
          <ul>
            {species.family ? (
              <li>
                {" "}
                Family: <i>{species.family}</i>
              </li>
            ) : null}
            {species.genus ? (
              <li>
                Genus: <i>{species.genus}</i>
              </li>
            ) : null}
            {species.species ? (
              <li>
                Species: <i>{species.species}</i>
              </li>
            ) : null}
            {species.habitat ? (
              <li>Habitat: {HABITATS[species.habitat]}</li>
            ) : null}
            {species.endanger_status ? (
              <li>Endangered Status: {IUCN_STATUS[species.endanger_status]}</li>
            ) : null}
            {species.population_trend ? (
              <li>Population Trend: {species.population_trend}</li>
            ) : null}
            {species.average_size ? (
              <li>Average Size: {species.average_size} cm</li>
            ) : null}
            {species.description ? (
              <li>Description: {species.description}</li>
            ) : null}
            {species.speccode ? <li>Spec. Code: {species.speccode}</li> : null}
            {species.catch_year ? (
              <li>Catch Year: {species.catch_year}</li>
            ) : null}
            {species.catch_rate ? (
              <li>Catch Rate: {species.catch_rate}</li>
            ) : null}
          </ul>
          <div className="related-items">
            {species.location && species.location.length > 0 ? (
              <div className="related-locations">
                <h4>Locations:</h4>
                <ul>
                  {species.location?.map((loc) => {
                    return (
                      <li>
                        <a href={`/water-bodies/${loc.id}`}>{loc.name} </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            {species.human_impact_ids &&
            (species.human_impact_ids.plastic_pollution.length > 0 ||
            species.human_impact_ids.coal_power_plants.length > 0  ||
            species.human_impact_ids.offshore_oil_spills.length > 0  ||
            species.human_impact_ids.tanker_oil_spills.length > 0 ) ? (
              <div className="related-impacts">
                <h4>Impacting factors:</h4>
                <ul>
                  {species.human_impact_ids?.plastic_pollution.sort().map((id: any) => {
                  return <li><a href={`/impacts/${id}`}>Plastic Pollution (Sampling Location {id})</a></li>
                })}
                {species.human_impact_ids?.coal_power_plants.sort().map((id: any) => {
                  return <li><a href={`/impacts/${id}`}>Coal Power Plant #{id}</a></li>
                })}
                {species.human_impact_ids?.offshore_oil_spills.sort().map((id: any) => {
                  return <li><a href={`/impacts/${id}`}>Offshore Oil Spill #{id}</a></li>
                })}
                {species.human_impact_ids?.tanker_oil_spills.sort().map((id: any) => {
                  return <li><a href={`/impacts/${id}`}>Tanker Oil Spill #{id}</a></li>
                })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Species;
