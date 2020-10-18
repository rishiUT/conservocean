import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

interface species {
  scientific_name?: string,
  common_name?: string,
  species?: string,
  genus?: string,
  family?: string,
  habitat?: string,
  endanger_status?: string,
  population_trend?: string,
  average_size?: string,
  picture_url?: string,
  description?: string,
  speccode?: string,
  catch_year?: string,
  catch_rate?: string,
  human_impact_ids?: string,

  region?: string
  fishingRate?: string
  populationStatus?: string
  habitatDescription?: string
  physicalDescription?: string
  fishingImpacts?: string
  harvest?: string
  biology?: string
  imagePath?: string
}

const SPECIES: species[] = [
  {
    common_name: "Shortfin Squid",
    genus: "Illex",
    species: "illecebrosus",
    region: "Greater Atlantic",
    fishingRate: "At recommended level.",
    populationStatus: "LC",
    habitatDescription:
      "<ul>\n<li>Shortfin squid live in deep and shallow waters on the continental shelf, continental slope, and open ocean depending on the season.</li>\n<li>They are found in nearshore waters of the Gulf of Maine during summer and fall.</li>\n<li>During spring, shortfin squid migrate onto the continental shelf, and during late fall, they migrate off the continental shelf.</li>\n<li>Their egg masses float in mid-water.</li>\n<li>Spawning occurs in the waters off Rhode Island and New Jersey.</li>\n</ul>\n",
    physicalDescription:
      "<ul>\n<li>Female shortfin squid range from 7 to 12 inches in mantle length, while males are 7 to 10.6 inches in mantle length.</li>\n<li>They can regulate their body color, but are primarily orange-colored with a brown stripe that extends along the top side of the mantle.</li>\n</ul>\n",
    fishingImpacts:
      "Fishing gears used to harvest shortfin squid have minimal impacts on habitat.",
    harvest:
      "<ul>\n<li>Commercial fishery\n<ul>\n<li>In 2018, commercial landings of shortfin squid totaled approximately 53 million pounds, and were valued at approximately $23.6 million.</li>\n<li>Fisheries for shortfin squid reflect the species’ seasonal migrations.</li>\n<li>The majority of landings come from Rhode Island and New Jersey.</li>\n<li>Harvested for bait domestically, and exported for bait and food.</li>\n</ul>\n</li>\n<li>Gear types, habitat impacts, and bycatch:\n<ul>\n<li>The majority of shortfin squid is harvested June 1 through October 31 using small-mesh bottom trawls. The fishery is open year round, but the squid aren’t available in commercial quantities year round.</li>\n<li>Sandy or muddy habitat, where squid are fished, is less sensitive to the impacts of trawling.</li>\n<li>Small-mesh bottom trawls can incidentally catch marine mammals and large pelagic species, including pilot whales, common dolphin, swordfish, and a variety of sharks, ray, and tuna species. Finfish such as butterfish, hakes, longfin squid, summer flounder, herring, spiny dogfish, and Atlantic mackerel are also incidentally caught in this fishery.</li>\n<li>Measures to prevent or minimize bycatch include:\n<ul>\n<li>Fishing must occur seaward of the 50-fathom depth line to reduce finfish and longfin inshore squid bycatch.</li>\n<li>Outreach to fishermen to educate them on actions to take in the event of a marine mammal interaction.</li>\n<li>Real-time communication to vessels regarding hotspots of marine mammal interactions.</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n",
    biology:
      '<ul>\n<li>Shortfin squid live for less than one year. They have a high natural mortality rate, and a long spawning season.</li>\n<li>Females can release multiple egg masses during a single spawning season, but die after they spawn. Spawning can occur year round with seasonal peaks from October to June.</li>\n<li>Shortfin squid have extremely variable birth, growth, and maturity rates. This makes them extremely sensitive to climate-driven changes.&nbsp;</li>\n<li>They grow about one millimeter a day.</li>\n<li>Shortfin squid are visual predators that eat crustaceans, fish, and other squid, including their own species.</li>\n<li>They are food for many fish, including <a href="https://www.fishwatch.gov/profiles/western-atlantic-bluefin-tuna">bluefin tuna</a>, <a href="https://www.fishwatch.gov/profiles/silver-hake">silver hake</a>, <a href="https://www.fishwatch.gov/profiles/red-hake">red hake</a>, <a href="https://www.fishwatch.gov/profiles/bluefish">bluefish</a>, <a href="https://www.fishwatch.gov/profiles/monkfish">goosefish</a>, fourspot flounder, <a href="https://www.fishwatch.gov/profiles/atlantic-cod">Atlantic cod</a>, sea raven, <a href="https://www.fishwatch.gov/profiles/atlantic-spiny-dogfish">spiny dogfish</a>, and <a href="https://www.fishwatch.gov/profiles/north-atlantic-swordfish">swordfish</a>. Seabird predators include shearwaters, gannets, and fulmars.</li>\n<li>Shortfin squid undergo daily vertical migrations between cooler deep water and warmer surface water. They are nearest the seabed during the day, and higher in the water column during the night.</li>\n</ul>\n',
    picture_url:
      "https://www.fishwatch.gov/sites/default/files/Squid_Illex_NB_W.png",
  },
  {
    common_name: "Black Grouper",
    genus: "Mycteroperca",
    species: "bonaci",
    region: "Southeast",
    fishingRate:
      "Above target population levels in the Gulf of Mexico and South Atlantic.",
    populationStatus: "NT",
    habitatDescription:
      "<ul>\n<li>Juvenile black grouper can occur in seagrass and oyster rubble habitat in the Carolinas, and along reefs in the Florida Keys and in Brazil.</li>\n<li>Adults prefer rocky bottoms, drop-off walls and ledges, caves, crevices, and coral and artificial reefs.</li>\n<li>Black grouper are relatively sedentary and can remain in one particular site for some time.</li>\n<li>They move to progressively deeper waters as they age.</li>\n<li>They are found inshore up to depths of 656 feet (200 meters).</li>\n<li>Adults are solitary, but in some instances form small groups.</li>\n<li>Adults make seasonal migrations to spawning sites where they form large spawning aggregations.</li>\n</ul>\n",
    physicalDescription:
      "<ul>\n<li>Black grouper have an olive or gray body, with black blotches and brassy spots.</li>\n<li>Their cheeks are gently rounded.</li>\n</ul>\n",
    fishingImpacts:
      "Fishing gears used to harvest black grouper have minimal impacts on habitat.",
    harvest:
      '<ul>\n<li>Commercial fishery:\n<ul>\n<li>In 2018, commercial landings of black grouper totaled 93,500&nbsp;pounds and were valued at $451,500. Landings are primarily from the South Atlantic. There are limited landings in the U.S. Caribbean.</li>\n</ul>\n</li>\n<li>Gear types, habitat impacts, and bycatch:\n<ul>\n<li>Commercial fishermen mainly use hook-and-line gear, including longlines and handlines, to harvest black grouper.</li>\n<li>Trawl gear, fish traps, and bottom longlines are prohibited in some areas to reduce bycatch. Several areas are closed to all fishing to protect snappers and groupers, including black grouper.</li>\n<li>Sea turtles and other reef fishes, such as snappers and groupers, can be incidentally caught while fishing for black grouper.</li>\n<li>In certain areas, fishermen are required to use circle hooks to improve the chance of survival of any unintentionally caught fish and to reduce turtle hookings.</li>\n<li>Commercial and charterboat/headboat reef fish fishermen must use appropriate release gear and follow handling protocols to increase the chance of survival for any incidentally caught <a href="http://sero.nmfs.noaa.gov/sustainable_fisheries/gulf_sa/turtle_sawfish_release/index.html">sea turtles</a>.</li>\n<li>Fishermen are encouraged to use <a href="https://www.flseagrant.org/fisheries/venting/" rel="external">venting tools</a> or <a href="http://catchandrelease.org/descending-and-venting.html" rel="external">fish descenders</a> when fish are caught showing signs of barotrauma. Barotrauma occurs when reef fish are quickly brought to the surface by hook-and-line and the gas in their swim bladders expands. <a href="https://www.flseagrant.org/fisheries/venting/" rel="external">Venting tools</a> help deflate the expanded abdominal cavity, potentially reduce injury to the fish, and make it easier to return to deep water.</li>\n</ul>\n</li>\n<li>Recreational fishery:\n<ul>\n<li>Black grouper is a popular fish among recreational fishermen in the South Atlantic, Gulf of Mexico, and Caribbean.</li>\n<li>In the South Atlantic:\n<ul>\n<li>Annual catch limits and accountability measures.</li>\n<li>Bag and size limits.</li>\n<li>The fishery is closed during the spawning season (from January through April).</li>\n</ul>\n</li>\n<li>In the Gulf of Mexico:\n<ul>\n<li>Annual catch limits and accountability measures.</li>\n<li>Bag and size limits.</li>\n<li>The fishery is closed during the spawning season (from February 1 through March 31) in deep water (greater than 120 feet) to protect spawning aggregations.</li>\n</ul>\n</li>\n<li>In the U.S. Caribbean:\n<ul>\n<li>Annual catch limits</li>\n<li>Seasonal closure for black, red, tiger, yellowfin, and yellowedge groupers from February 1 through April 30.</li>\n<li>Bag and vessel limits.</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n',
    biology:
      "<ul>\n<li>Black grouper grow up to five feet long and can weigh up to 180 pounds.</li>\n<li>They can live up to 30 years old.</li>\n<li>They begin life as a female and some change into males as they grow – usually between two and four feet in length or 11 and 14 years old.</li>\n<li>The overall sex ratio is generally one male for every four females.</li>\n<li>Black grouper are solitary fish until spawning season, May through August, where they aggregate and spawn in huge numbers.</li>\n<li>Eggs are fertilized externally, and float with the currents.</li>\n<li>Young black grouper feed on crustaceans, mostly shrimp.</li>\n<li>Adults feed on other fish and squid.</li>\n<li>Black grouper have large, powerful jaws that they use to ambush their prey.</li>\n<li>They do not have teeth, and instead use their mouth and gills to suck up their prey.</li>\n<li>They also have teeth plates inside their throat that prevent prey from escaping after being swallowed.</li>\n<li>Black grouper take advantage of other species’ reproductive aggregations for feeding.</li>\n<li>Sharks prey upon large black grouper, while other grouper and moray eels prey upon smaller ones.</li>\n</ul>\n",
    picture_url:
      "https://www.fishwatch.gov/sites/default/files/black-grouper-illustration.png",
  },
  {
    common_name: "Atlantic Sharpnose Shark",
    genus: "Rhizoprionodon",
    species: "terraenovae",
    region: "Greater Atlantic, Southeast",
    fishingRate: "At recommended levels.",
    populationStatus: "LC",
    habitatDescription:
      "<ul>\n<li>Atlantic sharpnose sharks live in both warm-temperate and tropical waters, from the Bay of Fundy to the Yucatan.</li>\n<li>They can be found as deep as 920 feet, but mostly remain in waters less than 32 feet deep.</li>\n<li>They are commonly found in bays, estuaries, harbors, and the surf zone (area where waves break, commonly at 16 to 32 feet deep), mostly over mud and sand bottoms.</li>\n<li>Atlantic sharpnose sharks seasonally migrate between inshore and offshore waters, moving to deeper offshore waters in winter and returning to inshore waters in spring to mate and give birth.</li>\n<li>During migrations, they form large schools separated by sex.</li>\n</ul>\n",
    physicalDescription:
      "<ul>\n<li>Atlantic sharpnose sharks are small for sharks and have a streamlined body.</li>\n<li>They get their name from their long, pointy snout.</li>\n<li>They are several different shades of gray and have a white underside.</li>\n<li>Adults have white spots on their sides and white along the edges of their pectoral fins.</li>\n<li>Young sharks have black on their dorsal (back) and caudal (tail) fin edges.</li>\n<li>The lower and upper jaws of an Atlantic sharpnose shark have 24 or 25 rows of triangular teeth.</li>\n</ul>\n",
    fishingImpacts:
      "Fishing gears used to harvest Atlantic sharpnose shark have minimal impacts on habitat.",
    harvest:
      '<ul>\n<li>Commercial fishery:\n<ul>\n<li>In 2019, commercial landings of Atlantic sharpnose shark in the Atlantic and Gulf of Mexico totaled 534,800 pounds, and were valued at $232,800 according to the NOAA Fisheries <a href="https://foss.nmfs.noaa.gov/apexfoss/f?p=215:200:5350661937586::NO:::">commercial fishing landings database</a>. These figures may not match other agency sources of data due to confidential information.&nbsp;</li>\n<li>To commercially harvest Atlantic sharks, vessel owners must obtain a valid Atlantic shark directed or incidental limited access permit or a smoothhound shark open access permit. &nbsp;More information regarding limited access permits can be found in the <a href="https://www.fisheries.noaa.gov/atlantic-highly-migratory-species/atlantic-highly-migratory-species-fishery-compliance-guides">Atlantic HMS commercial compliance guide</a>.</li>\n<li>Atlantic sharpnose shark belong to the small coastal shark (SCS) complex. For SCS sharks, there is no retention limit per vessel per trip for commercial fishermen with a directed permit.</li>\n<li>They are harvested primarily off the east coast of Florida and North Carolina.</li>\n<li>Their meat is sold as seafood and also used by fishermen as bait for other larger species of shark.</li>\n</ul>\n</li>\n<li>Gear types, habitat impacts, and bycatch:\n<ul>\n<li>Commercial fishermen primarily use gillnet and bottom longline gear, which have minimal impacts on habitat due to how and where they are deployed.</li>\n<li>These gear types sometimes interact with sea turtles, marine mammals, and the endangered smalltooth sawfish.</li>\n<li>Several measures are in place to protect species that may be caught unintentionally in Atlantic sharpnose shark fisheries.</li>\n<li>Fishermen using bottom longline or gillnet gear must complete a protected species safe handling, release, and identification&nbsp;<a href="https://www.fisheries.noaa.gov/atlantic-highly-migratory-species/atlantic-protected-species-safe-handling-release-and">workshop</a>, and all bottom longline vessels must carry <a href="http://sero.nmfs.noaa.gov/sustainable_fisheries/gulf_sa/turtle_sawfish_release/index.html">sea turtle handling and release gear</a> on board.</li>\n<li>To reduce bycatch of finfish, including Atlantic sharpnose shark, shrimp trawlers are required to use <a href="https://www.sefsc.noaa.gov/labs/mississippi/brd/">bycatch reduction devices</a>, which are designed to retain shrimp but allow fish to exit the net.</li>\n</ul>\n</li>\n<li>Recreational fishery:\n<ul>\n<li>In 2019, approximately 386,400 Atlantic sharpnose sharks were caught recreationally in the United States.</li>\n<li>Recreational fishermen primarily use rod and reel gear, which have minimal impacts on habitat and bycatch.</li>\n<li>Recreational fishermen must have an Atlantic <a href="https://www.fisheries.noaa.gov/atlantic-highly-migratory-species/atlantic-highly-migratory-species-permits">HMS permit</a> to harvest Atlantic sharpnose sharks in federal waters. As of January 1, 2018, all HMS recreational permit holders will need a “shark endorsement” to fish for, retain, possess, or land sharks.</li>\n<li>Fishermen fishing recreationally for sharks will be required to use circle hook in most places.&nbsp; For more information regarding these requirements, please refer to HMS regulations and the <a href="https://www.fisheries.noaa.gov/atlantic-highly-migratory-species/atlantic-highly-migratory-species-fishery-compliance-guides">Amendment 5b compliance guide</a>.</li>\n<li>There is no minimum size for Atlantic sharpnose sharks.</li>\n</ul>\n</li>\n</ul>\n',
    biology:
      "<ul>\n<li>Atlantic sharpnose sharks can grow to up to 32 inches in length.</li>\n<li>They grow and mature at different rates in the Atlantic and Gulf of Mexico.</li>\n<li>Females mature at around 2 years old in the Atlantic when they reach approximately 24 inches in length, and at around 1.3 years old in the Gulf of Mexico when they are approximately 25 inches in length.</li>\n<li>Atlantic sharpnose sharks have been observed to live up to 18 years.</li>\n<li>In both the Atlantic and Gulf of Mexico, Atlantic sharpnose sharks mate annually between mid-May and mid-July in inshore waters.</li>\n<li>After mating they migrate offshore to deeper waters.</li>\n<li>The mother feeds the pups through a placental sac and after a gestation period of 10 to 11 months the females return to nearshore areas to give birth in June.</li>\n<li>Litters average approximately four pups in both the Gulf of Mexico and Atlantic.</li>\n<li>Atlantic sharpnose sharks eat small fish, including menhaden, eels, silversides, wrasses, jacks, toadfish, and filefish. They also eat worms, shrimp, crabs, and mollusks.</li>\n<li>Large carnivorous fish, including large sharks, eat Atlantic sharpnose sharks.</li>\n</ul>\n",
    picture_url:
      "https://www.fishwatch.gov/sites/default/files/Atlantic_Sharpnosed_Shark_NB_W_smaller_0.png",
  },
];

