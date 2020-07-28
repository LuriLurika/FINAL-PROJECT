import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";

const CustomMap = withScriptjs(
  withGoogleMap(({ markers }) => {
    return (
      <div>
        <GoogleMap
          defaultZoom={markers.length > 0 ? 16 : 12}
          zoom={markers.length > 0 ? 16 : 12}
          defaultCenter={
            markers.length > 0
              ? markers[0]
              : { lat: 37.350923, lng: -6.0520363 }
          }
          center={
            markers.length > 0
              ? markers[0]
              : { lat: 37.350923, lng: -6.0520363 }
          }
        >
          {markers.map((elm) => {
            return <Marker position={elm} />;
          })}
        </GoogleMap>
      </div>
    );
  })
);

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeId: props.placeId,
      markers: [],
    };
  }
  componentDidMount = () => this.searchLocationByPlaceId(this.state.placeId);

  searchLocationByPlaceId = (placeId) => {
    geocodeByPlaceId(placeId)
      .then((results) => {
        getLatLng(results[0])
          .then((result) => this.setState({ markers: [result] }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <GooglePlacesAutocomplete
          onSelect={(place) => {
            this.setState({ placeId: place.place_id });
            this.searchLocationByPlaceId(place.place_id);
          }}
        />
        <CustomMap
          markers={this.state.markers}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA2ccMln2aPW0DPoNiaRV5cNj7kTMyu6hE&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Maps;
