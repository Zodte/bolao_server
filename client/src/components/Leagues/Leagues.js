import React, { Component } from 'react';
import LeagueRow from './LeagueRow';

class Leagues extends Component {
  render () {
    return (
      <div>
        <div className="leagueRow">
          <h3 className="XLFI">League</h3>
          <h3 className="SFI">Number of PLayers</h3>
          <h3 className="SFI">Open league</h3>
        </div>
      </div>
    )
  }
}

export default Leagues
