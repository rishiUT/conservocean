import React from "react";
import axios from "axios";

import "./About.css";
import UserCard from "./AboutUsers";
import ToolCard from "./AboutTools";
import { stats, data, tools, users } from "./AboutData";

import ErrorPage from "../ErrorPages/UnknownError";
import NoResponseError from "../ErrorPages/NoResponse";
import MysteryError from "../ErrorPages/NoErrorCode";

//The interface describes the expected attributes of a user object
interface user {
  name: string;
  id: string;
  commits: number;
  issues: number;
  unitTests: number;
  image: string;
}

//The interface describes the expected attributes of a tool object
interface tool {
  name: string;
  image: string;
  description: string;
  link: string;
}

class About extends React.Component {
  state = {
    stats: stats,
    data: data,
    tools: tools,
    users: users,
    totalIssues: 0,
    totalCommits: 0,
    totalUnitTests: 0,
  };

  axiosErrorCatch(error: any) {
    if (error.response) {
      //client received an error response (4xx or 5xx)
      return ErrorPage({ errorid: error.response.status });
    } else if (error.request) {
      //client never received a response, or the request never left
      return NoResponseError();
    } else {
      //something else, unrelated to axios
      return MysteryError();
    }
  }

  componentDidMount() {
    // GET the number of issues per user and the total number of issues
    axios
      .get("https://gitlab.com/api/v4/projects/21238278/issues?per_page=9999")
      .then((response) => {
        response.data.forEach((issue: any) => {
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
      .catch((error) => this.axiosErrorCatch(error));

    // GET the number of commits per user and the total number of commits
    axios
      .get(
        "https://gitlab.com/api/v4/projects/21238278/repository/commits?" +
          "per_page=9999"
      )
      .then((response) => {
        response.data.forEach((commit: any) => {
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
      .catch((error) => this.axiosErrorCatch(error));
  }
  render() {
    // Returns html output based on the information in the data structures
    const { users }: any = this.state;
    const result = users.map((user: user, index: number) => {
      return <UserCard key={index} user={user} />;
    });

    const { tools }: any = this.state;
    const resultTools = tools.map((tool: tool, index: number) => {
      return <ToolCard key={index} tool={tool} />;
    });

    const { data }: any = this.state;
    const resultData = data.map((tool: tool, index: number) => {
      return <ToolCard key={index} tool={tool} />;
    });

    const { stats }: any = this.state;
    const resultStats = stats.map((tool: tool, index: number) => {
      return <ToolCard key={index} tool={tool} />;
    });

    const sections = [
      { text: "Important Links", elem: resultStats },
      { text: "Our Team", elem: result },
      { text: "Data Sources", elem: resultData },
      { text: "Tools", elem: resultTools },
    ];

    function makeSections() {
      return sections.map((section) => (
        <div key={section.text}>
          <h2 className="header">{section.text}</h2>
          <div className="row py-5"> {section.elem}</div>
        </div>
      ));
    }

    return (
      <div className="container about-container">
        <h2 className="header">About</h2>
        <h3 className="description" style={{ textAlign: "left" }}>
          {" "}
          We are a group of developers dedicated to educating people about the
          world's oceans, lakes, and rivers. Our site provides information about
          various types of marine wildlife, the bodies of water in which they
          live, and the impacts of human activities on both.
        </h3>
        <h3 className="description" style={{ textAlign: "left" }}>
          By educating people on the aquatic creatures that share this world
          with us, and providing information on how our actions impact them, we
          hope to help people contemplate how their daily activities could be
          affecting marine life.
        </h3>
        <h3 className="description" style={{ textAlign: "left" }}>
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
        {makeSections()}
      </div>
    );
  }
}

export default About;
