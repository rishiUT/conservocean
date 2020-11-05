import React from "react";
import "./About.css";
import UserCard from "./AboutUsers"
import ToolCard from "./AboutTools"
import joe from "../Media/joe_profile.jpg";
import rishi from "../Media/rishi.png";
import serena from "../Media/serena.jpg";
import andy from "../Media/andy.jpg";
import christine from "../Media/christine.jpg";
import dane from "../Media/dane.jpg";
import fishwatch from "../Media/fishwatch.jpg";
import stormglass from "../Media/stormglass.svg";
import slack from "./AboutPageMedia/Slack.png";
import postman from "./AboutPageMedia/postman.png";
import gitlab from "./AboutPageMedia/gitlab.png";
import reactImg from "./AboutPageMedia/react.png";
import docker from "./AboutPageMedia/docker.jpeg";
import node from "./AboutPageMedia/node.png";
import ec2 from "./AboutPageMedia/ec2.png";
import algolia from "./AboutPageMedia/algolia.png";





interface user {
  name: string;
  id: string;
  commits: number;
  issues: number;
  unitTests: number;
  image: string;
}

interface tool {
  name: string;
  image: string;
  description: string;
  link: string;
}

class About extends React.Component {
  state = {

    tools: [
      {
        name: "Postman",
        image: postman,
        description: "Postman was used by our backend team to design our API.",
        link: "https://www.postman.com/"
      },
      {
        name: "Slack",
        image: slack,
        description: "Slack is used for all official team communication.",
        link: "https://www.slack.com/"
      },
      {
        name: "Gitlab",
        image: gitlab,
        description: "Gitlab is used for version control for our project's code.",
        link: "https://www.gitlab.com/"
      },
      {
        name: "React",
        image: reactImg,
        description: "React is used for development by our frontend team",
        link: "https://www.reactjs.org/"
      },
      {
        name: "Docker",
        image: docker,
        description: "Docker is used to create similar environments for us to work within, making working seperately much easier.",
        link: "https://www.docker.com/"
      },
      {
        name: "Node.js and npm",
        image: node,
        description: "Node.js and npm are used to manage the project's installations and dependencies.",
        link: "https://www.nodejs.org/"
      },
      {
        name: "EC2",
        image: ec2,
        description: "EC2 is used to host and deploy our project.",
        link: "https://aws.amazon.com/ec2/"
      },
      {
        name: "Algolia",
        image: algolia,
        description: "Algolia was use to implement searching.",
        link: "https://algolia.com"
      },
      {
        name: "React-select",
        image: reactImg,
        description: "React-select was used to implement the drop-down menu interfaces for filtering and searching on the model pages.",
        link: "https://react-select.com"
      }
    ],
    users: [
      {
        name: "Joe Wallery",
        id: "Joe Wallery",
        maj_resp: "Frontend",
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
        maj_resp: "Frontend",
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
        maj_resp: "Frontend",
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
        maj_resp: "Backend",
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
    ],
    dataSource: [
      {
        name: "FishWatch",
        image: fishwatch,
      },
      {
        name: "Storm Glass",
        image: stormglass,
      },
    ],
    totalIssues: 0,
    totalCommits: 0,
    totalUnitTests: 0,
  };

  componentDidMount() {
    // GET the number of issues per user and the total number of issues
    fetch("https://gitlab.com/api/v4/projects/21238278/issues?per_page=9999")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((issue: any) => {
          let name = issue.author.name;
          this.setState({
            users: this.state.users.map((user: user) => {
              if (user.id === name) {
                user.issues += 1;
                return user;
              }
              return user;
            }),
            totalIssues: this.state.totalIssues + 1,
          });
        });
      })
      .catch((err) => {
        console.log("error: " + err);
      });

