import React from "react";
import { Highlight } from 'react-instantsearch-dom';

function Hit(props: any) {
    return (
      <div>
        <img src={props.hit.picture_url} alt={props.hit.name} />
        <div className="hit-name">
          <Highlight attribute="name" hit={props.hit} />
        </div>
        <div className="hit-description">
          <Highlight attribute="description" hit={props.hit} />
        </div>
      </div>
    );
  }

  export default Hit;