import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { fetchCountryData } from '../../api/coronaApi';
import 'leaflet/dist/leaflet.css'; // required to style leaflet map
import './MapView.scss';

export default class MapView extends Component {
  state = {
    currentLocation: { lat: 31.5, lng: -0.1 }, // set to London
    zoom: 2,
    countryData: null,
  };

  componentDidMount() {
    this.loadCountryData();
  }

  loadCountryData = async () => {
    const geoJson = await fetchCountryData();
    this.setState({ countryData: geoJson.features });
  };

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

        if (cases >= 1000000) {
          casesFormatted = `${casesFormatted.slice(0, -6)}M+`;
        } else if (cases > 1000 && cases < 1000000) {
          casesFormatted = `${casesFormatted.slice(0, -3)}k+`;
        }

        if (updated) {
          updatedFormatted = new Date(updated).toGMTString();
        }

        let recoveredFormatted;
        if (cases > 0 && recovered === 0) {
          recoveredFormatted = 'N/A';
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases.toLocaleString()}</li>
                <li><strong>Deaths:</strong> ${deaths.toLocaleString()}</li>
                <li><strong>Recovered:</strong> ${
                  recoveredFormatted || recovered.toLocaleString()
                }</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            ${casesFormatted}
            </span>
        `;

        const markerColour = `
          ${cases > 1000000 ? 'icon-high' : 'icon'}
          ${cases < 100000 ? 'icon-low' : 'icon'}
        `;

        return (
          <Marker
            key={`lat${countryInfo.lat}long${countryInfo.long}updated${updated}`}
            position={[countryInfo.lat, countryInfo.long]}
            icon={
              new DivIcon({
                // iconUrl: '/marker.svg',
                // iconSize: [50, 50],
                className: markerColour,
                html,
              })
            }
            riseOnHover
          />
        );
      });
    }

    return (
      <div className="map-view">
        <Map center={this.state.currentLocation} zoom={this.state.zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryMarkers}
        </Map>
      </div>
    );
  }
}
