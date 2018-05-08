import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as guessTableActions from '../../actions/guessTableActions';

import GuessTableGame from './GuessTableGame';

class GuessTable extends Component {
  renderGames(){
    const selectedRound = this.props.guessTable.selectedRound-1;
    const games = this.props.guessTable.rounds[selectedRound].games;
    return games.map( game => {
      return <GuessTableGame game={game} key={`${game.homeTeam}${game.awayTeam}`} />
    })
  }
  render(){
    const nextRound = () => {
      if(this.props.guessTable.rounds.length > this.props.guessTable.selectedRound){
        this.props.guessTableNextRound();
      }
    }
    const prevRound = () => {
      if(this.props.guessTable.selectedRound > 1) {
        this.props.guessTablePrevRound();
      }
    }

    return(
      <div>
        <h1>Guess Table</h1>
        <button className="defaultButton" onClick={prevRound} >-</button>
        <h2>Round { this.props.guessTable.selectedRound }</h2>
        <button className="defaultButton" onClick={nextRound} >+</button>
        { this.renderGames() }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    guessTable: state.guessTable
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(guessTableActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessTable);
