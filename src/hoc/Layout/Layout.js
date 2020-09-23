import React, { Component } from 'react';
import NavBar from '../../Navigation/NavBar/NavBar';

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
