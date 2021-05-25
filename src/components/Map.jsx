import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = (props) =>  {

  let position = {
    lat: props.latLng.lat,
    lng: props.latLng.lng
  }

  console.log(position);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: props.googleApiKey }}
        center={position}
        defaultZoom={10}
      >
      </GoogleMapReact>
    </div>
  );
}

export default Map;