// Display a grid of all available species
function SpeciesGrid() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path="/species">
        <div className="bg-light" style={{ height: "100%" }}>
          <div className="container">
            <h2 className="py-5 text-center">Species</h2>
            <div className="card-deck">
              {SPECIES.map((species) => (
                <SpeciesCard key={species.common_name} species={species} />
              ))}
            </div>
          </div>
        </div>
      </Route>
      <Route path={`${match.path}/:speciesId`} children={<Species />} />
    </Switch>
  );
}

function SpeciesCard({ species }: any) {
  let match = useRouteMatch();
  return (
    <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
      <Link
        to={`${match.url}/${species.common_name.replaceAll(" ", "-")}`}
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
      </Link>
      <img className="card-img-top" width="100%" src={species.picture_url}></img>
      <div className="card-body">
        <h5 className="card-title">{species.common_name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Genus: <span className="font-italic">{species.genus}</span>
        </li>
        <li className="list-group-item">
          Species: <span className="font-italic">{species.species}</span>
        </li>
        <li className="list-group-item">Region: {species.region}</li>
        <li className="list-group-item">Fishing Rate: {species.fishingRate}</li>
      </ul>
    </div>
  );
}

// Display content for an individual species page
function Species() {
  let { speciesId }: any = useParams();
  let species = SPECIES.find(
    (species) => species.common_name === speciesId.replaceAll("-", " ")
  );
  if (species) {
    return (
      <div className="bg-light">
        <main className="container py-5">
          <h1 className="text-center">{species.common_name} </h1>
          <div className="container" style={{ width: "80%" }}>

            {/* Display map here. */}
            {species.picture_url ? <img
              className="py-5"
              src={species.picture_url}
              width="100%"
              alt={species.common_name}
            ></img>
            : null}

            <h3>Impact Details</h3>
            <ul>
              {species.scientific_name ? <li>Scientific Name: {species.scientific_name}</li> : null}
              {species.common_name ? <li>Common Name: {species.common_name}</li> : null}
              {species.species ? <li>Species: {species.species}</li> : null}
              {species.genus ? <li>Genus: {species.genus}</li> : null}
              {species.family ? <li>Family: {species.family}</li> : null}
              {species.habitat ? <li>Habitat: {species.habitat}</li> : null}
              {species.endanger_status ? <li>Endangered Status: {species.endanger_status}</li> : null}
              {species.population_trend ? <li>Population Trend: {species.population_trend}</li> : null}
              {species.average_size ? <li>Average Size: {species.average_size}</li> : null}
              {species.description ? <li>Description: {species.description}</li> : null}
              {species.speccode ? <li>Spec Code: {species.speccode}</li> : null}
              {species.catch_year ? <li>Catch Year: {species.catch_year}</li> : null}
              {species.catch_rate ? <li>Catch Rate: {species.catch_rate}</li> : null}
              {species.human_impact_ids ? <li>Human Impacts that Affect the Species: {species.human_impact_ids}</li> : null}
            </ul>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="py-5 container">
      <h3 className="text-center">Impact not found.</h3>
    </div>
  );
}

export default SpeciesGrid;
