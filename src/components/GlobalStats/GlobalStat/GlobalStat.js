import React from 'react';
import classes from './GlobalStat.module.scss';

const globalStat = (props) => {
  return (
    <div className={classes.GlobalStat}>
      <p className={classes.figure}>{props.figure}</p>
      <p className={classes.name}>Global {props.name}</p>
      {props.perMillion ? (
        <p className={classes.pm}>{props.perMillion} per 1 million</p>
      ) : null}
    </div>
  );
};

export default globalStat;
