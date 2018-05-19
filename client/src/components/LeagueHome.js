import React, { Component } from 'react';
import LeagueTable from './LeagueTable/LeagueTable';
import RoundTable from './RoundTable/RoundTable';
import GuessTable from './GuessTable/GuessTable';

class LeagueHome extends Component {
  render(){
    return(
      <div>
        <LeagueTable />
        <RoundTable />
        <GuessTable />
      </div>
    )
  }
}

export default LeagueHome;
