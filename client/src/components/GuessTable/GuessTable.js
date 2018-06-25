import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { guessTableActions } from '../../actions';

import GuessTableGame from './GuessTableGame';

class GuessTable extends Component {
  renderGames(){
    const selectedRound = this.props.guessTable.selectedRound-1;
    let roundMyGuesses = this.props.guessTable.myGuesses.filter(round => round.round == this.props.guessTable.selectedRound);
    roundMyGuesses = roundMyGuesses[0];
    const addGuess = async (matchGuess) => {
      await this.props.guessTableSetMatchGuess(matchGuess);
    }
    if(this.props.guessTable.rounds[selectedRound]){
      const matches = this.props.guessTable.rounds[selectedRound].matches;
      return matches.map( match => {
        if(roundMyGuesses){
          const matchGuess = roundMyGuesses.guesses.find(guess => guess.matchID === match._id);
          return <GuessTableGame match={match} addGuess={addGuess} matchGuess={matchGuess} key={`${match.homeTeam}${match.awayTeam}`} edit={this.props.guessTable.edit} />
        }else{
          return <GuessTableGame match={match} addGuess={addGuess} key={`${match.homeTeam}${match.awayTeam}`} edit={this.props.guessTable.edit} />
        }

      })
    }

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
    const editRound = () => {
      this.props.guessTableEditRound();
    }
    const saveRound = () => {
      const guesses = this.props.guessTable.roundGuessing;
      const selectedRound = this.props.guessTable.selectedRound-1;
      const roundMatches = this.props.guessTable.rounds[selectedRound].matches;
      if(guesses.length === roundMatches.length){
        const roundGuesses = {
          guesses,
          round: this.props.guessTable.selectedRound,
          leagueID: this.props.league.selectedLeague.league._id
        }
        this.props.guessTableSaveRoundGuesses(roundGuesses);
      }else{
        console.log('Guesses not completed')
      }
    }
    return(
      <div>
        <h1>Guess Table</h1>
        <button className="defaultButton" onClick={prevRound} >-</button>
        <h2>Round { this.props.guessTable.selectedRound }</h2>
        <button className="defaultButton" onClick={nextRound} >+</button>
        { this.renderGames() }
        {(this.props.guessTable.edit) ? (<div><button onClick={this.props.guessTablePreviewRound}>Cancel</button><button onClick={saveRound} >Save</button></div>) : <button onClick={editRound}>Edit</button> }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    league: state.league,
    guessTable: state.guessTable
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(guessTableActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessTable);
