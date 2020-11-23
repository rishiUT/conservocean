import React from "react";
import "./About.css";

interface user {
  name: string;
  id: string;
  maj_resp: string;
  commits: number;
  issues: number;
  unitTests: number;
  image: string;
  bio: string;
}

// Uses information passed in to create an return a "usercard"
function UserCard({ user }: any) {
  if (user) {
    return (
      <div className="col-md-4">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <img className="card-image" src={user.image} alt={user.name} />
            <h5 className="card-title">{user.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Major Responsibilities: {user.maj_resp}
            </li>
            <li className="list-group-item">About: {user.bio}</li>
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

export default UserCard;
