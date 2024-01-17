import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {useSelector} from "react-redux";

function Maps() {

    const centerPosition = [54.251186, -4.463196]; // Man Island

    const pubSelected = useSelector(state => state.pub.value);
    const pubSelectedPosition = [pubSelected?.lat || null, pubSelected?.lng || null]

    //ogni oggetto dell'array pubsLoaded è un pub, per prendere la posizione pub.lat, pub.lng
    const pubsLoaded = useSelector(state => state.loadedPubs.pubs)

    const customMarkerIcon = new L.Icon({
        iconUrl: "https://cdn2.iconfinder.com/data/icons/shipping-delivery-color/100/objects-52-1024.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40], // sets the anchor point
        popupAnchor: [0, -40], // sets the popup anchor point
      });

    // for the selected pub
    const customMarkerSelectedIcon = new L.Icon({
        iconUrl: "https://cdn3.iconfinder.com/data/icons/e-commerce-pt-2/96/map_marker_mark_destination-1024.png",
        iconSize: [60, 60],
        iconAnchor: [30, 60], // sets the anchor point
        popupAnchor: [0, -60], // sets the popup anchor point
      });

    const renderedPubsLoaded = pubsLoaded.map((pub, index) => {
        const markerPosition = [pub.lat, pub.lng];

        let markerIcon = customMarkerIcon;

        if (JSON.stringify(markerPosition) === JSON.stringify(pubSelectedPosition)) {
            markerIcon = customMarkerSelectedIcon
        }

        return (
            <Marker key={index} position={markerPosition} icon={markerIcon}>
                <Popup>
                    {pub.name || "Selected Pub"} <br/>
                </Popup>
            </Marker>
        )
    })

      return (
        <div style={{ display: "flex" }}>
          <MapContainer
            style={{
              height: "90vh",
              width: "100%",
            }}
            center={pubSelected ? pubSelectedPosition : centerPosition}
            zoom={6}
          >
            {/* adds map layer */}
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
              {renderedPubsLoaded}
          </MapContainer>
        </div>
      );
}

export default Maps;