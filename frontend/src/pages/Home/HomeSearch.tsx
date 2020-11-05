import React from "react";
import { Highlight } from "react-instantsearch-dom";

import WBCard from "../WaterBody/WaterBodyCard";
import SpeciesCard from "../Species/SpeciesCard";
import ImpactCard from "../Impact/ImpactCard";

function Hit(props: any) {
  // Load a different card based on what type of model the hit is
  if (props.hit.model === "fish") {
    return <SpeciesCard className="card-cont" sp={props.hit} />;
  } else if (props.hit.model === "bodies_of_water") {
    return <WBCard className="card-cont" body={props.hit} />;
  } else {
    return <ImpactCard impact={props.hit} />
  }
}

export default Hit;