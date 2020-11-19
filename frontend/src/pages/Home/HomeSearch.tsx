import React from "react";

import WBCard from "../WaterBody/WaterBodyCard";
import SpeciesCard from "../Species/SpeciesCard";
import ImpactCard from "../Impact/ImpactCard";

// Returns the search "hits" in the form of cards
// so the styling will match the rest of the site
function Hit(props: any) {
  // Load a different card based on what type of model the hit is
  if (props.hit.model === "fish") {
    return <SpeciesCard className="card-cont" sp={props.hit} />;
  } else if (props.hit.model === "bodies_of_water") {
    return <WBCard className="card-cont" body={props.hit} />;
  } else {
    return <ImpactCard impact={props.hit} />;
  }
}

export default Hit;
