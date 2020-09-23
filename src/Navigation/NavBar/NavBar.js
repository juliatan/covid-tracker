import React from 'react';
import Logo from '../Logo/Logo';
import classes from './NavBar.module.scss';

const navBar = () => (
  <nav className={classes.NavBar}>
    <div className={classes.container}>
      <Logo />
      <p className={classes.name}>Covid19 Tracker</p>
    </div>
  </nav>
);

export default navBar;
