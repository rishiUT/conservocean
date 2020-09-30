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
    imagePath: "https://www.fishwatch.gov/sites/default/files/Squid_Illex_NB_W.png",
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
    imagePath: "https://www.fishwatch.gov/sites/default/files/black-grouper-illustration.png",
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
    imagePath: "https://www.fishwatch.gov/sites/default/files/Atlantic_Sharpnosed_Shark_NB_W_smaller_0.png",
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
      <img className="card-img-top" width="100%" src={species.imagePath}></img>
      <div className="card-body">
        <h5 className="card-title">{species.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Genus: <span className="font-italic">{species.genus}</span></li>
        <li className="list-group-item">Species: <span className="font-italic">{species.species}</span></li>
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
