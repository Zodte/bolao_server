import React, { Component } from 'react';
import RoundTablePlayer from './RoundTablePlayer.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { roundTableActions} from '../../actions';
import { orderRoundsByProperty } from '../../tools';

class RoundTable extends Component {

  renderPlayers() {
    if(this.props.roundTable.selectedRound <= 0){
      this.props.roundTableSetRound(this.props.roundTable.roundsByPlayer.length);
    }
    const selectedRound = this.props.roundTable.selectedRound-1;
    const rounds = orderRoundsByProperty(this.props.roundTable.roundsByPlayer, selectedRound, this.props.roundTable.sortBy);
    return rounds.map(i => {
      return (
        <RoundTablePlayer round={ i.rounds[selectedRound] } name={ i.name } key={i.name} />
      );
    });
  }

  render() {
    const nextRound = () => {
      if(this.props.roundTable.roundsByPlayer.length > this.props.roundTable.selectedRound){
        this.props.roundTableNextRound();
      }
    }
    const prevRound = () => {
      if(this.props.roundTable.selectedRound > 1) {
        this.props.roundTablePrevRound();
      }
    }
    return (
      <div>
        <button className="defaultButton" onClick={prevRound} >-</button>
        <h2>Round { this.props.roundTable.selectedRound }</h2>
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
    roundTable: state.roundTable
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(roundTableActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoundTable);
