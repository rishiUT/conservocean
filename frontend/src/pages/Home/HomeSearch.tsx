import React from "react";
import { Highlight } from 'react-instantsearch-dom';
import { useRouteMatch } from "react-router-dom";


function Hit(props: any) {

  let match = useRouteMatch();
  // Load a different card based on what type of model the hit is
  console.log(match.url);
  if(props.hit.model === "fish"){
    
    return (
      
        <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
          <a href={`${match.url}/${props.hit.id}`} className="card-link">
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
            className="card-img-top"
            width="100%"
            src={props.hit.picture_url}
            alt=""
          ></img>
          <div className="card-body">
            <h5 className="card-title">{props.hit.common_name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Genus: <span className="font-italic">{props.hit.genus}</span>
            </li>
            <li className="list-group-item">
              Species: <span className="font-italic">{props.hit.species}</span>
            </li>
            <li className="list-group-item">
              {/* IUCN Status:{" "}
              {
                IUCN_STATUS[
                  props.sp.endanger_status ? props.sp.endanger_status : "DD"
                ]
              } */}
            </li>
            <li className="list-group-item">
              Average Size: {props.hit.average_size} cm
            </li>
          </ul>
        </div>
    
    );
  }
  
  if(props.hit.model === "bodies_of_water"){
    return (
      <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card mb-4 shadow-sm card-cont" style={{ position: "relative" }}>
        {/* Link card to instance page */}
        <a href={`${match.url}/${props.hit.id}`} className="card-link">
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
          src={props.hit.mapImgPath}
          width="100%"
          alt=""
        ></img>
        <div className="card-body">
          <h5 className="card-title">{props.hit.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Latitude: {Number.parseFloat(props.hit.latitude).toFixed(3)}</li>
          <li className="list-group-item">Longitude: {Number.parseFloat(props.hit.longitude).toFixed(3)}</li>
          <li className="list-group-item">Size: {Number.parseFloat(props.hit.size).toFixed(3)} sq. km</li>
          {props.hit.water_temp ? <li className="list-group-item">Average Temperature: {props.hit.water_temp}°C</li> : null}
          {props.hit.wind_speedkmph ? <li className="list-group-item">Local Wind Speed: {props.hit.wind_speedkmph} km/h</li> : null}
        </ul>
      </div>
    </div>
    );
  }

  return (

    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card mb-4 shadow-sm card-cont" style={{ position: "relative" }}>
        {/* Link card to instance page */}
        <a href={`${match.url}/${props.hit.id}`} className="card-link">
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
          src={props.hit.mapImgPath}
          width="100%"
          alt=""
        ></img>
        <div className="card-body">
          <h5 className="card-title">{props.hit.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          {props.hit.category ? <li className="list-group-item">Category: {props.hit.category}</li> : null}
             {props.hit.subcategory ? (
            <li className="list-group-item" >Subcategory: {props.hit.subcategory}</li>
             ) : null}
          
        </ul>
      </div>
    </div>
  );
  
}

  export default Hit;