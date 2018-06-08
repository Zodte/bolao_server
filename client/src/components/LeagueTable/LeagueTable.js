import React, { Component } from 'react';
import LeagueTablePlayer from './LeagueTablePlayer.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { leagueTableActions } from '../../actions';
import { orderRoundsByProperty } from '../../tools';

class LeagueTable extends Component {

  renderPlayers() {
    let selectedRound = this.props.leagueTable.selectedRound-1;
    const rounds = orderRoundsByProperty(this.props.leagueTable.roundsByPlayer, selectedRound, this.props.leagueTable.sortBy);
    return rounds.map(i => {
      return (
        <LeagueTablePlayer round={i.rounds[selectedRound]} name={i.name} key={i.name}/>
      );
    });
  }
  render () {
    const nextRound = () => {
      if(this.props.leagueTable.roundsByPlayer.length > this.props.leagueTable.selectedRound){
        this.props.leagueTableNextRound();
      }
    }
    const prevRound = () => {
      if(this.props.leagueTable.selectedRound > 1) {
        this.props.leagueTablePrevRound();
      }
    }

    return (
      <div>
        <button className="defaultButton" onClick={prevRound} >-</button>
        <h2>Round { this.props.leagueTable.selectedRound }</h2>
        <button className="defaultButton" onClick={nextRound} >+</button>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Points</th>
              <th>Player</th>
              <th>Perfect</th>
              <th>Correct</th>
              <th>Misses</th>
              <th>Gold</th>
              <th>Silver</th>
              <th>Bronze</th>
              <th>Underdog</th>
            </tr>
          </thead>
          <tbody>
            { this.renderPlayers() }
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    players: state.players,
    leagueTable: state.leagueTable
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(leagueTableActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTable);
