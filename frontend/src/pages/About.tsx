import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import joe from "./Media/joe_profile.jpg";
import rishi from "./Media/rishi.png";
import serena from "./Media/serena.jpg";
import andy from "./Media/andy.jpg";
import christine from "./Media/christine.jpg";
import dane from "./Media/fish.png";

interface user {
  name: string;
  id: string;
  commits: number;
  issues: number;
  unitTests: number;
  image: string;
}

class About extends React.Component {
  state = {
    users: [
      {
        name: "Joe Wallery",
        id: "Joe Wallery",
        maj_resp: "Frontend",
        commits: 0,
        issues: 0,
        unitTests: 0,
        image: joe,
      },
      {
        name: "Rishi Salem",
        id: "Rishi Salem",
        maj_resp: "Frontend",
        commits: 0,
        issues: 0,
        unitTests: 0,
        image: rishi,
      },
      {
        name: "Serena Zamarripa",
        id: "Serena Zamarripa",
        maj_resp: "Frontend",
        commits: 0,
        issues: 0,
        unitTests: 0,
        image: serena,
      },
      {
        name: "Andy Weng",
        id: "AndyWeng33252",
        maj_resp: "Backend",
        commits: 0,
        issues: 0,
        unitTests: 0,
        image: andy,
      },
      {
        name: "Christine Tsou",
        id: "Christine Tsou",
        maj_resp: "Backend",
        commits: 0,
        issues: 0,
        unitTests: 0,
        image: christine,
      },
      {
        name: "Dane Strandboge",
        id: "Dane Strandboge",
        maj_resp: "Backend",
        commits: 0,
        issues: 0,
        unitTests: 0,
        image: dane,
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
      "https://gitlab.com/api/v4/projects/21238278/repository/commits?per_page=9999"
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

    return (
      <div className="container">
        <h2 className="header">About</h2>
        <h3 className="description">
          {" "}
          Our site provides information about various types of ocean wildlife,
          the bodies of water in which they live, and the impacts of human
          activities on both.
        </h3>
        <h3 className="description">
          By educating people on the aquatic creatures that share this world
          with us, and providing information on how our actions impact them, we
          hope to help people understand which of their behaviors they may want
          to change and which sea creatures they could help by doing so.
        </h3>
        <h3 className="description">
          The intended users of this site are the people who are curious about
          aquatic wildlife, would like to be more environmentally conscious, or
          both.
        </h3>
        <h2 className="header">Statistics</h2>

        <h3 className="description">Total Commits: {this.state.totalCommits}</h3>
        <h3 className="description">Total Issues: {this.state.totalIssues}</h3>
        <h3 className="description">Total Unit Tests: {this.state.totalUnitTests}</h3>

        <a href="https://documenter.getpostman.com/view/12800288/TVKJxaRw" className='theme-link'>Link to API Documentation</a>
        <br/>
        <a href="https://gitlab.com/joewallery/cs373-group12" className='theme-link'>Link to the GitLab Repository</a>

        {/* <h2>Total Unit Tests: 0</h2> */}
        <div className="row py-5"> {result}</div>
      </div>
    );
  }
}

function UserCard({ user }: any) {
  if (user) {
    return (
      <div className="col-md-4">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <img className="card-image" src={user.image} alt={user.name}/>
            <h5 className="card-title">{user.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Major Responsibilities: {user.maj_resp}
            </li>
            <li className="list-group-item">Commits: {user.commits}</li>
            <li className="list-group-item">Issues: {user.issues}</li>
            <li className="list-group-item">Unit Tests: {user.unitTests}</li>
          </ul>
        </div>
      </div>
    );
  }
  return null;
}

export default About;
