import React, { Component } from 'react';
import LeagueTable from './LeagueTable/LeagueTable';
import RoundTable from './RoundTable/RoundTable';
import GuessTable from './GuessTable/GuessTable';

import { connect } from 'react-redux';
import { leagueActions, guessTableActions } from '../actions';

class LeagueHome extends Component {
  async componentDidMount(){
    if(this.props.league.fetchLeague_Id !== ''){
      //Get the pending league && empty pending id
      await this.props.leagueFetchLeague(this.props.league.fetchLeague_Id);
      await this.props.guessTableSetRounds(this.props.league.selectedLeague.rounds)
    }else if(this.props.league.selectedLeague === null){
      this.props.history.push('/myLeagues');
    }
  }
  render(){
    const renderLeagueInfo = () => {
      if (this.props.league.selectedLeague === null){
        return (
          <div></div>
        )
      }else{
        return (
          <h2>{this.props.league.selectedLeague.name}</h2>
        )
      }

    }
    return(
      <div>
        {renderLeagueInfo()}
        {/* <LeagueTable />
         <RoundTable /> */}
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

export default connect(mapStateToProps, {...leagueActions, ...guessTableActions})(LeagueHome);
