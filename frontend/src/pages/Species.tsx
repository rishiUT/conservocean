import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const SPECIES = [
  {
    name: "Shortfin Squid",
    genus: "Illex",
    species: "illecebrosus",
    region: "Greater Atlantic",
    fishingRate: "At recommended level.",
    populationStatus: "LC",
    habitatImpacts: "",
    physicalDescription: "",
    imagePath: "",
  },
  {
    name: "Black Grouper",
    genus: "Mycteroperca",
    species: "bonaci",
    region: "Southeast",
    fishingRate:
      "Above target population levels in the Gulf of Mexico and South Atlantic.",
    populationStatus: "NT",
    habitatImpacts: "",
    physicalDescription: "",
    imagePath: "",
  },
  {
    name: "Atlantic Sharpnose Shark",
    genus: "Rhizoprionodon",
    species: "terraenovae",
    region: "Greater Atlantic, Southeast",
    fishingRate: "At recommended levels.",
    populationStatus: "",
    habitatImpacts: "",
    physicalDescription: "",
    imagePath: "",
  },
];

// Display a grid of all available species
function Species() {
  let match = useRouteMatch();

  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/species">
          <div className="bg-light" style={{ height: "100%" }}>
            <div className="container">
              <h2 className="py-5 text-center">Species</h2>
              <div className="card-deck">
                {SPECIES.map((species) => (
                  <SpeciesCard key={species.name} species={species} />
                ))}
              </div>
            </div>
          </div>
        </Route>
        <Route path={`${match.path}/:specieId`} children={<Specie />} />
      </Switch>
    </div>
  );
}

function SpeciesCard({ species }: any) {
  let match = useRouteMatch();
  return (
    <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
      <Link to={`${match.url}/${species.name}`} className="card-link">
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
      </Link>
      <svg
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="225"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
        aria-label="Placeholder: Thumbnail"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#55595c" />
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">
          Thumbnail
        </text>
      </svg>
      <div className="card-body">
        <h5 className="card-title">{species.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Genus: {species.genus}</li>
        <li className="list-group-item">Species: {species.species}</li>
        <li className="list-group-item">Region: {species.region}</li>
        <li className="list-group-item">Fishing Rate: {species.fishingRate}</li>
      </ul>
    </div>
  );
}

// Display content for an individual species page
function Specie() {
  let { specieId }: any = useParams();
  let specie = SPECIES.find((specie) => specie.name === specieId);
  if (specie) {
    return <h3>Requested species ID: {specie.name}</h3>;
  }
  return <h3>Species not found</h3>;
}

export default Species;
