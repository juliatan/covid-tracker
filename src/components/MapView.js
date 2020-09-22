import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { fetchCountryData } from '../api/coronaApi';
import 'leaflet/dist/leaflet.css'; // required to style leaflet map
import './MapView.scss';

export default class MapView extends Component {
  state = {
    currentLocation: { lat: 51.5, lng: -0.1 }, // set to London
    zoom: 3,
    // activeCountry: null,
    countryData: null,
  };

  componentDidMount() {
    this.loadCountryData();
  }

  loadCountryData = async () => {
    const geoJson = await fetchCountryData();
    this.setState({ countryData: geoJson.features });
  };

  // setActiveCountry = (country) => {
  //   this.setState({ activeCountry: country });
  // };

  render() {
    let countryMarkers = null;
    if (this.state.countryData) {
      countryMarkers = this.state.countryData.map((countryObj) => {
        const {
          country,
          updated,
          cases,
          deaths,
          recovered,
          countryInfo,
        } = countryObj.properties;

        let casesFormatted = `${cases}`;
        let updatedFormatted;

        if (cases > 1000) {
          casesFormatted = `${casesFormatted.slice(0, -3)}k+`;
        }

        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            ${casesFormatted}
            </span>
        `;

        return (
          <Marker
            key={`lat${countryInfo.lat}long${countryInfo.long}updated${updated}`}
            position={[countryInfo.lat, countryInfo.long]}
            // onClick={() => this.setActiveCountry(countryObj)}
            icon={
              new DivIcon({
                // iconUrl: '/marker.svg',
                // iconSize: [50, 50],
                className: 'icon',
                html,
              })
            }
            riseOnHover
          />
        );
      });
    }

    return (
      <Map center={this.state.currentLocation} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {countryMarkers}

        {/* {this.state.activeCountry && (
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
        )} */}
      </Map>
    );
  }
}
