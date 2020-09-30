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

//GET /projects/:id/repository/commits
//sort through commits, get total number and number for each user id

//gitlab access token = XyyzhHPKZLhojG-Z_3Qg
export default About;
