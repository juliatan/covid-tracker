import React, { Component } from 'react';
import MapView from './components/MapView/MapView';
import Layout from './hoc/Layout/Layout';
import './App.css';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Layout>
        <MapView />
      </Layout>
    );
  }
}

export default App;
