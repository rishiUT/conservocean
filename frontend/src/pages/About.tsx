import React from "react";

export default function About() {
  var req_commits = new XMLHttpRequest();
  var req_issues = new XMLHttpRequest();

  req_commits.open(
    "GET",
    "https://gitlab.com/api/v4/projects/21238278/repository/commits",
    true
  );
  req_issues.open(
    "GET",
    "https://gitlab.com/api/v4/projects/21238278/issues",
    true
  );

  var map_commits = new Map();
  var map_issues = new Map();

  req_issues.onload = function () {
    map_issues.set("All", 0);
    var data = JSON.parse(this.response);
    for (var i = 0; i < data.length; i++) {
      let curr = data[i].author.name;
      if (map_issues.has(curr)) {
        map_issues.set(curr, map_issues.get(curr) + 1);
      } else {
        map_issues.set(curr, 1);
      }
      map_issues.set("All", map_issues.get("All") + 1);
    }
  };

  req_commits.onload = function () {
    map_commits.set("All", 0);
    var data = JSON.parse(this.response);
    for (var i = 0; i < data.length; i++) {
      let curr = data[i].committer_name;
      if (map_commits.has(curr)) {
        map_commits.set(curr, map_commits.get(curr) + 1);
      } else {
        map_commits.set(curr, 1);
      }
      map_commits.set("All", map_commits.get("All") + 1);
    }
  };

  var toPrint = document.createElement("div")

  req_commits.send()
  req_issues.send()
  console.log(map_commits);
  console.log(map_issues);

  return (
    <div>
      <h1>About</h1>
      <h2>total number of commits: </h2>
      <h2>total number of issues: </h2>
      <h2>Total number of unit tests: 0</h2>
    </div>
  );
}

//gitlab access token = XyyzhHPKZLhojG-Z_3Qg
