import React, { Component } from 'react';
import NavBar from '../../Navigation/NavBar/NavBar';
import GlobalStats from '../../components/GlobalStats/GlobalStats';

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
        <GlobalStats />
      </div>
    );
  }
}

export default Layout;
