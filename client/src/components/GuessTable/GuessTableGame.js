import React, { Component } from 'react';

class GuessTableGame extends Component {
  constructor(props){
    super(props);

    this.state = {
      homeTeamGuess: NaN,
      awayTeamGuess: NaN
    }
  }
  render(){
    const match = this.props.match;
    const updateInput = () => {
      if(!Number.isNaN(this.state.homeTeamGuess) &&
        this.state.homeTeamGuess >= 0 &&
        !Number.isNaN(this.state.awayTeamGuess) &&
        this.state.awayTeamGuess >= 0){
        this.props.addGuess({...this.state, matchID: match._id})
      }
    }
    const renderEdit = () => {
      return (
        <span>
          <p>{match.homeTeam}</p>
          <input type='number' min='0' onChange={(async e => {
              await this.setState({homeTeamGuess: parseInt(e.target.value)});
              updateInput();
            }
          )} defaultValue={match.homeGuess}/>
          <p>X</p>
          <input type='number' min='0' onChange={(async e => {
              await this.setState({awayTeamGuess: parseInt(e.target.value)});
              updateInput();
            }
          )} defaultValue={match.awayGuess}/>
          <p>{match.awayTeam}</p>
        </span>
      )
    }
    const renderPreview = () => {
      return (
        <span>
          <p>{match.homeTeam}</p>
           - x -
          <p>{match.awayTeam}</p>
        </span>
      )
    }
    return (
      <div>
        {(this.props.edit) ? renderEdit() : renderPreview()}
      </div>
    )
  }
}

export default GuessTableGame;
