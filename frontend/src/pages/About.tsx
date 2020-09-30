import React from "react";

function About() {
  return (
    <div>
      <h2>About</h2>
      <h2>total number of commits: </h2>
      <h2>total number of issues: </h2>
      <h2>Total number of unit tests: 0</h2>
    </div>
  );
}
/*
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>JSON Test</title>
</head>
<body>
    <div id="myData"></div>
    <script>
        fetch('https://gitlab.com/api/v4/projects/21238278/issues')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                getIssueData(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
        function getIssueData(data) {
            var mainContainer = document.getElementById("myData");
            let issues = new Map();
            for (var i = 0; i < data.length; i++) {
                let curr = data[i].author.name;
                if (issues.has(curr)) {
                    issues.set(curr, issues.get(curr) + 1)
                } else {
                    issues.set(curr, 1)
                }
            }

            let total = 0;
            for (let entry of issues) {
                var div = document.createElement("div");
                div.innerHTML = 'Total Issues: ' + entry[0] + ' ' + entry[1];
                total += entry[1];
                mainContainer.appendChild(div);
            }

            var div = document.createElement("div");
            div.innerHTML = 'Project Total Issues: ' + total;
            mainContainer.appendChild(div);
        }

        fetch('https://gitlab.com/api/v4/projects/21238278/repository/commits')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                getCommitData(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
        function getCommitData(data) {
            var mainContainer = document.getElementById("myData");
            let commits = new Map();
            for (var i = 0; i < data.length; i++) {
                let curr_committer = data[i].committer_name;
                if (commits.has(curr_committer)) {
                    commits.set(curr_committer, commits.get(curr_committer) + 1)
                } else {
                    commits.set(curr_committer, 1)
                }
            }

            let total = 0;
            for (let entry of commits) {
                var div = document.createElement("div");
                div.innerHTML = 'Total Commits: ' + entry[0] + ' ' + entry[1];
                total += entry[1];
                mainContainer.appendChild(div);
            }

            var div = document.createElement("div");
            div.innerHTML = 'Project Total Commits: ' + total;
            mainContainer.appendChild(div);
        }
    </script>
</body>
</html>
*/


//GET /projects/:id/repository/commits
//sort through commits, get total number and number for each user id

//gitlab access token = XyyzhHPKZLhojG-Z_3Qg
export default About;
