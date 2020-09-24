import React from 'react';
import GlobalStat from './GlobalStat/GlobalStat';
import classes from './GlobalStats.module.scss';

const globalStats = () => {
  return (
    <div className={classes.GlobalStats}>
      <ul>
        <li>
          <GlobalStat name="cases" figure="1000000" perMillion="10000" />
        </li>
        <li>
          <GlobalStat name="deaths" figure="100000" perMillion="1000" />
        </li>
        <li>
          <GlobalStat name="tests" figure="10000" perMillion="100" />
        </li>
        <li>
          <GlobalStat name="active cases" figure="10000" />
        </li>
        <li>
          <GlobalStat name="critical cases" figure="10000" />
        </li>
        <li>
          <GlobalStat name="recovered cases" figure="10000" />
        </li>
      </ul>
      <div className={classes.lastUpdated}>
        <p>Last updated: blah blah</p>
      </div>
    </div>
  );
};

export default globalStats;
