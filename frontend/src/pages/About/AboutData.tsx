import joe from "../Media/joe_profile.jpg";
import rishi from "../Media/rishi.png";
import serena from "../Media/serena.jpg";
import andy from "../Media/andy.jpg";
import christine from "../Media/christine.jpg";
import dane from "../Media/dane.jpg";
import slack from "./AboutPageMedia/Slack.png";
import postman from "./AboutPageMedia/postman.png";
import gitlab from "./AboutPageMedia/gitlab.png";
import reactImg from "./AboutPageMedia/react.png";
import docker from "./AboutPageMedia/docker.jpeg";
import node from "./AboutPageMedia/node.png";
import ec2 from "./AboutPageMedia/ec2.png";
import algolia from "./AboutPageMedia/algolia.png";
import fishbase from "./AboutPageMedia/fishbase.gif";
import iucn from "./AboutPageMedia/iucn.png";
import bison from "./AboutPageMedia/bison.jpg";
import marine from "./AboutPageMedia/marine.jpg";
import openfish from "./AboutPageMedia/openfish.jpeg";
import arcgis from "./AboutPageMedia/arcgis.png";
import opendata from "./AboutPageMedia/opendata.png";

// Defining the information in stats, tools, data, and users to be displayed later
export const stats = [
  {
    name: "API Documentation",
    image: postman,
    description:
      "This is a Link to the Conservocean API Documentation on Postman.",
    link: "https://documenter.getpostman.com/view/12800288/TVKJxaRw",
  },
  {
    name: "Gitlab Repository",
    image: gitlab,
    description: "This is a Link to the Project's Repository on Gitlab.",
    link: "https://gitlab.com/joewallery/cs373-group12",
  },
];
export const tools = [
  {
    name: "Postman",
    image: postman,
    description: "Postman was used by our backend team to design our API.",
    link: "https://www.postman.com/",
  },
  {
    name: "Slack",
    image: slack,
    description: "Slack is used for all official team communication.",
    link: "https://www.slack.com/",
  },
  {
    name: "Gitlab",
    image: gitlab,
    description: "Gitlab is used for version control for our project's code.",
    link: "https://www.gitlab.com/",
  },
  {
    name: "React",
    image: reactImg,
    description: "React is used for development by our frontend team",
    link: "https://www.reactjs.org/",
  },
  {
    name: "Docker",
    image: docker,
    description:
      "Docker is used to create similar environments for us to work " +
      "within, making working seperately much easier.",
    link: "https://www.docker.com/",
  },
  {
    name: "Node.js and npm",
    image: node,
    description:
      "Node.js and npm are used to manage the project's installations and " +
      "dependencies.",
    link: "https://www.nodejs.org/",
  },
  {
    name: "EC2",
    image: ec2,
    description: "EC2 is used to host and deploy our project.",
    link: "https://aws.amazon.com/ec2/",
  },
  {
    name: "Algolia",
    image: algolia,
    description: "Algolia was use to implement searching.",
    link: "https://algolia.com",
  },
  {
    name: "React-select",
    image: reactImg,
    description:
      "React-select was used to implement the drop-down menu interfaces " +
      "for filtering and searching on the model pages.",
    link: "https://react-select.com",
  },
];
export const data = [
  {
    name: "FishBase API",
    image: fishbase,
    description:
      "FishBase stores basic information about fish, such as species, " +
      "common name, genus, etc.",
    link: "https://fishbaseapi.readme.io",
  },
  {
    name: "IUCN Red List API",
    image: iucn,
    description:
      "The IUCN Red List database stores information on the risk levels " +
      "of several species, indicating their risk of extinction.",
    link: "https://apiv3.iucnredlist.org/",
  },
  {
    name: "Bison USGS",
    image: bison,
    description:
      "Bison USGS stores information about the geographic location of " +
      "fish around the United States.",
    link: "https://bison.usgs.gov/#home",
  },
  {
    name: "Marine Regions",
    image: marine,
    description:
      "Marine Regions contains a large variety of information about " +
      "various geographic features, primarily features found in and " +
      "around water.",
    link: "https://marineregions.org",
  },
  {
    name: "Open Fisheries",
    image: openfish,
    description:
      "Open Fisheries has information regarding the yearly catch rate of " +
      "various fish, given a species name for the fish.",
    link: "https://openfisheries.org",
  },
  {
    name: "ArcGIS Hub",
    image: arcgis,
    description:
      "Arcgis Hub stores many API’s, one of which has information about " +
      "the microplastic density present in many major bodies of water.",
    link:
      "https://hub.arcgis.com/datasets/CESJ::estimate-of-plastic%20-" +
      "pollution-in-the-worlds-oceans-km2-200-mm/geoservice",
  },
  {
    name: "OpenDataSoft",
    image: opendata,
    description:
      "OpenDataSoft contains many API’s, one of which contains " +
      "information about world power plants, separated by category, such " +
      "as coal plants.",
    link:
      "https://data.opendatasoft.com/explore/dataset/world-power%20-" +
      "plants-list%40kapsarc/table/?disjunctive.plant_country&disjunctive" +
      "%20.plant_state&disjunctive.plant_status&disjunctive.%20" +
      "plant_type_of_ownership&disjunctive.plant_operating_company&" +
      "%20disjunctive.type",
  },
];
export const users = [
  {
    name: "Joe Wallery",
    id: "Joe Wallery",
    maj_resp: "Frontend, Project Leader for phase I",
    commits: 0,
    issues: 0,
    unitTests: 0,
    image: joe,
    bio:
      " Hi, I’m Joe! I’m a junior CS and math major from Houston. " +
      "For ConservOcean, I am primarily working on front-end development." +
      " In my free time, I also enjoy reading, cooking, and " +
      "watching movies!",
  },
  {
    name: "Rishi Salem",
    id: "Rishi Salem",
    maj_resp: "Frontend, Project Leader for phase II",
    commits: 0,
    issues: 0,
    unitTests: 0,
    image: rishi,
    bio:
      "Hi, my name is Rishi! I’m majoring in Computer Science and " +
      "Psychology. For this website, I primarily work on the frontend. " +
      "Also, I love to cook!",
  },
  {
    name: "Serena Zamarripa",
    id: "Serena Zamarripa",
    maj_resp: "Frontend, Project Leader for phase IV",
    commits: 0,
    issues: 0,
    unitTests: 0,
    image: serena,
    bio:
      "Hi, I'm Serena! This is my last semester here at UT. " +
      "For this project, I work on the frontend. Outside of CS I enjoy" +
      " painting, reading, and theatre.",
  },
  {
    name: "Andy Weng",
    id: "AndyWeng33252",
    maj_resp: "Backend, Project Leader for phase III",
    commits: 0,
    issues: 0,
    unitTests: 0,
    image: andy,
    bio:
      "Hi, I'm Andy! I’m a senior CS major and business minor from Plano." +
      " For ConservOcean, I primarily work on back-end development. " +
      "I enjoy listening to music and watching TV shows on my free time. " +
      "I also have a pug called Bean.",
  },
  {
    name: "Christine Tsou",
    id: "Christine Tsou",
    maj_resp: "Backend",
    commits: 0,
    issues: 0,
    unitTests: 0,
    image: christine,
    bio:
      "Hi, I'm Christine! I'm in my third year studying CS, and I " +
      "primarily work on back-end development for ConservOcean. Some " +
      "things I enjoy are listening to music and reading!",
  },
  {
    name: "Dane Strandboge",
    id: "Dane Strandboge",
    maj_resp: "Backend",
    commits: 0,
    issues: 0,
    unitTests: 0,
    image: dane,
    bio:
      "Hey, I'm Dane! I'm a 4th year CS major from Georgetown. I " +
      "primarily work on back-end development for ConservOcean. " +
      "I like listening to music and playing games in my free time.",
  },
];
