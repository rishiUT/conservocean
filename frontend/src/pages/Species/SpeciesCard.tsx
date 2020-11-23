import React from "react";

// Defines information expected from a species object
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
  human_impact_ids?: string;

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

// Wraps a species in a card that displays the fish's information
function SpeciesCard(props: any) {
  return (
    <div className={`col-lg-4 col-md-6 col-sm-12 ${props.className}`}>
      <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
        <a href={`species/${props.sp.id}`} className="card-link">
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
        <img
          className="card-img-top"
          width="100%"
          src={props.sp.picture_url ? props.sp.picture_url : props.sp.imageurl}
          alt=""
        ></img>
        <div className="card-body">
          <h5
            className="card-title"
            dangerouslySetInnerHTML={{ __html: props.sp.common_name }}
          ></h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Genus:{" "}
            <span
              className="font-italic"
              dangerouslySetInnerHTML={{ __html: props.sp.genus }}
            ></span>
          </li>
          <li className="list-group-item">
            Species:{" "}
            <span
              className="font-italic"
              dangerouslySetInnerHTML={{ __html: props.sp.species }}
            ></span>
          </li>
          <li className="list-group-item">
            Endangered Status:{" "}
            {
              IUCN_STATUS[
                props.sp.endanger_status ? props.sp.endanger_status : "DD"
              ]
            }
          </li>
          <li className="list-group-item">
            Average Size: {props.sp.average_size} cm
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SpeciesCard;
