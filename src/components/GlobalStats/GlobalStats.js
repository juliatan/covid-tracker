import React, { Component } from 'react';
import { fetchGlobalData } from '../../api/coronaApi';
import GlobalStat from './GlobalStat/GlobalStat';
import classes from './GlobalStats.module.scss';

class GlobalStats extends Component {
  state = {
    globalStats: null,
  };

  componentDidMount() {
    this.fetchGlobalStats();
  }

  fetchGlobalStats = async () => {
    const data = await fetchGlobalData();
    this.setState({ globalStats: data.results });
  };

  render() {
    let stats = (
      // need to style
      <div>
        <p>Loading...</p>
      </div>
    );

    if (this.state.globalStats) {
      stats = (
        <>
          <ul>
            <li>
              <GlobalStat
                name="cases"
                figure={this.state.globalStats.cases.toLocaleString()}
                perMillion={Math.floor(
                  this.state.globalStats.casesPerOneMillion,
                ).toLocaleString()}
              />
            </li>
            <li>
              <GlobalStat
                name="deaths"
                figure={this.state.globalStats.deaths.toLocaleString()}
                perMillion={Math.floor(
                  this.state.globalStats.deathsPerOneMillion,
                ).toLocaleString()}
              />
            </li>
            <li>
              <GlobalStat
                name="tests"
                figure={this.state.globalStats.tests.toLocaleString()}
                perMillion={Math.floor(
                  this.state.globalStats.testsPerOneMillion,
                ).toLocaleString()}
              />
            </li>
            <li>
              <GlobalStat
                name="active cases"
                figure={this.state.globalStats.active.toLocaleString()}
                perMillion={Math.floor(
                  this.state.globalStats.activePerOneMillion,
                ).toLocaleString()}
              />
            </li>
            <li>
              <GlobalStat
                name="critical cases"
                figure={this.state.globalStats.critical.toLocaleString()}
                perMillion={Math.floor(
                  this.state.globalStats.criticalPerOneMillion,
                ).toLocaleString()}
              />
            </li>
            <li>
              <GlobalStat
                name="recovered cases"
                figure={this.state.globalStats.recovered.toLocaleString()}
                perMillion={Math.floor(
                  this.state.globalStats.recoveredPerOneMillion,
                ).toLocaleString()}
              />
            </li>
          </ul>
          <div className={classes.lastUpdated}>
            <p>
              Last updated:{' '}
              {new Date(this.state.globalStats.updated).toGMTString()}
            </p>
          </div>
        </>
      );
    }
    return <div className={classes.GlobalStats}>{stats}</div>;
  }
}

export default GlobalStats;
