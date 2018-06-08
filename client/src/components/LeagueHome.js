import React, { Component } from 'react';
import LeagueTable from './LeagueTable/LeagueTable';
import RoundTable from './RoundTable/RoundTable';
import GuessTable from './GuessTable/GuessTable';

import { connect } from 'react-redux';
import { leagueActions } from '../actions';

class LeagueHome extends Component {
  componentDidMount(){
    if(this.props.league.fetchLeague_Id !== ''){
      //Get the pending league
      this.props.leagueFetchLeague(this.props.league.fetchLeague_Id);
      //empty the pending league
    }else if(this.props.league.selectedLeague === null){
      this.props.history.push('/myLeagues');
    }
  }

  render(){
    return(
      <div>
        {(this.props.league.selectedLeague === null) ? "Select League" : this.props.league.selectedLeague.name}
        <LeagueTable />
        <RoundTable />
        <GuessTable />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    league: state.league
  }
}

export default connect(mapStateToProps, leagueActions)(LeagueHome);