    // GET the number of commits per user and the total number of commits
    fetch(
      "https://gitlab.com/api/v4/projects/21238278/repository/commits?" +
        "per_page=9999"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((commit: any) => {
          let name = commit.author_name;
          this.setState({
            users: this.state.users.map((user: user) => {
              if (user.id === name) {
                user.commits += 1;
                return user;
              }
              return user;
            }),
            totalCommits: this.state.totalCommits + 1,
          });
        });
      })
      .catch(function (err) {
        console.log("error: " + err);
      });
  }

  render() {
    const { users }: any = this.state;
    const result = users.map((user: user, index: number) => {
      return <UserCard key={index} user={user} />;
    });

    const { tools }: any = this.state;
    const resultTools = tools.map((tool: tool, index: number) => {
      return <ToolCard key={index} tool={tool} />;
    });

    return (
      <div className="container">
        <h2 className="header">About</h2>
        <h3 className="description">
          {" "}
          We are a group of developers dedicated to educating people about the
          world's oceans, lakes, and rivers. Our site provides information about
          various types of marine wildlife, the bodies of water in which they
          live, and the impacts of human activities on both.
        </h3>
        <h3 className="description">
          By educating people on the aquatic creatures that share this world
          with us, and providing information on how our actions impact them, we
          hope to help people contemplate how their daily activities could be
          affecting marine life.
        </h3>
        <h3 className="description">
          The intended users of this site are people who are curious about
          aquatic wildlife, would like to be more environmentally conscious, or
          both.
        </h3>
        <h2 className="header">Statistics</h2>

        <h3 className="description">
          Total Commits: {this.state.totalCommits}
        </h3>
        <h3 className="description">Total Issues: {this.state.totalIssues}</h3>
        <h3 className="description">
          Total Unit Tests: {this.state.totalUnitTests}
        </h3>

        <a
          href="https://documenter.getpostman.com/view/12800288/TVKJxaRw"
          className="theme-link"
        >
          Link to API Documentation
        </a>
        <br />
        <a
          href="https://gitlab.com/joewallery/cs373-group12"
          className="theme-link"
        >
          Link to the GitLab Repository
        </a>

        {/* <h2>Total Unit Tests: 0</h2> */}
        <h2 className="header">Our Team</h2>
        <div className="row py-5"> {result}</div>

        <h2 className="header">Data Sources</h2>
        <ul>
          <li>
            <a href="https://fishbaseapi.readme.io/" className="theme-link">
              {" "}
              FishBase API
            </a>
            <p>
              FishBase stores basic information about fish, such as species,
              common name, genus, etc.
            </p>
          </li>
          <li>
            <a href="https://apiv3.iucnredlist.org/" className="theme-link">
              {" "}
              IUCN Red List API
            </a>
            <p>
              The IUCN Red List database stores information on the risk levels
              of several species, indicating their risk of extinction.
            </p>
          </li>
          <li>
            <a href="https://bison.usgs.gov/" className="theme-link">
              {" "}
              Bison USGS
            </a>
            <p>
              Bison USGS stores information about the geographic location of
              fish around the United States.
            </p>
          </li>
          <li>
            <a href="https://www.marineregions.org/" className="theme-link">
              {" "}
              Marine Regions
            </a>
            <p>
              Marine Regions contains a large variety of information about
              various geographic features, primarily features found in and
              around water.
            </p>
          </li>
          <li>
            <a href="http://www.openfisheries.org/" className="theme-link">
              {" "}
              Open Fisheries
            </a>
            <p>
              Open Fisheries has information regarding the yearly catch rate of
              various fish, given a species name for the fish.
            </p>
          </li>
          <li>
            <a
              href="https://hub.arcgis.com/datasets/CESJ::estimate-of-plastic
            -pollution-in-the-worlds-oceans-km2-200-mm/geoservice"
              className="theme-link"
            >
              {" "}
              ArcGIS Hub
            </a>
            <p>
              Arcgis Hub stores many API’s, one of which has information about
              the microplastic density present in many major bodies of water.
            </p>
          </li>
          <li>
            <a
              href="https://data.opendatasoft.com/explore/dataset/world-power
            -plants-list%40kapsarc/table/?disjunctive.plant_country&disjunctive
            .plant_state&disjunctive.plant_status&disjunctive.
            plant_type_of_ownership&disjunctive.plant_operating_company&
            disjunctive.type"
              className="theme-link"
            >
              {" "}
              OpenDataSoft
            </a>
            <p>
              OpenDataSoft contains many API’s, one of which contains
              information about world power plants, separated by category, such
              as coal plants.
            </p>
          </li>
        </ul>
        <h2 className="header">Tools</h2>
        <div className="row py-5"> {resultTools}</div>
      </div>
    );
  }
}

export default About;
