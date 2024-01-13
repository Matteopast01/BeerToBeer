import React from "react";
import GoogleMapReact from 'google-map-react';
import {useSelector} from "react-redux";

const MapsComponent = ({text}) => <div>{text}</div>;

    // TODO MATTEO: query che recupera un pub fornendo l'id

function Maps(){

    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };

    const pubSelected = useSelector(state => state.pub);
    const pubSelectedProps = !!pubSelected ? {
        center: {
        lat: pubSelected.lat,
        lng: pubSelected.lng
        }
    } : null

    const pubProps = !!pubSelected ? pubSelectedProps : defaultProps

      return (
        <div style = {{ height: '73vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys = {{ key: "" }}
            defaultCenter = {defaultProps.center}
            defaultZoom = {defaultProps.zoom}
          >
            <MapsComponent
              lat = {pubProps.center.lat}
              lng = {pubProps.center.lng}
              text = "My Marker"
            />
          </GoogleMapReact>
        </div>
      );
}

export default Maps;