import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
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
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get(
        'https://corona.lmao.ninja/v3/covid-19/countries',
      );

      const { data } = response;
      this.setState({ countryData: data });
      // eslint-disable-next-line no-console
      console.log(data);
    } catch (e) {
      // need better error handler
      // eslint-disable-next-line no-console
      console.log(`Failed to fetch countries: ${e.message}`, e);
    }
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
          key={`lat${countryObj.countryInfo.lat}long${countryObj.countryInfo.long}updated${countryObj.updated}`}
          position={[countryObj.countryInfo.lat, countryObj.countryInfo.long]}
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
              this.state.activeCountry.countryInfo.lat,
              this.state.activeCountry.countryInfo.long,
            ]}
            onClose={() => {
              this.setActiveCountry(null);
            }}
          >
            <div>
              <h2>{this.state.activeCountry.country}</h2>
              <p>Deaths: {this.state.activeCountry.deaths}</p>
            </div>
          </Popup>
        )}
      </Map>
    );
  }
}
