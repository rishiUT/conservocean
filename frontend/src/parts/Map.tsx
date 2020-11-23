import React from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

// The access token gives us permission to access the mapbox-gl API.
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9ld2FsbGVyeSIsImEiOiJja2dmdHd6bDMxbzB3MnptaXY0dDVxbW9tIn0." +
  "jBu51H8cQiBL8zeq6a81uQ";

// This tells us what data a map can have.
interface MapState {
  lng: number;
  lat: number;
  zoom: number;
}

// Make a map and return it.
export default class Map extends React.Component<MapState, MapState> {
  mapContainer: any;
  constructor(props: any) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
    });

    new mapboxgl.Marker()
      .setLngLat([this.props.lng, this.props.lat])
      .addTo(map);

    map.on("move", () => {
      this.setState({
        lng: Number(map.getCenter().lng.toFixed(4)),
        lat: Number(map.getCenter().lat.toFixed(4)),
        zoom: Number(map.getZoom().toFixed(2)),
      });
    });
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}
