import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {useSelector} from "react-redux";

function Maps() {

    // TODO MATTEO: query che recupera un pub dato  un id
    const centerPosition = [51.507351, -0.127758]; // London; could be changed

    const pubSelected = useSelector(state => state.pub);
    const markerPosition = [pubSelected?.lat || centerPosition[0], pubSelected?.lng || centerPosition[1]]

    const customMarkerIcon = new L.Icon({
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",
        iconSize: [32, 32],
        iconAnchor: [16, 32], // sets the anchor point
        popupAnchor: [0, -32], // sets the popup anchor point
      });

      return (
        <div style={{ display: "flex" }}>
          <MapContainer
            style={{
              height: "100vh",
              width: "100%",
            }}
            center={centerPosition}
            zoom={8}
          >
            {/* adds map layer */}
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />

            {/* if there is no pubSelected there is no marker*/}
              {!!pubSelected ?
                  <Marker position={!!markerPosition ? markerPosition : null} icon={customMarkerIcon}>
                    <Popup>
                        {pubSelected?.name || "Selected Pub"} <br /> Coordinate: {markerPosition[0]}, {markerPosition[1]}
                    </Popup>
                  </Marker>
              : null}
          </MapContainer>
        </div>
      );
}

export default Maps;