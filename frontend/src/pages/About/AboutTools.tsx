import React from "react";
import "./About.css";

interface tool {
  name: string;
  image: string;
  description: string;
  link: string;
}

// Uses information passed in to create an return a "toolcard"
function ToolCard({ tool }: any) {
  if (tool) {
    return (
      <div className="col-md-4">
        <div className="card mb-4 shadow-sm">
          <a href={tool.link}>
            <div className="card-body">
              <img className="card-image" src={tool.image} alt={tool.name} />
              <h5 className="card-title">{tool.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{tool.description}</li>
            </ul>
          </a>
        </div>
      </div>
    );
  }
  return null;
}

export default ToolCard;
