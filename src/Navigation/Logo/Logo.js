import React from 'react';
import { ReactComponent as CovidLogo } from '../../assets/images/logo.svg';
import classes from './Logo.module.scss';

const logo = () => (
  <div className={classes.Logo}>
    <CovidLogo />
  </div>
);

export default logo;
