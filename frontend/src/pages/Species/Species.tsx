import React, { useState, useEffect } from "react";
import axios from "axios";
import PageContainer from "../../parts/PageContainer";
import "./species.css";

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

  const details = [
    { label: "Family", value: <i>{species.family}</i> },
    { label: "Genus", value: <i>{species.genus}</i> },
    { label: "Species", value: <i>{species.species}</i> },
    { label: "Habitat", value: HABITATS[species.habitat as string] },
    {
      label: "Endangered Status",
      value: IUCN_STATUS[species.endanger_status as string],
    },
    { label: "Population Trend", value: species.population_trend },
    { label: "Average Size", value: species.average_size, unit: "cm" },
    { label: "Description", value: species.description },
    { label: "Spec. Code", value: species.speccode },
    { label: "Catch Year", value: species.catch_year },
    { label: "Catch Rate", value: species.catch_rate },
  ];

  // Return data
  return species ? (
    <PageContainer>
      <h1 className="text-center">{species.common_name} </h1>
      {species.picture_url ? (
        <img
          className="spec-image rounded"
          src={species.picture_url}
          width="70%"
          alt={species.common_name}
        ></img>
      ) : null}

      <h3>Species Details</h3>
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

      <div className="related-items">
        {species.location && species.location.length > 0 ? (
          <div className="related-locations">
            <h4 style={{ textAlign: "center" }} className="pt-5 pb-3">
              Locations:
            </h4>
            <div className="card-columns">
              {species.location?.map((waterBody: any) => (
                <div
                  key={waterBody.name}
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

        {/* Display links to any related impact instances */}
        {species.human_impact_ids &&
        (species.human_impact_ids.plastic_pollution.length > 0 ||
          species.human_impact_ids.coal_power_plants.length > 0 ||
          species.human_impact_ids.offshore_oil_spills.length > 0 ||
          species.human_impact_ids.tanker_oil_spills.length > 0) ? (
          <div className="related-impacts">
            <h4 style={{ textAlign: "center" }} className="pt-5 pb-3">
              Impacting factors:
            </h4>
            <div className="card-columns">
              {species.human_impact_ids.plastic_pollution
                .concat(
                  species.human_impact_ids.coal_power_plants,
                  species.human_impact_ids.offshore_oil_spills,
                  species.human_impact_ids.tanker_oil_spills
                )
                .map((impact: any) => (
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
            )
          </div>
        ) : null}
      </div>
    </PageContainer>
  ) : (
    <div>Loading...</div>
  );
}

export default Species;
