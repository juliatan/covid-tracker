import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import { fetchCountryData } from '../api/coronaApi';
import 'leaflet/dist/leaflet.css'; // required to style leaflet map

export const icon = new Icon({
  iconUrl: '/marker.svg',
  iconSize: [50, 50],
});

export default class MapView extends Component {
  state = {
    currentLocation: { lat: 51.5, lng: -0.1 }, // set to London
    zoom: 3,
    activeCountry: null,
    countryData: null,
  };

  componentDidMount() {
    this.countryData();
  }

  countryData = async () => {
    const response = await fetchCountryData();
    console.log(response);
    const results = response.features;
    this.setState({ countryData: results });
  };

  setActiveCountry = (country) => {
    this.setState({ activeCountry: country });
  };

  render() {
    let countryMarkers = null;
    if (this.state.countryData) {
      countryMarkers = this.state.countryData.map((countryObj) => (
        <Marker
          // need to refactor
          key={`lat${countryObj.properties.countryInfo.lat}long${countryObj.properties.countryInfo.long}updated${countryObj.properties.updated}`}
          position={[
            countryObj.properties.countryInfo.lat,
            countryObj.properties.countryInfo.long,
          ]}
          onClick={() => this.setActiveCountry(countryObj)}
          icon={icon}
        />
      ));
    }

    return (
      <Map center={this.state.currentLocation} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {countryMarkers}

        {this.state.activeCountry && (
          <Popup
            position={[
              this.state.activeCountry.properties.countryInfo.lat,
              this.state.activeCountry.properties.countryInfo.long,
            ]}
            onClose={() => {
              this.setActiveCountry(null);
            }}
          >
            <div>
              <h2>{this.state.activeCountry.properties.country}</h2>
              <p>Deaths: {this.state.activeCountry.properties.deaths}</p>
            </div>
          </Popup>
        )}
      </Map>
    );
  }
}
