import React from "react";
//Wraps a human impact in a card that displays
//image, name, category, and subcategory
export default function ImpactCard(props: any) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div
        className="card mb-4 shadow-sm card-cont"
        style={{ position: "relative" }}
      >
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
          src={props.impact.imgurl}
          width="100%"
          alt=""
        ></img>

        <div className="card-body">
          <h5
            className="card-title"
            dangerouslySetInnerHTML={{ __html: props.impact.name }}
          ></h5>
        </div>
        <ul className="list-group list-group-flush">
          {props.impact.category ? (
            <li className="list-group-item">
              Category:{" "}
              <span
                dangerouslySetInnerHTML={{ __html: props.impact.category }}
              ></span>
            </li>
          ) : null}
          {props.impact.subcategory ? (
            <li className="list-group-item">
              Subcategory:{" "}
              <span
                dangerouslySetInnerHTML={{ __html: props.impact.subcategory }}
              ></span>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
