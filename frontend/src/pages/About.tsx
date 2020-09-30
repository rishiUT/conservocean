import React from "react";

interface user {
  name: string;
  id: string;
  commits: number;
  issues: number;
  unitTests: number;
}

class About extends React.Component {
  state = {
    users: [
      {
        name: "Joe Wallery",
        id: "Joe Wallery",
        commits: 0,
        issues: 0,
        unitTests: 0,
      },
      {
        name: "Rishi Salem",
        id: "Rishi Salem",
        commits: 0,
        issues: 0,
        unitTests: 0,
      },
      {
        name: "Serena Zamarripa",
        id: "Serena Zamarripa",
        commits: 0,
        issues: 0,
        unitTests: 0,
      },
      {
        name: "Andy Weng",
        id: "AndyWeng33252",
        commits: 0,
        issues: 0,
        unitTests: 0,
      },
      {
        name: "Christine Tsou",
        id: "Christine Tsou",
        commits: 0,
        issues: 0,
        unitTests: 0,
      },
      {
        name: "Dane Strandboge",
        id: "Dane Strandboge",
        commits: 0,
        issues: 0,
        unitTests: 0,
      },
    ],
    totalIssues: 0,
    totalCommits: 0,
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
        <h2 className="text-center py-5">About</h2>
        <h2>Total Commits: {this.state.totalCommits}</h2>
        <h2>Total Issues: {this.state.totalIssues}</h2>
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
            <h5 className="card-title">{user.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Commits: {user.commits}</li>
            <li className="list-group-item">Issues: {user.issues}</li>
          </ul>
        </div>
      </div>
    );
  }
  return null;
}

export default About;
