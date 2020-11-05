import React from "react";

export default function ImpactCard(props: any) {
    return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card mb-4 shadow-sm card-cont" style={{ position: "relative" }}>
        {/* Link card to instance page */}
        <a href={`impact/${props.impact.id}`} className="card-link">
          <span
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              zIndex: 1,
            }}
          ></span>
        </a>

        <img
          className="card-image"
          src={props.impact.mapImgPath}
          width="100%"
          alt=""
        ></img>
        <div className="card-body">
          <h5 className="card-title">{props.impact.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          {props.impact.category ? <li className="list-group-item">Category: {props.impact.category}</li> : null}
             {props.impact.subcategory ? (
            <li className="list-group-item" >Subcategory: {props.impact.subcategory}</li>
             ) : null}
          
        </ul>
      </div>
    </div>
    );
}