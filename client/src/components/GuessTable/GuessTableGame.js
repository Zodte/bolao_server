import React, { Component } from 'react';

class GuessTableGame extends Component {
  render(){
    const game = this.props.game;
    return (
      <div>
        <span>
          <p>{game.homeTeam}</p>
          <input type='number' min='0' defaultValue={game.homeGuess}/>
          <p>X</p>
          <input type='number' min='0' defaultValue={game.awayGuess}/>
          <p>{game.awayTeam}</p>
        </span>
      </div>
    )
  }
}

export default GuessTableGame;
